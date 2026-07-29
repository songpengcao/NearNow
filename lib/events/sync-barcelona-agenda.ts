import {
  BARCELONA_AGENDA_SOURCE,
  BARCELONA_AGENDA_URL,
  decodeBarcelonaAgendaCsv,
  parseBarcelonaAgendaCsv,
} from "./barcelona-agenda";

export type SyncResult = {
  id: string;
  fetchedRows: number;
  venues: number;
  events: number;
  occurrences: number;
  rejectedRows: number;
  finishedAt: string;
};

export class SyncAlreadyRunningError extends Error {
  constructor() {
    super("A Barcelona agenda synchronization is already running.");
    this.name = "SyncAlreadyRunningError";
  }
}

function barcelonaDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function errorCodeFor(error: unknown) {
  if (error instanceof SyncAlreadyRunningError) return "SYNC_ALREADY_RUNNING";
  if (error instanceof TypeError) return "SOURCE_NETWORK_ERROR";
  if (
    error instanceof Error &&
    /^Barcelona agenda returned \d+$/.test(error.message)
  ) {
    return "SOURCE_HTTP_ERROR";
  }
  if (
    error instanceof Error &&
    error.message.includes("Refusing to synchronize")
  ) {
    return "SOURCE_VALIDATION_ERROR";
  }
  return "UNEXPECTED_ERROR";
}

function errorMessageFor(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unexpected synchronization error";
  return message.replace(/\s+/g, " ").slice(0, 800);
}

export async function syncBarcelonaAgenda(
  d1: D1Database,
  options: {
    trigger: "manual" | "scheduled" | "deployment";
    now?: Date;
  },
): Promise<SyncResult> {
  const now = options.now ?? new Date();
  const startedAt = now.toISOString();
  const staleRunCutoff = new Date(now.getTime() - 30 * 60 * 1000).toISOString();
  const existingRun = await d1
    .prepare(
      `SELECT id
      FROM sync_runs
      WHERE source = ?1 AND status = 'running' AND started_at >= ?2
      ORDER BY started_at DESC
      LIMIT 1`,
    )
    .bind(BARCELONA_AGENDA_SOURCE, staleRunCutoff)
    .first<{ id: string }>();

  if (existingRun) throw new SyncAlreadyRunningError();

  const syncRunId = crypto.randomUUID();
  await d1
    .prepare(
      `INSERT INTO sync_runs (
        id, source, trigger, status, started_at
      ) VALUES (?1, ?2, ?3, 'running', ?4)`,
    )
    .bind(
      syncRunId,
      BARCELONA_AGENDA_SOURCE,
      options.trigger,
      startedAt,
    )
    .run();

  let sourceHttpStatus: number | null = null;

  try {
    const response = await fetch(BARCELONA_AGENDA_URL, {
      headers: { Accept: "text/csv" },
    });
    sourceHttpStatus = response.status;
    if (!response.ok) {
      throw new Error(`Barcelona agenda returned ${response.status}`);
    }

    const sourceFetchedAt = new Date().toISOString();
    const raw = await response.arrayBuffer();
    const csv = decodeBarcelonaAgendaCsv(raw);
    const agenda = parseBarcelonaAgendaCsv(csv, { now });

    if (
      agenda.fetchedRows === 0 ||
      agenda.events.length === 0 ||
      agenda.occurrences.length === 0
    ) {
      throw new Error(
        "Refusing to synchronize an empty or suspicious Barcelona agenda.",
      );
    }

    const finishedAt = new Date().toISOString();
    const statements: D1PreparedStatement[] = [];

    for (const venue of agenda.venues) {
      statements.push(
        d1
          .prepare(
            `INSERT INTO venues (
              id, venue_key, name, address, neighborhood, district,
              latitude, longitude, created_at, updated_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?9)
            ON CONFLICT(venue_key) DO UPDATE SET
              name = excluded.name,
              address = excluded.address,
              neighborhood = excluded.neighborhood,
              district = excluded.district,
              latitude = excluded.latitude,
              longitude = excluded.longitude,
              updated_at = excluded.updated_at`,
          )
          .bind(
            venue.id,
            venue.venueKey,
            venue.name,
            venue.address,
            venue.neighborhood,
            venue.district,
            venue.latitude,
            venue.longitude,
            finishedAt,
          ),
      );
    }

    for (const event of agenda.events) {
      statements.push(
        d1
          .prepare(
            `INSERT INTO events (
              id, source, source_event_id, title, description, category,
              source_url, first_seen_sync_id, last_seen_sync_id,
              created_at, updated_at
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?8, ?9, ?9)
            ON CONFLICT(source, source_event_id) DO UPDATE SET
              title = excluded.title,
              description = excluded.description,
              category = excluded.category,
              source_url = excluded.source_url,
              last_seen_sync_id = excluded.last_seen_sync_id,
              updated_at = excluded.updated_at`,
          )
          .bind(
            event.id,
            event.source,
            event.sourceEventId,
            event.title,
            event.description,
            event.category,
            event.sourceUrl,
            syncRunId,
            finishedAt,
          ),
      );
    }

    for (const occurrence of agenda.occurrences) {
      statements.push(
        d1
          .prepare(
            `INSERT INTO event_occurrences (
              id, event_id, venue_id, occurrence_key, start_date, start_time,
              starts_at, end_date, ends_at, time_label, price_type,
              price_min_cents, price_label, status, first_seen_sync_id,
              last_seen_sync_id, created_at, updated_at
            ) VALUES (
              ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13,
              'active', ?14, ?14, ?15, ?15
            )
            ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
              venue_id = excluded.venue_id,
              start_date = excluded.start_date,
              start_time = excluded.start_time,
              starts_at = excluded.starts_at,
              end_date = excluded.end_date,
              ends_at = excluded.ends_at,
              time_label = excluded.time_label,
              price_type = excluded.price_type,
              price_min_cents = excluded.price_min_cents,
              price_label = excluded.price_label,
              status = 'active',
              last_seen_sync_id = excluded.last_seen_sync_id,
              updated_at = excluded.updated_at`,
          )
          .bind(
            occurrence.id,
            occurrence.eventId,
            occurrence.venueId,
            occurrence.occurrenceKey,
            occurrence.startDate,
            occurrence.startTime,
            occurrence.startsAt,
            occurrence.endDate,
            occurrence.endsAt,
            occurrence.timeLabel,
            occurrence.priceType,
            occurrence.priceMinCents,
            occurrence.priceLabel,
            syncRunId,
            finishedAt,
          ),
      );
    }

    const occurrencePlaceholders = agenda.occurrences
      .map((_, index) => `?${index + 3}`)
      .join(", ");
    statements.push(
      d1
        .prepare(
          `UPDATE event_occurrences
          SET status = 'removed', updated_at = ?1
          WHERE status = 'active'
            AND start_date >= ?2
            AND event_id IN (
              SELECT id FROM events WHERE source = '${BARCELONA_AGENDA_SOURCE}'
            )
            AND id NOT IN (${occurrencePlaceholders})`,
        )
        .bind(
          finishedAt,
          barcelonaDateKey(now),
          ...agenda.occurrences.map((occurrence) => occurrence.id),
        ),
    );
    statements.push(
      d1
        .prepare(
          `UPDATE sync_runs
          SET status = 'success',
              finished_at = ?1,
              source_fetched_at = ?2,
              source_http_status = ?3,
              fetched_rows = ?4,
              accepted_events = ?5,
              accepted_occurrences = ?6,
              rejected_rows = ?7,
              error_code = NULL,
              error_message = NULL
          WHERE id = ?8`,
        )
        .bind(
          finishedAt,
          sourceFetchedAt,
          sourceHttpStatus,
          agenda.fetchedRows,
          agenda.events.length,
          agenda.occurrences.length,
          agenda.rejectedRows,
          syncRunId,
        ),
    );

    await d1.batch(statements);

    return {
      id: syncRunId,
      fetchedRows: agenda.fetchedRows,
      venues: agenda.venues.length,
      events: agenda.events.length,
      occurrences: agenda.occurrences.length,
      rejectedRows: agenda.rejectedRows,
      finishedAt,
    };
  } catch (error) {
    await d1
      .prepare(
        `UPDATE sync_runs
        SET status = 'failed',
            finished_at = ?1,
            source_http_status = ?2,
            error_code = ?3,
            error_message = ?4
        WHERE id = ?5`,
      )
      .bind(
        new Date().toISOString(),
        sourceHttpStatus,
        errorCodeFor(error),
        errorMessageFor(error),
        syncRunId,
      )
      .run();
    throw error;
  }
}

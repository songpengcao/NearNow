import { getD1 } from "@/db";

export type AdminView = "overview" | "events" | "venues" | "syncs";
export type OccurrenceStatus = "all" | "active" | "removed" | "cancelled";
export type AdminCategory =
  | "all"
  | "Concert"
  | "Bar"
  | "Jam"
  | "Classical"
  | "Electronic";

export type AdminFilters = {
  query: string;
  category: AdminCategory;
  status: OccurrenceStatus;
};

type StatsRow = {
  events: number;
  upcoming: number;
  venues: number;
  syncRuns: number;
};

export type AdminEventRow = {
  occurrenceId: string;
  eventId: string;
  title: string;
  category: Exclude<AdminCategory, "all">;
  venue: string | null;
  neighborhood: string | null;
  startDate: string;
  startTime: string | null;
  timeLabel: string;
  priceLabel: string;
  status: Exclude<OccurrenceStatus, "all">;
  sourceUrl: string;
};

export type AdminVenueRow = {
  id: string;
  name: string;
  neighborhood: string | null;
  district: string | null;
  address: string | null;
  occurrences: number;
  nextDate: string | null;
};

export type AdminSyncRow = {
  id: string;
  trigger: "scheduled" | "manual" | "deployment";
  status: "running" | "success" | "failed";
  startedAt: string;
  finishedAt: string | null;
  fetchedRows: number;
  acceptedEvents: number;
  acceptedOccurrences: number;
  rejectedRows: number;
  errorCode: string | null;
  errorMessage: string | null;
};

export type CategoryCount = {
  category: Exclude<AdminCategory, "all">;
  count: number;
};

export type AdminDashboardData = {
  stats: StatsRow;
  events: AdminEventRow[];
  venues: AdminVenueRow[];
  syncRuns: AdminSyncRow[];
  categoryCounts: CategoryCount[];
  lastSuccessfulSync: AdminSyncRow | null;
  latestSync: AdminSyncRow | null;
};

function rows<T>(result: D1Result<unknown>) {
  return (result.results ?? []) as T[];
}

function barcelonaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

export async function getAdminDashboardData(
  filters: AdminFilters,
): Promise<AdminDashboardData> {
  const d1 = getD1();
  const today = barcelonaDateKey();
  const query = filters.query.trim().slice(0, 100);
  const likeQuery = `%${query}%`;

  const results = await d1.batch([
    d1
      .prepare(
        `SELECT
          (SELECT COUNT(*) FROM events) AS events,
          (SELECT COUNT(*) FROM event_occurrences WHERE status = 'active' AND start_date >= ?1) AS upcoming,
          (SELECT COUNT(*) FROM venues) AS venues,
          (SELECT COUNT(*) FROM sync_runs) AS syncRuns`,
      )
      .bind(today),
    d1.prepare(
      `SELECT
        e.category AS category,
        COUNT(*) AS count
      FROM events e
      JOIN event_occurrences o ON o.event_id = e.id
      WHERE o.status = 'active' AND o.start_date >= ?1
      GROUP BY e.category
      ORDER BY count DESC, e.category`,
    ).bind(today),
    d1
      .prepare(
        `SELECT
          o.id AS occurrenceId,
          e.id AS eventId,
          e.title AS title,
          e.category AS category,
          v.name AS venue,
          v.neighborhood AS neighborhood,
          o.start_date AS startDate,
          o.start_time AS startTime,
          o.time_label AS timeLabel,
          o.price_label AS priceLabel,
          o.status AS status,
          e.source_url AS sourceUrl
        FROM event_occurrences o
        JOIN events e ON e.id = o.event_id
        LEFT JOIN venues v ON v.id = o.venue_id
        WHERE (?1 = '' OR e.title LIKE ?2 OR v.name LIKE ?2 OR v.neighborhood LIKE ?2)
          AND (?3 = 'all' OR e.category = ?3)
          AND (?4 = 'all' OR o.status = ?4)
        ORDER BY
          CASE WHEN o.start_date >= ?5 THEN 0 ELSE 1 END,
          o.start_date ASC,
          COALESCE(o.start_time, '99:99') ASC,
          e.title ASC
        LIMIT 120`,
      )
      .bind(
        query,
        likeQuery,
        filters.category,
        filters.status,
        today,
      ),
    d1.prepare(
      `SELECT
        v.id AS id,
        v.name AS name,
        v.neighborhood AS neighborhood,
        v.district AS district,
        v.address AS address,
        COUNT(o.id) AS occurrences,
        MIN(CASE WHEN o.status = 'active' AND o.start_date >= ?1 THEN o.start_date END) AS nextDate
      FROM venues v
      LEFT JOIN event_occurrences o ON o.venue_id = v.id
      GROUP BY v.id
      ORDER BY nextDate IS NULL, nextDate ASC, v.name ASC
      LIMIT 120`,
    ).bind(today),
    d1.prepare(
      `SELECT
        id,
        trigger,
        status,
        started_at AS startedAt,
        finished_at AS finishedAt,
        fetched_rows AS fetchedRows,
        accepted_events AS acceptedEvents,
        accepted_occurrences AS acceptedOccurrences,
        rejected_rows AS rejectedRows,
        error_code AS errorCode,
        error_message AS errorMessage
      FROM sync_runs
      ORDER BY started_at DESC
      LIMIT 30`,
    ),
  ]);

  const stats = rows<StatsRow>(results[0])[0] ?? {
    events: 0,
    upcoming: 0,
    venues: 0,
    syncRuns: 0,
  };
  const categoryCounts = rows<CategoryCount>(results[1]);
  const events = rows<AdminEventRow>(results[2]);
  const venues = rows<AdminVenueRow>(results[3]);
  const syncRuns = rows<AdminSyncRow>(results[4]);

  return {
    stats,
    categoryCounts,
    events,
    venues,
    syncRuns,
    latestSync: syncRuns[0] ?? null,
    lastSuccessfulSync:
      syncRuns.find((syncRun) => syncRun.status === "success") ?? null,
  };
}

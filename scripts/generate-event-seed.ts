import { readFile, writeFile } from "node:fs/promises";
import {
  BARCELONA_AGENDA_SOURCE,
  decodeBarcelonaAgendaCsv,
  parseBarcelonaAgendaCsv,
} from "../lib/events/barcelona-agenda";

type SeedOptions = {
  input: string;
  output: string;
  now: Date;
};

function parseArguments(argv: string[]): SeedOptions {
  const values = new Map<string, string>();

  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || !value) {
      throw new Error(
        "Usage: tsx scripts/generate-event-seed.ts --input <csv> --output <sql> --now <iso>",
      );
    }
    values.set(key, value);
  }

  const input = values.get("--input");
  const output = values.get("--output");
  const nowValue = values.get("--now") ?? new Date().toISOString();
  const now = new Date(nowValue);

  if (!input || !output || Number.isNaN(now.getTime())) {
    throw new Error(
      "Usage: tsx scripts/generate-event-seed.ts --input <csv> --output <sql> --now <iso>",
    );
  }

  return { input, output, now };
}

function sqlText(value: string | null) {
  if (value === null) return "NULL";
  return `'${value.replaceAll("'", "''")}'`;
}

function sqlNumber(value: number | null) {
  return value === null ? "NULL" : String(value);
}

function statement(sql: string) {
  return `${sql};\n--> statement-breakpoint\n`;
}

const options = parseArguments(process.argv.slice(2));
const source = await readFile(options.input);
const csv = decodeBarcelonaAgendaCsv(source);
const agenda = parseBarcelonaAgendaCsv(csv, { now: options.now });

if (agenda.events.length === 0 || agenda.occurrences.length === 0) {
  throw new Error("Refusing to generate an empty seed migration.");
}

const generatedAt = options.now.toISOString();
const syncRunId = `seed_${generatedAt.replace(/[^0-9]/g, "").slice(0, 14)}`;
let sql = [
  "-- Generated from the Barcelona Cultural Agenda CSV.",
  `-- Snapshot time: ${generatedAt}`,
  "-- Regenerate deliberately; do not hand-edit data rows.",
  "",
].join("\n");

sql += statement(
  `INSERT INTO sync_runs (
  id, source, trigger, status, started_at, finished_at, source_fetched_at,
  source_http_status, fetched_rows, accepted_events, accepted_occurrences,
  rejected_rows
) VALUES (
  ${sqlText(syncRunId)}, ${sqlText(BARCELONA_AGENDA_SOURCE)}, 'deployment',
  'success', ${sqlText(generatedAt)}, ${sqlText(generatedAt)},
  ${sqlText(generatedAt)}, 200, ${agenda.fetchedRows}, ${agenda.events.length},
  ${agenda.occurrences.length}, ${agenda.rejectedRows}
) ON CONFLICT(id) DO NOTHING`,
);

for (const venue of agenda.venues) {
  sql += statement(
    `INSERT INTO venues (
  id, venue_key, name, address, neighborhood, district, latitude, longitude,
  created_at, updated_at
) VALUES (
  ${sqlText(venue.id)}, ${sqlText(venue.venueKey)}, ${sqlText(venue.name)},
  ${sqlText(venue.address)}, ${sqlText(venue.neighborhood)},
  ${sqlText(venue.district)}, ${venue.latitude}, ${venue.longitude},
  ${sqlText(generatedAt)}, ${sqlText(generatedAt)}
) ON CONFLICT(venue_key) DO UPDATE SET
  name = excluded.name,
  address = excluded.address,
  neighborhood = excluded.neighborhood,
  district = excluded.district,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  updated_at = excluded.updated_at`,
  );
}

for (const event of agenda.events) {
  sql += statement(
    `INSERT INTO events (
  id, source, source_event_id, title, description, category, source_url,
  first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  ${sqlText(event.id)}, ${sqlText(event.source)},
  ${sqlText(event.sourceEventId)}, ${sqlText(event.title)},
  ${sqlText(event.description)}, ${sqlText(event.category)},
  ${sqlText(event.sourceUrl)}, ${sqlText(syncRunId)}, ${sqlText(syncRunId)},
  ${sqlText(generatedAt)}, ${sqlText(generatedAt)}
) ON CONFLICT(source, source_event_id) DO UPDATE SET
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  source_url = excluded.source_url,
  last_seen_sync_id = excluded.last_seen_sync_id,
  updated_at = excluded.updated_at`,
  );
}

for (const occurrence of agenda.occurrences) {
  sql += statement(
    `INSERT INTO event_occurrences (
  id, event_id, venue_id, occurrence_key, start_date, start_time, starts_at,
  end_date, ends_at, time_label, price_type, price_min_cents, price_label,
  status, first_seen_sync_id, last_seen_sync_id, created_at, updated_at
) VALUES (
  ${sqlText(occurrence.id)}, ${sqlText(occurrence.eventId)},
  ${sqlText(occurrence.venueId)}, ${sqlText(occurrence.occurrenceKey)},
  ${sqlText(occurrence.startDate)}, ${sqlText(occurrence.startTime)},
  ${sqlText(occurrence.startsAt)}, ${sqlText(occurrence.endDate)},
  ${sqlText(occurrence.endsAt)}, ${sqlText(occurrence.timeLabel)},
  ${sqlText(occurrence.priceType)}, ${sqlNumber(occurrence.priceMinCents)},
  ${sqlText(occurrence.priceLabel)}, 'active', ${sqlText(syncRunId)},
  ${sqlText(syncRunId)}, ${sqlText(generatedAt)}, ${sqlText(generatedAt)}
) ON CONFLICT(event_id, occurrence_key) DO UPDATE SET
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
  );
}

await writeFile(options.output, sql);

console.log(
  JSON.stringify(
    {
      output: options.output,
      syncRunId,
      fetchedRows: agenda.fetchedRows,
      venues: agenda.venues.length,
      events: agenda.events.length,
      occurrences: agenda.occurrences.length,
      rejectedRows: agenda.rejectedRows,
    },
    null,
    2,
  ),
);

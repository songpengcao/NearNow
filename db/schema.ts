import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const currentTimestamp = sql`CURRENT_TIMESTAMP`;

export const syncRuns = sqliteTable(
  "sync_runs",
  {
    id: text("id").primaryKey(),
    source: text("source").notNull(),
    trigger: text("trigger", {
      enum: ["scheduled", "manual", "deployment"],
    }).notNull(),
    status: text("status", {
      enum: ["running", "success", "failed"],
    })
      .notNull()
      .default("running"),
    startedAt: text("started_at").notNull().default(currentTimestamp),
    finishedAt: text("finished_at"),
    sourceFetchedAt: text("source_fetched_at"),
    sourceHttpStatus: integer("source_http_status"),
    fetchedRows: integer("fetched_rows").notNull().default(0),
    acceptedEvents: integer("accepted_events").notNull().default(0),
    acceptedOccurrences: integer("accepted_occurrences").notNull().default(0),
    rejectedRows: integer("rejected_rows").notNull().default(0),
    errorCode: text("error_code"),
    errorMessage: text("error_message"),
  },
  (table) => [
    index("sync_runs_source_started_idx").on(table.source, table.startedAt),
    index("sync_runs_source_status_started_idx").on(
      table.source,
      table.status,
      table.startedAt,
    ),
    check(
      "sync_runs_trigger_check",
      sql`${table.trigger} in ('scheduled', 'manual', 'deployment')`,
    ),
    check(
      "sync_runs_status_check",
      sql`${table.status} in ('running', 'success', 'failed')`,
    ),
    check(
      "sync_runs_finished_at_check",
      sql`(${table.status} = 'running' and ${table.finishedAt} is null) or (${table.status} != 'running' and ${table.finishedAt} is not null)`,
    ),
    check(
      "sync_runs_error_check",
      sql`${table.status} != 'failed' or ${table.errorCode} is not null`,
    ),
    check(
      "sync_runs_counts_check",
      sql`${table.fetchedRows} >= 0 and ${table.acceptedEvents} >= 0 and ${table.acceptedOccurrences} >= 0 and ${table.rejectedRows} >= 0`,
    ),
  ],
);

export const venues = sqliteTable(
  "venues",
  {
    id: text("id").primaryKey(),
    venueKey: text("venue_key").notNull(),
    name: text("name").notNull(),
    address: text("address"),
    neighborhood: text("neighborhood"),
    district: text("district"),
    latitude: real("latitude"),
    longitude: real("longitude"),
    createdAt: text("created_at").notNull().default(currentTimestamp),
    updatedAt: text("updated_at").notNull().default(currentTimestamp),
  },
  (table) => [
    uniqueIndex("venues_venue_key_uq").on(table.venueKey),
    index("venues_neighborhood_idx").on(table.neighborhood),
    check(
      "venues_latitude_check",
      sql`${table.latitude} is null or ${table.latitude} between -90 and 90`,
    ),
    check(
      "venues_longitude_check",
      sql`${table.longitude} is null or ${table.longitude} between -180 and 180`,
    ),
  ],
);

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    source: text("source").notNull(),
    sourceEventId: text("source_event_id").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    category: text("category", {
      enum: ["Concert", "Bar", "Jam", "Classical", "Electronic"],
    })
      .notNull()
      .default("Concert"),
    sourceUrl: text("source_url").notNull(),
    firstSeenSyncId: text("first_seen_sync_id").references(() => syncRuns.id, {
      onDelete: "set null",
    }),
    lastSeenSyncId: text("last_seen_sync_id").references(() => syncRuns.id, {
      onDelete: "set null",
    }),
    createdAt: text("created_at").notNull().default(currentTimestamp),
    updatedAt: text("updated_at").notNull().default(currentTimestamp),
  },
  (table) => [
    uniqueIndex("events_source_identity_uq").on(
      table.source,
      table.sourceEventId,
    ),
    index("events_category_idx").on(table.category),
    index("events_last_seen_sync_idx").on(table.lastSeenSyncId),
    check(
      "events_category_check",
      sql`${table.category} in ('Concert', 'Bar', 'Jam', 'Classical', 'Electronic')`,
    ),
  ],
);

export const eventOccurrences = sqliteTable(
  "event_occurrences",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id),
    venueId: text("venue_id").references(() => venues.id, {
      onDelete: "set null",
    }),
    occurrenceKey: text("occurrence_key").notNull(),
    startDate: text("start_date").notNull(),
    startTime: text("start_time"),
    startsAt: text("starts_at"),
    endDate: text("end_date"),
    endsAt: text("ends_at"),
    timeLabel: text("time_label").notNull().default("Time TBC"),
    priceType: text("price_type", {
      enum: ["free", "paid", "donation", "unknown"],
    })
      .notNull()
      .default("unknown"),
    priceMinCents: integer("price_min_cents"),
    priceLabel: text("price_label").notNull().default("Check price"),
    status: text("status", {
      enum: ["active", "removed", "cancelled"],
    })
      .notNull()
      .default("active"),
    firstSeenSyncId: text("first_seen_sync_id").references(() => syncRuns.id, {
      onDelete: "set null",
    }),
    lastSeenSyncId: text("last_seen_sync_id").references(() => syncRuns.id, {
      onDelete: "set null",
    }),
    createdAt: text("created_at").notNull().default(currentTimestamp),
    updatedAt: text("updated_at").notNull().default(currentTimestamp),
  },
  (table) => [
    uniqueIndex("occurrences_event_key_uq").on(
      table.eventId,
      table.occurrenceKey,
    ),
    index("occurrences_active_date_idx").on(table.status, table.startDate),
    index("occurrences_event_date_idx").on(table.eventId, table.startDate),
    index("occurrences_venue_date_idx").on(table.venueId, table.startDate),
    index("occurrences_last_seen_sync_idx").on(table.lastSeenSyncId),
    check(
      "occurrences_price_type_check",
      sql`${table.priceType} in ('free', 'paid', 'donation', 'unknown')`,
    ),
    check(
      "occurrences_status_check",
      sql`${table.status} in ('active', 'removed', 'cancelled')`,
    ),
    check(
      "occurrences_price_min_check",
      sql`${table.priceMinCents} is null or ${table.priceMinCents} >= 0`,
    ),
  ],
);

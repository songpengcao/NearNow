CREATE TABLE `event_occurrences` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`venue_id` text,
	`occurrence_key` text NOT NULL,
	`start_date` text NOT NULL,
	`start_time` text,
	`starts_at` text,
	`end_date` text,
	`ends_at` text,
	`time_label` text DEFAULT 'Time TBC' NOT NULL,
	`price_type` text DEFAULT 'unknown' NOT NULL,
	`price_min_cents` integer,
	`price_label` text DEFAULT 'Check price' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`first_seen_sync_id` text,
	`last_seen_sync_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`venue_id`) REFERENCES `venues`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`first_seen_sync_id`) REFERENCES `sync_runs`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`last_seen_sync_id`) REFERENCES `sync_runs`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "occurrences_price_type_check" CHECK("event_occurrences"."price_type" in ('free', 'paid', 'donation', 'unknown')),
	CONSTRAINT "occurrences_status_check" CHECK("event_occurrences"."status" in ('active', 'removed', 'cancelled')),
	CONSTRAINT "occurrences_price_min_check" CHECK("event_occurrences"."price_min_cents" is null or "event_occurrences"."price_min_cents" >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `occurrences_event_key_uq` ON `event_occurrences` (`event_id`,`occurrence_key`);--> statement-breakpoint
CREATE INDEX `occurrences_active_date_idx` ON `event_occurrences` (`status`,`start_date`);--> statement-breakpoint
CREATE INDEX `occurrences_event_date_idx` ON `event_occurrences` (`event_id`,`start_date`);--> statement-breakpoint
CREATE INDEX `occurrences_venue_date_idx` ON `event_occurrences` (`venue_id`,`start_date`);--> statement-breakpoint
CREATE INDEX `occurrences_last_seen_sync_idx` ON `event_occurrences` (`last_seen_sync_id`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`source_event_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`category` text DEFAULT 'Concert' NOT NULL,
	`source_url` text NOT NULL,
	`first_seen_sync_id` text,
	`last_seen_sync_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`first_seen_sync_id`) REFERENCES `sync_runs`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`last_seen_sync_id`) REFERENCES `sync_runs`(`id`) ON UPDATE no action ON DELETE set null,
	CONSTRAINT "events_category_check" CHECK("events"."category" in ('Concert', 'Bar', 'Jam', 'Classical', 'Electronic'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_source_identity_uq` ON `events` (`source`,`source_event_id`);--> statement-breakpoint
CREATE INDEX `events_category_idx` ON `events` (`category`);--> statement-breakpoint
CREATE INDEX `events_last_seen_sync_idx` ON `events` (`last_seen_sync_id`);--> statement-breakpoint
CREATE TABLE `sync_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`trigger` text NOT NULL,
	`status` text DEFAULT 'running' NOT NULL,
	`started_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`finished_at` text,
	`source_fetched_at` text,
	`source_http_status` integer,
	`fetched_rows` integer DEFAULT 0 NOT NULL,
	`accepted_events` integer DEFAULT 0 NOT NULL,
	`accepted_occurrences` integer DEFAULT 0 NOT NULL,
	`rejected_rows` integer DEFAULT 0 NOT NULL,
	`error_code` text,
	`error_message` text,
	CONSTRAINT "sync_runs_trigger_check" CHECK("sync_runs"."trigger" in ('scheduled', 'manual', 'deployment')),
	CONSTRAINT "sync_runs_status_check" CHECK("sync_runs"."status" in ('running', 'success', 'failed')),
	CONSTRAINT "sync_runs_finished_at_check" CHECK(("sync_runs"."status" = 'running' and "sync_runs"."finished_at" is null) or ("sync_runs"."status" != 'running' and "sync_runs"."finished_at" is not null)),
	CONSTRAINT "sync_runs_error_check" CHECK("sync_runs"."status" != 'failed' or "sync_runs"."error_code" is not null),
	CONSTRAINT "sync_runs_counts_check" CHECK("sync_runs"."fetched_rows" >= 0 and "sync_runs"."accepted_events" >= 0 and "sync_runs"."accepted_occurrences" >= 0 and "sync_runs"."rejected_rows" >= 0)
);
--> statement-breakpoint
CREATE INDEX `sync_runs_source_started_idx` ON `sync_runs` (`source`,`started_at`);--> statement-breakpoint
CREATE INDEX `sync_runs_source_status_started_idx` ON `sync_runs` (`source`,`status`,`started_at`);--> statement-breakpoint
CREATE TABLE `venues` (
	`id` text PRIMARY KEY NOT NULL,
	`venue_key` text NOT NULL,
	`name` text NOT NULL,
	`address` text,
	`neighborhood` text,
	`district` text,
	`latitude` real,
	`longitude` real,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "venues_latitude_check" CHECK("venues"."latitude" is null or "venues"."latitude" between -90 and 90),
	CONSTRAINT "venues_longitude_check" CHECK("venues"."longitude" is null or "venues"."longitude" between -180 and 180)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `venues_venue_key_uq` ON `venues` (`venue_key`);--> statement-breakpoint
CREATE INDEX `venues_neighborhood_idx` ON `venues` (`neighborhood`);
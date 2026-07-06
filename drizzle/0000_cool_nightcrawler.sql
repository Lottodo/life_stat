CREATE TABLE `metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`label` text NOT NULL,
	`unit` text NOT NULL,
	`category` text,
	`min_normal` real,
	`max_normal` real,
	`min_valid` real,
	`max_valid` real
);
--> statement-breakpoint
CREATE UNIQUE INDEX `metrics_key_unique` ON `metrics` (`key`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`sex` text,
	`birth_date` text,
	`avatar_color` text
);
--> statement-breakpoint
CREATE TABLE `reading_values` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reading_id` integer NOT NULL,
	`metric_id` integer NOT NULL,
	`value` real NOT NULL,
	FOREIGN KEY (`reading_id`) REFERENCES `readings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`metric_id`) REFERENCES `metrics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `readings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`recorded_at` text NOT NULL,
	`source` text,
	`notes` text,
	`session_id` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `access_logs` (
	`id` varchar(36) NOT NULL,
	`urlId` varchar(36) NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `url` (
	`id` varchar(36) NOT NULL,
	`original` text NOT NULL,
	`short` varchar(6) NOT NULL,
	`userId` varchar(36),
	`clicks` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`deletedAt` timestamp,
	CONSTRAINT `url_id` PRIMARY KEY(`id`),
	CONSTRAINT `url_short_unique` UNIQUE(`short`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `access_logs` ADD CONSTRAINT `access_logs_urlId_url_id_fk` FOREIGN KEY (`urlId`) REFERENCES `url`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `url` ADD CONSTRAINT `url_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;
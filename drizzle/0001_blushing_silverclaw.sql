CREATE TABLE `accessLog` (
	`id` varchar(36) NOT NULL,
	`urlId` varchar(36) NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `accessLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `access_logs`;--> statement-breakpoint
ALTER TABLE `accessLog` ADD CONSTRAINT `accessLog_urlId_url_id_fk` FOREIGN KEY (`urlId`) REFERENCES `url`(`id`) ON DELETE cascade ON UPDATE no action;
import { mysqlTable, varchar, text, timestamp } from 'drizzle-orm/mysql-core';
import { url } from './url';
import { relations } from 'drizzle-orm';

export const accessLog = mysqlTable('accessLog', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  urlId: varchar('urlId', { length: 36 })
    .notNull()
    .references(() => url.id, { onDelete: 'cascade' }),
  ipAddress: varchar('ipAddress', { length: 45 }),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const accessLogRelations = relations(accessLog, ({ one }) => ({
  url: one(url, {
    fields: [accessLog.urlId],
    references: [url.id],
  }),
}));

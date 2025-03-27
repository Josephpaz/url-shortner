import { mysqlTable, varchar, text, timestamp } from 'drizzle-orm/mysql-core';
import { url } from './url';

export const accessLogs = mysqlTable('access_logs', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  urlId: varchar('urlId', { length: 36 })
    .notNull()
    .references(() => url.id, { onDelete: 'cascade' }),
  ipAddress: varchar('ipAddress', { length: 45 }),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

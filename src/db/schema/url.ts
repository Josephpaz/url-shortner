import {
  mysqlTable,
  varchar,
  timestamp,
  text,
  int,
} from 'drizzle-orm/mysql-core';
import { user } from './user';
import { relations } from 'drizzle-orm';
import { accessLog } from './accessLog';

export const url = mysqlTable('url', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  original: text('original').notNull(),
  short: varchar('short', { length: 6 }).unique().notNull(),
  userId: varchar('userId', { length: 36 }).references(() => user.id, {
    onDelete: 'set null',
  }),
  clicks: int('clicks').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  deletedAt: timestamp('deletedAt'),
});

export const urlRelations = relations(url, ({ one, many }) => ({
  user: one(user, {
    fields: [url.userId],
    references: [user.id],
  }),
  accessLogs: many(accessLog),
}));

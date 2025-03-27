import {
  mysqlTable,
  varchar,
  timestamp,
  text,
  int,
} from 'drizzle-orm/mysql-core';
import { user } from './user';

export const url = mysqlTable('url', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  original: text('original').notNull(),
  short: varchar('short', { length: 6 }).unique().notNull(),
  userId: varchar('user_id', { length: 36 }).references(() => user.id, {
    onDelete: 'set null',
  }),
  clicks: int('clicks').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

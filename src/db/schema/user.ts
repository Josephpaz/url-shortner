import { relations } from 'drizzle-orm';
import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { url } from './url';

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  urls: many(url),
}));

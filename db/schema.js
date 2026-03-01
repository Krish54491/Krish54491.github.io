import { boolean } from "drizzle-orm/gel-core";
import { pgTable, timestamp, text, uuid, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow(),
  username: text("username").notNull().default("Anon"),
  device_id: text("device_id").notNull().unique(),
  banned: boolean("banned").notNull().default(false),
  stockAmount: integer("stock_amount").notNull().default(0),
}).enableRLS();
export const commentsTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  page: text("page").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  deleted: boolean("deleted").notNull().default(false),
  parent_comment_id: uuid("parent_comment_id")
    .references(() => commentsTable.id, { onDelete: "no action" })
    .default(null),
}).enableRLS();

import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow(),
  username: text("username").notNull().default("Anon"),
  mac_address: text("mac_address").notNull().unique(),
});
export const commentsTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  page: text("page").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

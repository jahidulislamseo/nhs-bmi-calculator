import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const bmiRecords = pgTable("bmi_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  height: text("height").notNull(), // Storing as text to support flex inputs or strict numbers? Let's use number/integer
  weight: text("weight").notNull(),
  bmi: text("bmi").notNull(),
  category: text("category").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertBmiRecordSchema = createInsertSchema(bmiRecords).pick({
  height: true,
  weight: true,
  bmi: true,
  category: true,
});

export type InsertBmiRecord = z.infer<typeof insertBmiRecordSchema>;
export type BmiRecord = typeof bmiRecords.$inferSelect;

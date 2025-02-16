import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

export const roadmaps = pgTable("roadmaps", {
  id: serial("id").primaryKey(),
  skillId: integer("skill_id").references(() => skills.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  steps: json("steps").$type<{
    id: string;
    title: string;
    description: string;
    resources: {
      type: 'article' | 'video' | 'course';
      title: string;
      url: string;
      duration?: string;
    }[];
  }[]>().notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  roadmapId: integer("roadmap_id").references(() => roadmaps.id),
  completedSteps: json("completed_steps").$type<string[]>().notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSkillSchema = createInsertSchema(skills);
export const insertRoadmapSchema = createInsertSchema(roadmaps);
export const insertProgressSchema = createInsertSchema(progress);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Roadmap = typeof roadmaps.$inferSelect;
export type Progress = typeof progress.$inferSelect;

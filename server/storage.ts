import { IStorage } from "./types";
import { User, Skill, Roadmap, Progress, InsertUser } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skills: Map<number, Skill>;
  private roadmaps: Map<number, Roadmap>;
  private progress: Map<number, Progress>;
  private currentId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.roadmaps = new Map();
    this.progress = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Seed initial skills and roadmaps
    this.seedInitialData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getRoadmap(skillId: number): Promise<Roadmap | undefined> {
    return Array.from(this.roadmaps.values()).find(
      (roadmap) => roadmap.skillId === skillId,
    );
  }

  async getProgress(userId: number, roadmapId: number): Promise<Progress | undefined> {
    return Array.from(this.progress.values()).find(
      (p) => p.userId === userId && p.roadmapId === roadmapId,
    );
  }

  async updateProgress(progress: Progress): Promise<Progress> {
    this.progress.set(progress.id, progress);
    return progress;
  }

  private seedInitialData() {
    // Seed skills
    const webDev: Skill = {
      id: 1,
      name: "Web Development",
      description: "Learn modern web development from start to finish",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    };
    this.skills.set(webDev.id, webDev);

    const ml: Skill = {
      id: 2,
      name: "Machine Learning",
      description: "Master machine learning and AI concepts",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    };
    this.skills.set(ml.id, ml);

    // Seed roadmaps
    const webDevRoadmap: Roadmap = {
      id: 1,
      skillId: 1,
      title: "Full Stack Web Development",
      description: "Complete path to becoming a full stack developer",
      steps: [
        {
          id: "html-css",
          title: "HTML & CSS Fundamentals",
          description: "Learn the basics of web development",
          resources: [
            {
              type: "course",
              title: "HTML & CSS Crash Course",
              url: "https://www.youtube.com/watch?v=916GWv2Qs08",
              duration: "2 hours"
            }
          ]
        },
        {
          id: "javascript",
          title: "JavaScript Essentials",
          description: "Master core JavaScript concepts",
          resources: [
            {
              type: "article",
              title: "JavaScript Fundamentals",
              url: "https://javascript.info/"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(webDevRoadmap.id, webDevRoadmap);
  }
}

export const storage = new MemStorage();

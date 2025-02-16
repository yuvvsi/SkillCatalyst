import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get("/api/roadmap/:skillId", async (req, res) => {
    const skillId = parseInt(req.params.skillId);
    const roadmap = await storage.getRoadmap(skillId);
    if (!roadmap) {
      res.status(404).send("Roadmap not found");
      return;
    }
    res.json(roadmap);
  });

  app.get("/api/progress/:roadmapId", async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).send("Unauthorized");
      return;
    }
    const roadmapId = parseInt(req.params.roadmapId);
    const progress = await storage.getProgress(req.user.id, roadmapId);
    res.json(progress || { completedSteps: [] });
  });

  app.post("/api/progress/:roadmapId", async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).send("Unauthorized");
      return;
    }
    const roadmapId = parseInt(req.params.roadmapId);
    const progress = await storage.updateProgress({
      id: req.user.id,
      userId: req.user.id,
      roadmapId,
      completedSteps: req.body.completedSteps,
      lastUpdated: new Date(),
    });
    res.json(progress);
  });

  const httpServer = createServer(app);
  return httpServer;
}

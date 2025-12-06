import type { Express, Request, Response } from "express";
import { insertBmiRecordSchema } from "@shared/schema";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.get("/api/bmi-history", async (_req: Request, res: Response) => {
    const records = await storage.getBmiRecords();
    res.json(records);
  });

  app.post("/api/bmi-history", async (req: Request, res: Response) => {
    try {
      const data = insertBmiRecordSchema.parse(req.body);
      const record = await storage.createBmiRecord(data);
      res.json(record);
    } catch (error) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  return httpServer;
}

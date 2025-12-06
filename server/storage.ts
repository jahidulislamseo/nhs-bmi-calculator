import { type User, type InsertUser, type BmiRecord, type InsertBmiRecord } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBmiRecords(): Promise<BmiRecord[]>;
  createBmiRecord(record: InsertBmiRecord): Promise<BmiRecord>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bmiRecords: Map<string, BmiRecord>;

  constructor() {
    this.users = new Map();
    this.bmiRecords = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBmiRecords(): Promise<BmiRecord[]> {
    return Array.from(this.bmiRecords.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createBmiRecord(insertRecord: InsertBmiRecord): Promise<BmiRecord> {
    const id = randomUUID();
    const record: BmiRecord = {
      ...insertRecord,
      id,
      createdAt: new Date().toISOString()
    };
    this.bmiRecords.set(id, record);
    // Keep only last 50 records for this demo to avoid infinite growth in memory
    if (this.bmiRecords.size > 50) {
      const oldestKey = this.bmiRecords.keys().next().value;
      if (oldestKey) this.bmiRecords.delete(oldestKey);
    }
    return record;
  }
}

export const storage = new MemStorage();

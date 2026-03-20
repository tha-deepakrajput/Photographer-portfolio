import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing in environment variables.");
}

// Global proxy to prevent connection exhaustions during Hot-Module-Replacement (HMR) in Dev
const globalForDb = globalThis as unknown as {
  postgresClient: postgres.Sql | undefined;
};

const client = globalForDb.postgresClient ?? postgres(connectionString, { 
  prepare: false,
  // Limit max connections to give Neon DB breathing room
  max: process.env.NODE_ENV === "production" ? 10 : 2 
});

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });

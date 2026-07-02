import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  CORS_ORIGIN: z.string().min(1),
  ORACLE_CLIENT_PATH: z.string().optional(),
  ORACLE_PAYROLL_USER: z.string().min(1),
  ORACLE_PAYROLL_PASSWORD: z.string().min(1),
  ORACLE_PAYROLL_CONNECT_STRING: z.string().min(1),
  ORACLE_ASSET_USER: z.string().min(1),
  ORACLE_ASSET_PASSWORD: z.string().min(1),
  ORACLE_ASSET_CONNECT_STRING: z.string().min(1),
  ADMIN_SEED_PASSWORD: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === "production";

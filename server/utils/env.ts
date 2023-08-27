import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
  SERVICE_KEY: z.string(),
  PROJECT_REF: z.string(),
  DB_URL: z.string(),
  POOL_URL: z.string(),
});

export default envSchema.parse(process.env);

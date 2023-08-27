import { Config } from "drizzle-kit";
import env from "./server/utils/env";

export default {
  schema: "./db/schema.ts",
  out: "./db/drizzle",
  dbCredentials: {
    connectionString: env.DB_URL,
  },
  breakpoints: true,
  driver: "pg",
  introspect: {
    casing: "preserve",
  },
  strict: true,
} satisfies Config;

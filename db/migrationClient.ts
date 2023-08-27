import { drizzle } from "drizzle-orm/node-postgres";
import * as pg from "pg";
import env from "../server/utils/env";

const { Client } = pg;

const client = new Client({ connectionString: env.DB_URL });

export default async () => {
  await client.connect();
  return drizzle(client);
};

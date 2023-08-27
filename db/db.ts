import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const Client = pg.Client;

const client = new Client({ connectionString: env.POOL_URL });

await client.connect();
export default () => {
  return drizzle(client);
};

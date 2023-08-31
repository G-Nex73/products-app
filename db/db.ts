import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({ connectionString: env.DB_URL });

// await pool.connect();
export default drizzle(pool);

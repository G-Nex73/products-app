import { migrate } from "drizzle-orm/node-postgres/migrator";
import migrationClient from "../db/migrationClient";

async function main() {
  console.log("Migrating database...");
  const client = await migrationClient();
  await migrate(client, {
    migrationsFolder: "./db/drizzle",
  });
  console.log("Done!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(0);
});

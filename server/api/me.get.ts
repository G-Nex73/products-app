import { eq } from "drizzle-orm";
import { profiles } from "db/schema";
import db from "db/db";

export default defineEventHandler(async (event) => {
  const user = await auth(event);
  const data = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, user.id));
  return data[0];
});

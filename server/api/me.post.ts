import { parseBodyAs, z } from "@sidebase/nuxt-parse";
import db from "../../db/db";
import { profiles } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const user = await auth(event);
  const { name, username: user_name } = await parseBodyAs(
    event,
    z.object({ name: z.string(), username: z.string() }),
  );
  const data = await db()
    .insert(profiles)
    .values({ name, user_name, user_id: user.id });

  return data;
});

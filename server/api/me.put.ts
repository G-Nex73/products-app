import { parseBodyAs, z } from "@sidebase/nuxt-parse";
import { eq } from "drizzle-orm";
import db from "db/db";
import { profiles } from "db/schema";
import meGet from "./me.get";

export default defineEventHandler(async (event) => {
  await auth(event);
  const { name, user_name } = await parseBodyAs(
    event,
    z.object({ name: z.string().optional(), user_name: z.string().optional() }),
  );
  const profile = await meGet(event);
  const data = await db
    .update(profiles)
    .set({
      name: name ?? profile.name,
      user_name: user_name ?? profile.user_name,
    })
    .where(eq(profiles.user_id, profile.user_id));

  return data;
});

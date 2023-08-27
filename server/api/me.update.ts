import { parseBodyAs, z } from "@sidebase/nuxt-parse";
import db from "../../db/db";
import { profiles } from "../../db/schema";

export default defineEventHandler(async (event) => {
  const user = await auth(event);
  const { name, username: user_name } = await parseBodyAs(
    event,
    z.object({ name: z.string(), username: z.string() }),
  );
  const data = await db().update(profiles).set({ name, user_name });

  return data;
});

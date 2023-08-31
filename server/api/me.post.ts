import { parseBodyAs, z } from "@sidebase/nuxt-parse";
import db from "db/db";
import { profiles, insertProfileSchema } from "db/schema";
import mePut from "./me.put";

export default defineEventHandler(async (event) => {
  const user = await auth(event);
  const { name, user_name } = await parseBodyAs(
    event,
    z.object({ name: z.string(), user_name: z.string() }),
  );
  const data = await db
    .insert(profiles)
    .values(insertProfileSchema.parse({ name, user_name, user_id: user.id }))
    .catch(async (error) => {
      if (error.code === "23505") {
        const data = await mePut(event);
        return data;
      } else {
        throw createError({
          message: "Failed to create profile",
          statusCode: 400,
        });
      }
    });
  return data;
});

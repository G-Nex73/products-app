import { H3Event } from "h3";
import { serverSupabaseUser } from "#supabase/server";

export default async (event: H3Event) => {
  const user = await serverSupabaseUser(event);
  if (user) return user;
  throw createError({
    statusCode: 401,
    message: "Unauthorized",
  });
};

import { useSupabaseUser } from "@nuxtjs/supabase/dist/runtime/composables/useSupabaseUser.mjs";

export default async function () {
  const user = useSupabaseUser();
}

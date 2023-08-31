import { User } from "@supabase/supabase-js";

export default function () {
  return useSupabaseUser() as Ref<User | null>;
}

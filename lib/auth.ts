import { cache } from "react";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id, name, email, role, created_at")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  return profile ?? null;
});

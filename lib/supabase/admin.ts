import { createClient } from "@supabase/supabase-js";

import { serverEnv } from "@/lib/server-env";

export const supabaseAdmin = createClient(
  serverEnv.supabaseUrl,
  serverEnv.supabaseServiceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

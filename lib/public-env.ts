import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const parsed = publicSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error("Missing public Supabase environment variables.");
}

export const publicEnv = {
  supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

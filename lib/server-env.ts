import { z } from "zod";

const serverSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),
});

const parsed = serverSchema.safeParse(process.env);

if (!parsed.success) {
  const keys = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
  throw new Error(`Invalid environment variables: ${keys}`);
}

export const serverEnv = {
  supabaseUrl: parsed.data.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: parsed.data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: parsed.data.SUPABASE_SERVICE_ROLE_KEY,
  googleApiKey:
    parsed.data.GOOGLE_GENERATIVE_AI_API_KEY ?? parsed.data.GEMINI_API_KEY ?? "",
};

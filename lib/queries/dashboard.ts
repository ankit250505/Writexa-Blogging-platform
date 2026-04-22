import { supabaseAdmin } from "@/lib/supabase/admin";
import type { DashboardStats, Profile } from "@/types";

export async function getDashboardStats(profile: Profile): Promise<DashboardStats> {
  const [postsResult, ownPostsResult, commentsResult] = await Promise.all([
    supabaseAdmin.from("posts").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("author_id", profile.id),
    profile.role === "admin"
      ? supabaseAdmin.from("comments").select("*", { count: "exact", head: true })
      : supabaseAdmin
          .from("comments")
          .select("id, posts!inner(author_id)", { count: "exact", head: true })
          .eq("posts.author_id", profile.id),
  ]);

  return {
    totalPosts: postsResult.count ?? 0,
    ownPosts: ownPostsResult.count ?? 0,
    totalComments: commentsResult.count ?? 0,
  };
}

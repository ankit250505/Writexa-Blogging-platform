import { supabaseAdmin } from "@/lib/supabase/admin";
import type { CommentItem, Profile } from "@/types";

type RawCommentUser = { name: string | null } | { name: string | null }[] | null;

function getCommenterName(user: RawCommentUser) {
  if (Array.isArray(user)) {
    return user[0]?.name ?? "Anonymous";
  }

  return user?.name ?? "Anonymous";
}

export async function getCommentsForPost(postId: string) {
  const { data, error } = await supabaseAdmin
    .from("comments")
    .select("id, post_id, user_id, comment_text, created_at, users(name)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const comments: CommentItem[] =
    data?.map((comment) => ({
      id: comment.id,
      post_id: comment.post_id,
      user_id: comment.user_id,
      comment_text: comment.comment_text,
      created_at: comment.created_at,
      commenter_name: getCommenterName(comment.users as RawCommentUser),
    })) ?? [];

  return comments;
}

export async function getDashboardComments(profile: Profile) {
  if (profile.role === "admin") {
    const { data, error } = await supabaseAdmin
      .from("comments")
      .select(
        "id, post_id, user_id, comment_text, created_at, posts(title, author_id), users(name)",
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  const { data, error } = await supabaseAdmin
    .from("comments")
    .select(
      "id, post_id, user_id, comment_text, created_at, posts!inner(title, author_id), users(name)",
    )
    .eq("posts.author_id", profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

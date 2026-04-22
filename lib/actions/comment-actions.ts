"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentProfile } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ActionState } from "@/types";

const commentSchema = z.object({
  comment: z.string().min(2, "Comment must be at least 2 characters"),
});

export async function createCommentAction(
  postId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const profile = await getCurrentProfile();

  if (!profile) {
    return { error: "Please log in to comment." };
  }

  const parsed = commentSchema.safeParse({
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: profile.id,
    comment_text: parsed.data.comment,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/posts/${postId}`);
  revalidatePath("/dashboard/comments");

  return { success: "Comment added." };
}

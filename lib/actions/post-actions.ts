"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentProfile } from "@/lib/auth";
import { IMAGE_BUCKET } from "@/lib/constants";
import { generatePostSummary } from "@/lib/gemini";
import { canCreatePost, canDeletePost, canEditPost } from "@/lib/permissions";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ActionState } from "@/types";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  body: z.string().min(50, "Body must be at least 50 characters"),
});

async function uploadFeaturedImage(file: File, userId: string) {
  if (!file || file.size === 0) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const fileExtension = file.name.split(".").pop() || "jpg";
  const filePath = `${userId}/${randomUUID()}.${fileExtension}`;

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);

  return publicUrl;
}

export async function createPostAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const profile = await getCurrentProfile();

  if (!profile || !canCreatePost(profile)) {
    return { error: "You do not have permission to create posts." };
  }

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  let createdPostId: string | null = null;

  try {
    const imageFile = formData.get("featuredImage");
    const imageUrl =
      imageFile instanceof File && imageFile.size > 0
        ? await uploadFeaturedImage(imageFile, profile.id)
        : null;

    const summary = await generatePostSummary(parsed.data);
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: parsed.data.title,
        body: parsed.data.body,
        image_url: imageUrl,
        author_id: profile.id,
        summary,
      })
      .select("id")
      .single();

    if (error) {
      return { error: error.message };
    }

    createdPostId = data.id;
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/my-posts");
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to create post right now.",
    };
  }

  redirect(`/posts/${createdPostId}?created=1`);
}

export async function updatePostAction(
  postId: string,
  authorId: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const profile = await getCurrentProfile();

  if (!profile || !canEditPost(profile, authorId)) {
    return { error: "You do not have permission to edit this post." };
  }

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  try {
    const imageFile = formData.get("featuredImage");
    let imageUrl = (formData.get("existingImageUrl") as string) || null;

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadFeaturedImage(imageFile, profile.id);
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("posts")
      .update({
        title: parsed.data.title,
        body: parsed.data.body,
        image_url: imageUrl,
      })
      .eq("id", postId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/");
    revalidatePath(`/posts/${postId}`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/my-posts");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to update post.",
    };
  }

  redirect(`/posts/${postId}?updated=1`);
}

export async function deletePostAction(postId: string) {
  const profile = await getCurrentProfile();

  if (!canDeletePost(profile)) {
    throw new Error("You do not have permission to delete posts.");
  }

  const supabase = await createServerSupabaseClient();
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("id, image_url")
    .eq("id", postId)
    .maybeSingle<{ id: string; image_url: string | null }>();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    throw new Error(error.message);
  }

  if (post?.image_url) {
    try {
      const imagePath = extractStoragePathFromUrl(post.image_url);

      if (imagePath) {
        await supabaseAdmin.storage.from(IMAGE_BUCKET).remove([imagePath]);
      }
    } catch (storageError) {
      console.error("Image cleanup failed after deleting post", storageError);
    }
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/my-posts");
  revalidatePath("/dashboard/comments");
  redirect("/dashboard/my-posts?deleted=1");
}

function extractStoragePathFromUrl(imageUrl: string) {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const index = imageUrl.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return imageUrl.slice(index + marker.length);
}

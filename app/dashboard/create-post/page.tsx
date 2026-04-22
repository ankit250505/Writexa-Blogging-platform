import { redirect } from "next/navigation";

import { PostEditorForm } from "@/components/posts/post-editor-form";
import { PageHeader } from "@/components/layout/page-header";
import { getCurrentProfile } from "@/lib/auth";
import { createPostAction } from "@/lib/actions/post-actions";
import { canCreatePost } from "@/lib/permissions";

export default async function CreatePostPage() {
  const profile = await getCurrentProfile();

  if (!canCreatePost(profile)) {
    redirect("/unauthorized");
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Create post"
        title="Write a new article with a one-time AI summary"
        description="On submission, the server uploads the image, generates the summary with Gemini, stores both in Supabase, and saves the post once."
      />

      <PostEditorForm formAction={createPostAction} mode="create" />
    </div>
  );
}

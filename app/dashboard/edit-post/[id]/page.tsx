import { redirect } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { PostEditorForm } from "@/components/posts/post-editor-form";
import { getCurrentProfile } from "@/lib/auth";
import { updatePostAction } from "@/lib/actions/post-actions";
import { canEditPost } from "@/lib/permissions";
import { getPostById } from "@/lib/queries/posts";

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const [profile, post] = await Promise.all([getCurrentProfile(), getPostById(id)]);

  if (!profile || !post || !canEditPost(profile, post.author_id)) {
    redirect("/unauthorized");
  }

  const boundAction = updatePostAction.bind(null, post.id, post.author_id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Edit post"
        title={`Update "${post.title}"`}
        description="Authors can edit only their own posts. Admins can edit any post. The AI summary is preserved to avoid unnecessary cost."
      />

      <PostEditorForm formAction={boundAction} mode="edit" initialPost={post} />
    </div>
  );
}

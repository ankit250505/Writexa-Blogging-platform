import { redirect } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { getCurrentProfile } from "@/lib/auth";
import { canAccessCommentsDashboard } from "@/lib/permissions";
import { getDashboardComments } from "@/lib/queries/comments";
import { formatDate } from "@/lib/utils";

export default async function CommentsDashboardPage() {
  const profile = await getCurrentProfile();

  if (!profile || !canAccessCommentsDashboard(profile)) {
    redirect("/unauthorized");
  }

  const comments = await getDashboardComments(profile);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Comments"
        title={profile.role === "admin" ? "Moderation view" : "Comments on your posts"}
        description="Admins can monitor all comments. Authors see comments only on posts they own. The filtering decision is enforced on the server."
      />

      {!comments.length ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          No comments to review yet.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => {
            const postData =
              comment.posts && !Array.isArray(comment.posts) ? comment.posts : comment.posts?.[0];
            const userData =
              comment.users && !Array.isArray(comment.users) ? comment.users : comment.users?.[0];

            return (
              <article
                key={comment.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {userData?.name ?? "Anonymous"}
                    </p>
                    <p className="text-sm text-slate-500">{postData?.title ?? "Untitled post"}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{comment.comment_text}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

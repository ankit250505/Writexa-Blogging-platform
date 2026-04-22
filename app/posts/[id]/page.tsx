import Image from "next/image";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comments/comment-form";
import { CommentList } from "@/components/comments/comment-list";
import { Container } from "@/components/layout/container";
import { getCurrentProfile } from "@/lib/auth";
import { getCommentsForPost } from "@/lib/queries/comments";
import { getPostById } from "@/lib/queries/posts";
import { formatDate } from "@/lib/utils";

type PostDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostDetailsPage({ params }: PostDetailsPageProps) {
  const { id } = await params;
  const [post, comments, profile] = await Promise.all([
    getPostById(id),
    getCommentsForPost(id),
    getCurrentProfile(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="py-12">
      <Container>
        <div className="mx-auto max-w-4xl space-y-10">
          <article className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {post.author_name} · {formatDate(post.created_at)}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {post.title}
              </h1>
            </div>

            {post.image_url ? (
              <div className="relative h-80 overflow-hidden rounded-[28px]">
                <Image src={post.image_url} alt={post.title} fill className="object-cover" />
              </div>
            ) : null}

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                AI Summary
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {post.summary || "Summary unavailable"}
              </p>
            </div>

            <div className="max-w-none whitespace-pre-wrap text-base leading-8 text-slate-700">
              {post.body}
            </div>
          </article>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-ink">Comments</h2>
              <p className="text-sm text-slate-600">
                Logged-in users can comment. Comments are stored in Supabase and shown in
                chronological order.
              </p>
            </div>

            <CommentForm postId={post.id} canComment={Boolean(profile)} />
            <CommentList comments={comments} />
          </section>
        </div>
      </Container>
    </main>
  );
}

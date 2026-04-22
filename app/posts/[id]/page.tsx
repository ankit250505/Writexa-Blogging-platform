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
    <main className="py-16 md:py-24 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <Container>
        <div className="mx-auto max-w-5xl">
          <article className="glass-card overflow-hidden p-6 sm:p-12 animate-reveal relative z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            {/* Ambient background glow inside the card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <header className="space-y-6 text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                {post.author_name} <span className="text-slate-500 mx-1">·</span> {formatDate(post.created_at)}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1] drop-shadow-lg">
                {post.title}
              </h1>
            </header>

            {post.image_url ? (
              <div className="relative h-72 sm:h-96 md:h-[500px] w-full overflow-hidden rounded-[32px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),_0_0_30px_-5px_rgba(59,130,246,0.3)] border border-white/10 mb-12 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent z-10 pointer-events-none opacity-60" />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-color-burn z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
            ) : null}

            <div className="max-w-3xl mx-auto space-y-12">
              {/* AI Summary Block */}
              <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-[#13141c]/80 p-6 sm:p-8 backdrop-blur-md shadow-[inset_0_0_20px_rgba(59,130,246,0.05),_0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all hover:border-blue-500/30 hover:shadow-[inset_0_0_20px_rgba(59,130,246,0.1),_0_15px_40px_-10px_rgba(59,130,246,0.2)]">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-indigo-600" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                    ⚡
                  </span>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300 text-glow-primary">
                    AI Summary
                  </p>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-medium">
                  {post.summary || "Summary unavailable"}
                </p>
              </div>

              {/* Article Content */}
              <div className="max-w-none whitespace-pre-wrap text-lg leading-[1.8] text-slate-300">
                {post.body}
              </div>
            </div>
          </article>

          <section className="space-y-8 animate-reveal mt-16 relative z-10 max-w-4xl mx-auto">
            <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-white drop-shadow-md">Comments</h2>
              <p className="text-slate-400 text-lg">
                Logged-in users can comment. Comments are stored in Supabase and shown in
                chronological order.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]">
              {/* Tailwind descendant overrides to forcefully theme the comment components without editing their source files */}
              <div className="[&_textarea]:!bg-white/5 [&_textarea]:!border-white/10 [&_textarea]:!text-white [&_textarea:focus]:!border-blue-500/50 [&_textarea:focus]:!bg-white/10 [&_textarea:focus]:!shadow-[0_0_15px_rgba(59,130,246,0.15)] [&_button]:!bg-gradient-to-r [&_button]:!from-blue-600 [&_button]:!to-indigo-600 [&_button]:!text-white [&_button]:!border-none [&_button]:!shadow-[0_4px_15px_-5px_rgba(59,130,246,0.5)] [&_button:hover]:!shadow-[0_8px_20px_-5px_rgba(59,130,246,0.6)] [&_button:hover]:!-translate-y-0.5 [&_button]:transition-all [&_button]:duration-300 [&_h3]:!text-white [&_article]:!bg-white/[0.02] [&_article]:!border-white/10 [&_article]:!rounded-2xl [&_article]:!shadow-none [&_article]:backdrop-blur-sm [&_p.text-slate-700]:!text-slate-300 [&_p.text-slate-500]:!text-slate-400 [&_p.text-slate-600]:!text-slate-400 [&_.bg-slate-100]:!bg-white/10 [&_.text-ink]:!text-white">
                <CommentForm postId={post.id} canComment={Boolean(profile)} />
                <div className="mt-12 pt-8 border-t border-white/10">
                  <CommentList comments={comments} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

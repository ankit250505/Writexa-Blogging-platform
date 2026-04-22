import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/posts/pagination";
import { PostCard } from "@/components/posts/post-card";
import { PostSearchForm } from "@/components/posts/post-search-form";
import { getPublishedPosts } from "@/lib/queries/posts";

type HomePageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

async function PostGrid({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const { posts, totalPages } = await getPublishedPosts({ page, search });

  if (!posts.length) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 animate-reveal">
        <p className="text-lg font-medium">No posts found. Try a different search query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-reveal">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center [&_*]:!text-white">
        <Pagination currentPage={page} totalPages={totalPages} search={search} />
      </div>
    </div>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const search = params.search?.trim() ?? "";

  return (
    <main className="py-16 md:py-24 relative">
      {/* Background ambient glow */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-60 right-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <Container>
        <section className="space-y-20 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            {/* Force text styling to ensure readability on dark background without modifying the component */}
            <div className="animate-reveal [&_h1]:!text-white [&_h1]:!text-5xl md:[&_h1]:!text-6xl [&_h1]:!font-extrabold [&_h1]:!leading-[1.1] [&_h1]:!tracking-tight [&_h1]:text-glow [&_p]:!text-slate-300 [&_p]:!text-lg md:[&_p]:!text-xl [&_p]:!leading-relaxed [&_p]:!mt-6 [&_[data-eyebrow]]:!text-blue-400 [&_[data-eyebrow]]:!text-sm [&_[data-eyebrow]]:!font-bold [&_[data-eyebrow]]:!uppercase [&_[data-eyebrow]]:!tracking-[0.2em] [&_[data-eyebrow]]:!mb-4">
              <PageHeader
                eyebrow="Internship Assignment"
                title="A polished blog platform with AI summaries and role-based access"
                description="Readers can discover posts quickly, authors can publish and edit their own content, and admins can monitor the platform from one dashboard."
              />
            </div>

            <div className="glass-card relative overflow-hidden p-8 lg:p-10 text-white group animate-reveal animate-float-delayed">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors duration-700" />

              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300/80 mb-4">
                  Cost-aware AI
                </p>
                <h2 className="text-2xl lg:text-3xl font-semibold leading-snug">
                  Summaries are generated once at post creation and stored in Supabase.
                </h2>
                <div className="mt-8 flex items-center gap-3 text-sm font-medium text-slate-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    ⚡
                  </span>
                  Optimized for performance
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto animate-reveal relative z-20">
            <PostSearchForm defaultValue={search} />
          </div>

          <Suspense
            key={`${page}-${search}`}
            fallback={
              <div className="glass-card p-20 text-center animate-pulse flex flex-col items-center justify-center space-y-6">
                <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                <p className="text-slate-400 font-medium text-lg">Discovering posts...</p>
              </div>
            }
          >
            <PostGrid page={page} search={search} />
          </Suspense>
        </section>
      </Container>
    </main>
  );
}

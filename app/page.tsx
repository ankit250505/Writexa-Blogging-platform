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
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/90 p-10 text-center text-slate-600">
        No posts found. Try a different search query.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} search={search} />
    </div>
  );
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const search = params.search?.trim() ?? "";

  return (
    <main className="py-12">
      <Container>
        <section className="space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <PageHeader
              eyebrow="Internship Assignment"
              title="A polished blog platform with AI summaries and role-based access"
              description="Readers can discover posts quickly, authors can publish and edit their own content, and admins can monitor the platform from one dashboard."
            />
            <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Cost-aware AI
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Summaries are generated once at post creation and stored in Supabase.
              </h2>
            </div>
          </div>

          <PostSearchForm defaultValue={search} />

          <Suspense
            key={`${page}-${search}`}
            fallback={
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-card">
                Loading posts...
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

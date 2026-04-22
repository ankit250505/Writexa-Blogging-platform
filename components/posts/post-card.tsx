import Image from "next/image";
import Link from "next/link";

import { formatDate, truncate } from "@/lib/utils";
import type { PostListItem } from "@/types";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card">
      <div className="relative h-52 bg-slate-100">
        {post.image_url ? (
          <Image src={post.image_url} alt={post.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-medium text-slate-500">
            No featured image
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {post.author_name} · {formatDate(post.created_at)}
          </p>
          <h2 className="text-xl font-semibold text-ink">{post.title}</h2>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {truncate(post.summary || "Summary unavailable", 220)}
        </p>

        <Link
          href={`/posts/${post.id}`}
          className="inline-flex rounded-full bg-slateBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}

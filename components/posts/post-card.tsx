import Image from "next/image";
import Link from "next/link";

import { formatDate, truncate } from "@/lib/utils";
import type { PostListItem } from "@/types";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <article className="glass-card group relative flex h-full flex-col overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),_0_0_40px_-10px_rgba(59,130,246,0.4)] hover:border-white/30">
      {/* Glossy reflection effect */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent mix-blend-overlay" />

      <div className="relative h-56 w-full overflow-hidden bg-[#0a0a0f]">
        {/* Soft dark vignette and gradient overlay for readable text blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13141c] via-[#13141c]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-color-burn z-10 group-hover:opacity-0 transition-opacity duration-700" />

        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:rotate-1"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 to-[#13141c] text-sm font-medium text-slate-500">
            <span className="z-20 text-slate-600">No featured image</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-8 relative z-20 -mt-12 bg-gradient-to-b from-transparent to-[#13141c] via-[#13141c]/95">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 backdrop-blur-md shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            {post.author_name}
          </span>
          <span className="text-xs font-medium text-slate-500 tracking-wide">
            {formatDate(post.created_at)}
          </span>
        </div>

        <h2 className="mb-4 text-2xl font-bold text-slate-100 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 leading-tight">
          {post.title}
        </h2>

        <p className="text-sm leading-relaxed text-slate-400 flex-1 mb-8 transition-colors duration-300 group-hover:text-slate-300">
          {truncate(post.summary || "Summary unavailable", 220)}
        </p>

        <div className="mt-auto border-t border-white/[0.05] pt-5">
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center text-sm font-bold text-slate-300 transition-all duration-300 group-hover:text-blue-400"
          >
            <span className="relative overflow-hidden pb-1">
              Read more
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </span>
            <span className="ml-2 transition-transform duration-300 ease-out group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

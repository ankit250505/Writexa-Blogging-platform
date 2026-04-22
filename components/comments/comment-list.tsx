import { formatDate } from "@/lib/utils";
import type { CommentItem } from "@/types";

export function CommentList({ comments }: { comments: CommentItem[] }) {
  if (!comments.length) {
    return (
      <div className="glass-card flex items-center justify-center p-10 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <p className="text-sm font-medium text-slate-400 relative z-10">
          No comments yet. Start the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="glass-card relative overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5),_0_0_20px_-5px_rgba(59,130,246,0.15)]"
        >
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="font-bold text-slate-100 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-extrabold text-blue-300 border border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                {comment.commenter_name.charAt(0).toUpperCase()}
              </span>
              <span className="drop-shadow-sm">{comment.commenter_name}</span>
            </h3>
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-300 sm:pl-11">
            {comment.comment_text}
          </p>
        </article>
      ))}
    </div>
  );
}

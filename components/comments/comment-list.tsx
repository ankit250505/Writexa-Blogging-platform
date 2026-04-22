import { formatDate } from "@/lib/utils";
import type { CommentItem } from "@/types";

export function CommentList({ comments }: { comments: CommentItem[] }) {
  if (!comments.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-sm text-slate-600">
        No comments yet. Start the conversation.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-semibold text-ink">{comment.commenter_name}</h3>
            <span className="text-xs text-slate-500">{formatDate(comment.created_at)}</span>
          </div>
          <p className="text-sm leading-6 text-slate-600">{comment.comment_text}</p>
        </article>
      ))}
    </div>
  );
}

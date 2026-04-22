"use client";

import Link from "next/link";
import { useActionState } from "react";

import { createCommentAction } from "@/lib/actions/comment-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState } from "@/types";

type CommentFormProps = {
  postId: string;
  canComment: boolean;
};

const initialState: ActionState = {};

export function CommentForm({ postId, canComment }: CommentFormProps) {
  const [state, formAction] = useActionState<ActionState, FormData>(
    createCommentAction.bind(null, postId),
    initialState,
  );

  if (!canComment) {
    return (
      <div className="glass-card p-10 text-center relative overflow-hidden group border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <p className="text-slate-300 relative z-10 text-lg font-medium">
          Please{" "}
          <Link
            href="/login"
            className="font-bold text-blue-400 hover:text-blue-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-400"
          >
            log in
          </Link>{" "}
          to add a comment.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="glass-card relative overflow-hidden p-6 sm:p-8 space-y-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-80" />

      <div className="space-y-3">
        <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-[0.1em] text-blue-400 pl-1">
          Add a comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          required
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-slate-200 backdrop-blur-md transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner"
          placeholder="Share your thoughts with the community..."
        />
      </div>

      {state?.error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 backdrop-blur-sm flex items-center gap-3 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 font-bold">!</span>
          {state.error}
        </div>
      ) : null}

      {state?.success ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-400 backdrop-blur-sm flex items-center gap-3 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 font-bold">✓</span>
          {state.success}
        </div>
      ) : null}

      <div className="flex justify-end pt-2 [&_button]:!bg-gradient-to-r [&_button]:!from-blue-600 [&_button]:!to-indigo-600 [&_button]:!text-white [&_button]:!border-none [&_button]:!shadow-[0_4px_15px_-5px_rgba(59,130,246,0.5)] [&_button:hover]:!shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] [&_button:hover]:!-translate-y-0.5 [&_button]:transition-all [&_button]:duration-300 [&_button]:rounded-xl [&_button]:px-6 [&_button]:py-2.5 [&_button]:font-bold">
        <SubmitButton idleText="Post comment" pendingText="Posting..." />
      </div>
    </form>
  );
}

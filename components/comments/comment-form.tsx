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
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <p className="text-sm text-slate-600">
          Please{" "}
          <Link href="/login" className="font-semibold text-slateBlue">
            log in
          </Link>{" "}
          to add a comment.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium text-slate-700">
          Add a comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          placeholder="Share your thoughts..."
        />
      </div>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {state.success}
        </p>
      ) : null}

      <SubmitButton idleText="Post comment" pendingText="Posting..." />
    </form>
  );
}

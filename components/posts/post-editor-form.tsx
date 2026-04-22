"use client";

import { useActionState } from "react";

import type { ActionState, PostDetail } from "@/types";
import { SubmitButton } from "@/components/ui/submit-button";

type PostEditorFormProps = {
  formAction: (
    state: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
  mode: "create" | "edit";
  initialPost?: PostDetail;
};

const initialState: ActionState = {};

export function PostEditorForm({
  formAction,
  mode,
  initialPost,
}: PostEditorFormProps) {
  const [state, action] = useActionState<ActionState, FormData>(
    formAction,
    initialState,
  );

  return (
    <form action={action} className="glass-card relative overflow-hidden p-6 sm:p-10 space-y-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border-white/10 w-full max-w-4xl mx-auto">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-80" />
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none rounded-full" />
      
      <div className="space-y-2 relative z-10">
        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-[0.1em] text-blue-400 pl-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={initialPost?.title}
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-slate-200 backdrop-blur-md transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner text-lg font-medium"
          placeholder="Write a clear, captivating title"
        />
      </div>

      <div className="space-y-2 relative z-10">
        <label htmlFor="featuredImage" className="block text-xs font-bold uppercase tracking-[0.1em] text-blue-400 pl-1">
          Featured image
        </label>
        <div className="relative group">
          <input
            id="featuredImage"
            name="featuredImage"
            type="file"
            accept="image/*"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-slate-300 backdrop-blur-md transition-all duration-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-400 hover:file:bg-blue-500/30 hover:file:text-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
          />
        </div>
        {initialPost?.image_url ? (
          <div className="mt-3 flex items-center gap-2">
            <input type="hidden" name="existingImageUrl" value={initialPost.image_url} />
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[10px] text-blue-400 border border-blue-500/30">i</span>
            <p className="text-xs font-medium text-slate-400">
              Leave empty to keep the existing image.
            </p>
          </div>
        ) : null}
      </div>

      <div className="space-y-2 relative z-10">
        <label htmlFor="body" className="block text-xs font-bold uppercase tracking-[0.1em] text-blue-400 pl-1">
          Body content
        </label>
        <textarea
          id="body"
          name="body"
          defaultValue={initialPost?.body}
          required
          rows={14}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-slate-300 backdrop-blur-md transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner leading-relaxed resize-y"
          placeholder="Write the full article here..."
        />
      </div>

      {mode === "edit" ? (
        <div className="relative z-10 rounded-xl border border-purple-500/20 bg-purple-500/10 px-5 py-4 text-sm font-medium text-purple-200 backdrop-blur-sm flex gap-3 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 font-bold text-purple-400">⚡</span>
          <p className="leading-relaxed">
            Cost optimization decision: editing a post keeps the existing AI summary unless you intentionally add a regenerate feature later.
          </p>
        </div>
      ) : null}

      {state?.error ? (
        <div className="relative z-10 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 backdrop-blur-sm flex items-center gap-3 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 font-bold">!</span>
          {state.error}
        </div>
      ) : null}

      <div className="relative z-10 pt-4 flex justify-end [&_button]:!bg-gradient-to-r [&_button]:!from-blue-600 [&_button]:!to-indigo-600 [&_button]:!text-white [&_button]:!border-none [&_button]:!shadow-[0_4px_15px_-5px_rgba(59,130,246,0.5)] [&_button:hover]:!shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] [&_button:hover]:!-translate-y-0.5 [&_button]:transition-all [&_button]:duration-300 [&_button]:rounded-xl [&_button]:px-8 [&_button]:py-3.5 [&_button]:font-bold [&_button]:tracking-wide [&_button]:text-base">
        <SubmitButton
          idleText={mode === "create" ? "Publish post" : "Save changes"}
          pendingText={mode === "create" ? "Publishing..." : "Saving..."}
        />
      </div>
    </form>
  );
}

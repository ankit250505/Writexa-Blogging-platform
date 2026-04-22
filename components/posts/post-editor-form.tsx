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
    <form action={action} className="space-y-5 rounded-3xl bg-white p-6 shadow-card">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={initialPost?.title}
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          placeholder="Write a clear title"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="featuredImage" className="text-sm font-medium text-slate-700">
          Featured image
        </label>
        <input
          id="featuredImage"
          name="featuredImage"
          type="file"
          accept="image/*"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
        />
        {initialPost?.image_url ? (
          <>
            <input type="hidden" name="existingImageUrl" value={initialPost.image_url} />
            <p className="text-xs text-slate-500">
              Leave empty to keep the existing image.
            </p>
          </>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium text-slate-700">
          Body content
        </label>
        <textarea
          id="body"
          name="body"
          defaultValue={initialPost?.body}
          required
          rows={14}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6"
          placeholder="Write the full article here..."
        />
      </div>

      {mode === "edit" ? (
        <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Cost optimization decision: editing a post keeps the existing AI summary unless you
          intentionally add a regenerate feature later.
        </p>
      ) : null}

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}

      <SubmitButton
        idleText={mode === "create" ? "Publish post" : "Save changes"}
        pendingText={mode === "create" ? "Publishing..." : "Saving..."}
      />
    </form>
  );
}

"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  idleText: string;
  pendingText: string;
};

export function SubmitButton({ idleText, pendingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingText : idleText}
    </button>
  );
}

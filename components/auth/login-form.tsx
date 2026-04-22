"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction } from "@/lib/actions/auth-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5 rounded-3xl bg-white p-8 shadow-card">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          placeholder="Enter your password"
        />
      </div>

      {state?.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      ) : null}

      <SubmitButton idleText="Login" pendingText="Signing in..." />

      <p className="text-sm text-slate-600">
        Need an account?{" "}
        <Link href="/signup" className="font-semibold text-slateBlue">
          Create one
        </Link>
      </p>
    </form>
  );
}

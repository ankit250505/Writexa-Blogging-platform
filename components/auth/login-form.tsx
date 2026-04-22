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
    <form action={formAction} className="glass-card relative overflow-hidden p-8 sm:p-10 space-y-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border-white/10 w-full max-w-md mx-auto">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600 opacity-80" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-[50px] pointer-events-none rounded-full" />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">Welcome Back</h2>
        <p className="mt-2 text-sm text-slate-400">Log in to access your dashboard</p>
      </div>

      <div className="space-y-2 relative z-10">
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-[0.1em] text-blue-400 pl-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-slate-200 backdrop-blur-md transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2 relative z-10">
        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-[0.1em] text-blue-400 pl-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-slate-200 backdrop-blur-md transition-all duration-300 placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner"
          placeholder="Enter your password"
        />
      </div>

      {state?.error ? (
        <div className="relative z-10 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 backdrop-blur-sm flex items-center gap-3 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 font-bold">!</span>
          {state.error}
        </div>
      ) : null}

      <div className="relative z-10 pt-2 [&_button]:!w-full [&_button]:!bg-gradient-to-r [&_button]:!from-blue-600 [&_button]:!to-indigo-600 [&_button]:!text-white [&_button]:!border-none [&_button]:!shadow-[0_4px_15px_-5px_rgba(59,130,246,0.5)] [&_button:hover]:!shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] [&_button:hover]:!-translate-y-0.5 [&_button]:transition-all [&_button]:duration-300 [&_button]:rounded-xl [&_button]:px-6 [&_button]:py-3.5 [&_button]:font-bold [&_button]:tracking-wide">
        <SubmitButton idleText="Login" pendingText="Signing in..." />
      </div>

      <p className="text-sm text-slate-400 text-center relative z-10 mt-6">
        Need an account?{" "}
        <Link href="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-400">
          Create one
        </Link>
      </p>
    </form>
  );
}

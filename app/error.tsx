"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="py-12">
      <Container>
        <div className="rounded-3xl border border-red-200 bg-white p-10 text-center shadow-card">
          <h2 className="text-2xl font-semibold text-ink">Something went wrong</h2>
          <p className="mt-3 text-sm text-slate-600">
            The page failed to load. Try again, or check your Supabase and environment setup.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </Container>
    </main>
  );
}

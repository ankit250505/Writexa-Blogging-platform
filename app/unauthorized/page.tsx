import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function UnauthorizedPage() {
  return (
    <main className="py-16">
      <Container>
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Access denied
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-ink">You are not allowed to view this page.</h1>
          <p className="mt-3 text-slate-600">
            The route exists, but your current role does not have permission to access it.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Back to dashboard
          </Link>
        </div>
      </Container>
    </main>
  );
}

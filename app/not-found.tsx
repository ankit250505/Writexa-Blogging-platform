import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main className="py-16">
      <Container>
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-card">
          <h1 className="text-3xl font-semibold text-ink">Post not found</h1>
          <p className="mt-3 text-slate-600">
            The requested post does not exist or may have been removed.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </Container>
    </main>
  );
}

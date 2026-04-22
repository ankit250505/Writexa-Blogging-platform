import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <main className="py-12">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-card">
          Loading...
        </div>
      </Container>
    </main>
  );
}

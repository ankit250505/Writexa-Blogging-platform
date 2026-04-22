import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getCurrentProfile } from "@/lib/auth";

export default async function LoginPage() {
  const profile = await getCurrentProfile();

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <main className="py-12">
      <Container>
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <PageHeader
            eyebrow="Welcome back"
            title="Login to continue writing, reading, and managing posts"
            description="Authentication is powered by Supabase Auth with secure server-side session checks."
          />
          <LoginForm />
        </div>
      </Container>
    </main>
  );
}

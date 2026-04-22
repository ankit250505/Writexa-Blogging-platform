import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/signup-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getCurrentProfile } from "@/lib/auth";

export default async function SignupPage() {
  const profile = await getCurrentProfile();

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <main className="py-12">
      <Container>
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <PageHeader
            eyebrow="Join the platform"
            title="Create your account and start as a Viewer"
            description="New users are created in Supabase Auth, then synced into the public users table with a default viewer role."
          />
          <SignupForm />
        </div>
      </Container>
    </main>
  );
}

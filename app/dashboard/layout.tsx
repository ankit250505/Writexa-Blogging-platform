import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Container } from "@/components/layout/container";
import { getCurrentProfile } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <main className="py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <DashboardSidebar profile={profile} />
          <div>{children}</div>
        </div>
      </Container>
    </main>
  );
}

import { redirect } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { RoleBadge } from "@/components/dashboard/role-badge";
import { getCurrentProfile } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <main className="py-12">
      <Container>
        <div className="space-y-8">
          <PageHeader
            eyebrow="Your profile"
            title={profile.name ?? "Profile"}
            description="Roles are stored in Supabase and checked on the server before sensitive actions are allowed."
          />

          <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-slate-500">Email</p>
                <p className="mt-2 text-base font-semibold text-ink">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Role</p>
                <div className="mt-2">
                  <RoleBadge role={profile.role} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Joined</p>
                <p className="mt-2 text-base font-semibold text-ink">
                  {formatDate(profile.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

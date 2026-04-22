import Link from "next/link";

import { RoleBadge } from "@/components/dashboard/role-badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/layout/page-header";
import { getCurrentProfile } from "@/lib/auth";
import { getDashboardStats } from "@/lib/queries/dashboard";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return null;
  }

  const stats = await getDashboardStats(profile);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          eyebrow="Dashboard"
          title={`Welcome, ${profile.name ?? "there"}`}
          description="This overview changes slightly by role, but all sensitive data still goes through server-side checks."
        />
        <RoleBadge role={profile.role} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total posts" value={stats.totalPosts} description="All published posts" />
        <StatCard label="Your posts" value={stats.ownPosts} description="Posts authored by you" />
        <StatCard
          label="Comments in scope"
          value={stats.totalComments}
          description={
            profile.role === "admin"
              ? "All comments across the platform"
              : "Comments on your own posts"
          }
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-ink">What you can do</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {(profile.role === "author" || profile.role === "admin") && (
            <>
              <Link
                href="/dashboard/create-post"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Create a post
              </Link>
              <Link
                href="/dashboard/my-posts"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Manage posts
              </Link>
              <Link
                href="/dashboard/comments"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                View comments
              </Link>
            </>
          )}
          {profile.role === "viewer" && (
            <p className="text-sm text-slate-600">
              Viewers can read posts, open full articles, and comment after logging in.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

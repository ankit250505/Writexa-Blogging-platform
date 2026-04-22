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
    <div className="space-y-12 animate-reveal relative">
      {/* Background ambient glow inside dashboard */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 relative z-10">
        <div className="[&_h1]:!text-white [&_h1]:!text-4xl [&_h1]:!font-bold [&_h1]:!tracking-tight [&_h1]:text-glow [&_p]:!text-slate-400 [&_p]:!mt-2 [&_[data-eyebrow]]:!text-blue-400 [&_[data-eyebrow]]:!text-xs [&_[data-eyebrow]]:!font-bold [&_[data-eyebrow]]:!uppercase [&_[data-eyebrow]]:!tracking-[0.2em] [&_[data-eyebrow]]:!mb-3">
          <PageHeader
            eyebrow="Dashboard"
            title={`Welcome, ${profile.name ?? "there"}`}
            description="This overview changes slightly by role, but all sensitive data still goes through server-side checks."
          />
        </div>
        <div className="[&_*]:!border-white/20 [&_*]:!bg-white/10 [&_*]:!text-blue-300 [&_*]:backdrop-blur-md pt-1 sm:pt-2">
          <RoleBadge role={profile.role} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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

      <div className="glass-card relative overflow-hidden p-8 sm:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              ⚡
            </span>
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            {(profile.role === "author" || profile.role === "admin") && (
              <>
                <Link
                  href="/dashboard/create-post"
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_15px_-5px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.6)] group"
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
                  Create a post
                </Link>
                <Link
                  href="/dashboard/my-posts"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  Manage posts
                </Link>
                <Link
                  href="/dashboard/comments"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-slate-300 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  View comments
                </Link>
              </>
            )}
            {profile.role === "viewer" && (
              <p className="text-sm font-medium text-slate-400 bg-white/5 px-5 py-4 rounded-xl border border-white/10 w-full backdrop-blur-sm">
                Viewers can read posts, open full articles, and comment after logging in.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

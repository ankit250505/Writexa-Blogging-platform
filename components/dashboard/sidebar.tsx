import Link from "next/link";
import { LayoutDashboard, MessageSquareText, PenLine, ScrollText } from "lucide-react";

import type { Profile } from "@/types";

type DashboardSidebarProps = {
  profile: Profile;
};

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const links = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    ...(profile.role === "author" || profile.role === "admin"
      ? [
          {
            href: "/dashboard/create-post",
            label: "Create post",
            icon: PenLine,
          },
          {
            href: "/dashboard/my-posts",
            label: "My posts",
            icon: ScrollText,
          },
        ]
      : []),
    ...(profile.role === "author" || profile.role === "admin"
      ? [
          {
            href: "/dashboard/comments",
            label: "Comments",
            icon: MessageSquareText,
          },
        ]
      : []),
  ];

  return (
    <aside className="glass-card relative overflow-hidden p-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] border-white/10 min-h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-50" />
      
      <div className="relative z-10">
        <div className="mb-8 space-y-2 border-b border-white/10 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 drop-shadow-sm">
            Dashboard
          </p>
          <h2 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
            {profile.name ?? "User"}
          </h2>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 rounded-xl border border-transparent px-4 py-3.5 text-sm font-semibold text-slate-400 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-500 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  <Icon className="h-4 w-4" />
                </div>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

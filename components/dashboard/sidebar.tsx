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
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="mb-6 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Dashboard
        </p>
        <h2 className="text-lg font-semibold text-ink">{profile.name ?? "User"}</h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

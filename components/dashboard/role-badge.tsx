import type { Role } from "@/types";

const roleStyles: Record<Role, string> = {
  admin: "bg-amber-100 text-amber-800",
  author: "bg-blue-100 text-blue-800",
  viewer: "bg-slate-100 text-slate-700",
};

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${roleStyles[role]}`}
    >
      {role}
    </span>
  );
}

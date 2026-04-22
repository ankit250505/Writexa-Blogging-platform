import Link from "next/link";
import { PenSquare } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import { getCurrentProfile } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { RoleBadge } from "@/components/dashboard/role-badge";
import { Container } from "@/components/layout/container";

export async function Navbar() {
  const profile = await getCurrentProfile();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-ink">
            <span className="rounded-xl bg-ink p-2 text-white">
              <PenSquare className="h-4 w-4" />
            </span>
            {APP_NAME}
          </Link>

          <nav className="flex items-center gap-3">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-ink">
              Home
            </Link>
            {profile ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-ink"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-slate-600 hover:text-ink"
                >
                  Profile
                </Link>
                <RoleBadge role={profile.role} />
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}

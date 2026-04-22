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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent before:pointer-events-none">
      <Container>
        <div className="flex min-h-[5rem] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3 text-lg font-extrabold text-white transition-all duration-300 hover:text-blue-400">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
              <PenSquare className="relative z-10 h-4 w-4" />
            </span>
            <span className="tracking-tight drop-shadow-md hidden sm:block">{APP_NAME}</span>
          </Link>

          <nav className="flex items-center gap-2 md:gap-4">
            {/* Primary Navigation Pills */}
            <div className="flex items-center gap-1 rounded-2xl border border-white/5 bg-white/[0.02] p-1 backdrop-blur-md shadow-inner">
              <Link
                href="/"
                className="rounded-xl px-3 py-2 md:px-4 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                Home
              </Link>
              {profile && (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-xl px-3 py-2 md:px-4 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="hidden sm:block rounded-xl px-3 py-2 md:px-4 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>

            {/* Separator */}
            <div className="hidden md:block h-6 w-px bg-white/10 mx-1 md:mx-2" />

            {/* Secondary Actions / Profile */}
            <div className="flex items-center gap-2 md:gap-3">
              {profile ? (
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Force nested components to adopt dark theme styles */}
                  <div className="hidden lg:block [&_*]:!border-white/20 [&_*]:!bg-white/10 [&_*]:!text-blue-300 [&_*]:backdrop-blur-md">
                    <RoleBadge role={profile.role} />
                  </div>
                  <div className="[&_button]:rounded-xl [&_button]:px-3 [&_button]:py-2 md:[&_button]:px-4 [&_button]:!text-slate-300 [&_button:hover]:bg-red-500/10 [&_button:hover]:!text-red-400 [&_button]:transition-all [&_button]:duration-300 [&_button]:font-semibold [&_button]:text-sm">
                    <LogoutButton />
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 md:px-5 text-sm font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 md:px-5 text-sm font-bold text-white shadow-[0_4px_15px_-5px_rgba(59,130,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-5px_rgba(59,130,246,0.6)]"
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 mix-blend-overlay transition-opacity duration-300 hover:opacity-100" />
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}

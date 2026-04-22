import type { Metadata } from "next";

import "@/app/globals.css";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Inkspire | AI-powered blogging platform",
  description: "A role-based blogging platform built with Next.js, Supabase, and Gemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

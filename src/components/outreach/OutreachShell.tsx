"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ExternalLink, LogOut, Upload, Users } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const NAV = [
  { href: "/outreach", label: "Upload", icon: Upload },
  { href: "/outreach/leads", label: "Leads", icon: Users },
  { href: "/outreach/activity", label: "Activity", icon: Activity },
];

export function OutreachShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/outreach/logout", { method: "POST" });
    window.location.assign("/outreach/login");
  }

  return (
    <div className="outreach-shell flex min-h-screen">
      <aside className="outreach-sidebar sticky top-0 hidden h-screen w-56 shrink-0 flex-col p-5 md:flex">
        <div className="mb-6">
          <Logo href="/" linked className="h-6" />
          <p className="mono-label mt-4">Internal</p>
          <p className="mt-0.5 text-base font-semibold tracking-tight text-foreground">
            Outreach
          </p>
        </div>

        <nav className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              data-active={pathname === href ? "true" : "false"}
              className="outreach-nav-link"
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-0.5 border-t border-border pt-4">
          <Link
            href="/"
            className="outreach-nav-link"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            View website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="outreach-nav-link w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 border-l border-border">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 md:hidden">
          <Logo href="/" linked className="h-6" />
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-medium text-muted"
          >
            Sign out
          </button>
        </div>

        <nav className="flex gap-1 border-b border-border px-5 md:hidden">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              data-active={pathname === href ? "true" : "false"}
              className="outreach-mobile-tab"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-6 md:px-10 md:py-8">{children}</div>
      </main>
    </div>
  );
}

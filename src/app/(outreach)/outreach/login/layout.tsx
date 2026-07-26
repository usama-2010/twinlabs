import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in · Outreach",
  robots: { index: false, follow: false },
};

export default function OutreachLoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="outreach-shell flex min-h-screen items-center justify-center px-5 py-10">
      {children}
    </div>
  );
}

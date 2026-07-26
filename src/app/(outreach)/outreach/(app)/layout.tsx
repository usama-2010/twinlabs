import type { Metadata } from "next";
import { OutreachShell } from "@/components/outreach/OutreachShell";

export const metadata: Metadata = {
  title: "Outreach",
  robots: { index: false, follow: false },
};

export default function OutreachLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <OutreachShell>{children}</OutreachShell>;
}

import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { privacyPolicy } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Twinlabs Ltd collects, uses, and protects personal data when you visit twinlabs.co.uk, contact us, or work with us.",
  pathname: "/privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return <LegalPageContent page={privacyPolicy} />;
}

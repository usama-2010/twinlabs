import type { Metadata } from "next";
import { LegalPageContent } from "@/components/sections/LegalPageContent";
import { termsOfUse } from "@/lib/content/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing use of the TwinLabs website. Project work is covered by separate written agreements and proposals.",
  pathname: "/terms",
  noIndex: false,
});

export default function TermsPage() {
  return <LegalPageContent page={termsOfUse} />;
}

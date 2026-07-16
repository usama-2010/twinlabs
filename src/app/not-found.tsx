import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The page you requested could not be found on TwinLabs.",
  pathname: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="surface-band flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="section-eyebrow">404</p>
      <h1 className="section-title mt-4">Page not found</h1>
      <p className="lede mt-4 max-w-md">
        That page does not exist or may have moved. Head back to the homepage or
        browse our work.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary inline-flex">
          Back to home
        </Link>
        <Link href="/work" className="link-arrow normal-case tracking-normal">
          View case studies
        </Link>
      </div>
    </div>
  );
}

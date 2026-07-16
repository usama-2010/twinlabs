import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { industryPages, industryPagesIndex } from "@/lib/content/industry-pages";
import { indexListingJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Industries We Build For",
  description:
    "Custom software for dental clinics, salons, trades, veterinary practices, accountants, and hospitality — UK-focused delivery from TwinLabs.",
  pathname: "/industries",
});

export default function IndustriesIndexPage() {
  return (
    <div className="surface-band pb-16 sm:pb-20 md:pb-24">
      <JsonLd
        data={indexListingJsonLd(
          "Industries",
          "/industries",
          industryPages.map((page) => ({
            name: page.seoTitle,
            path: `/industries/${page.slug}`,
          }))
        )}
      />

      <div className="container-main max-w-3xl pt-24 sm:pt-28 md:pt-36">
        <Reveal>
          <Link href="/" className="link-arrow normal-case tracking-normal">
            ← Home
          </Link>
          <p className="section-eyebrow mt-8">{industryPagesIndex.eyebrow}</p>
          <h1 className="section-title mt-4">{industryPagesIndex.title}</h1>
          <p className="lede mt-5">{industryPagesIndex.lede}</p>
        </Reveal>
      </div>

      <div className="container-main mt-16">
        <div className="work-page-grid">
          {industryPages.map((page, index) => (
            <Reveal key={page.slug} delay={index * 0.03}>
              <article className="work-page-card group">
                <Link href={`/industries/${page.slug}`} className="block">
                  <p className="mono-label">{page.eyebrow}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    {page.h1}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                    {page.lede}
                  </p>
                  <span className="link-arrow mt-5 inline-flex items-center gap-1.5 text-sm">
                    View industry
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

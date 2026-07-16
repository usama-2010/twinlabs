import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/content/case-studies";
import { CaseStudyImage } from "@/components/ui/CaseStudyImage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work | TwinLabs",
  description: "Case studies from real clients — booking systems, field apps, client portals, and e-commerce.",
};

export default function WorkPage() {
  return (
    <div className="surface-band pt-28 pb-20 md:pt-36">
      <div className="container-main max-w-3xl">
        <Reveal>
          <p className="section-eyebrow">All work</p>
          <h1 className="section-title mt-4">
            {caseStudies.length} case studies.
          </h1>
          <p className="lede mt-5">
            Custom software delivered across industries — from booking platforms
            and client portals to field apps and e-commerce.
          </p>
          <Link
            href="/"
            className="link-arrow mt-8 inline-flex items-center gap-1.5 normal-case tracking-normal"
          >
            ← Back to home
          </Link>
        </Reveal>
      </div>

      <div className="container-main mt-16">
        <div className="work-page-grid">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.03}>
              <article className="work-page-card group">
                <Link href={`/work/${study.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-seafoam-100">
                    <CaseStudyImage
                      study={study}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="mono-label">{study.industry}</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight">
                      {study.client}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-teal-800">
                      {study.title}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {study.challenge}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {study.metrics.slice(0, 2).map((m) => (
                        <span key={m.label} className="work-metric-pill">
                          <strong>{m.value}</strong> {m.label}
                        </span>
                      ))}
                    </div>
                    <span className="link-arrow mt-5 inline-flex items-center gap-1.5 text-sm">
                      Read case study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

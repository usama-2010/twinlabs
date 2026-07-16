import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CaseStudyImage } from "@/components/ui/CaseStudyImage";
import { Reveal } from "@/components/ui/Reveal";
import { getCaseStudyBySlug } from "@/lib/content/case-studies";
import { landingPageJsonLd } from "@/lib/seo/json-ld";
import type { LandingPage } from "@/types";

type LandingPageLayoutProps = {
  page: LandingPage;
  sectionLabel: string;
  sectionPath: string;
};

export function LandingPageLayout({
  page,
  sectionLabel,
  sectionPath,
}: LandingPageLayoutProps) {
  const relatedStudies = page.relatedWorkSlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter(Boolean);

  return (
    <article className="surface-band pb-16 sm:pb-20 md:pb-24">
      <JsonLd
        data={landingPageJsonLd({
          page,
          sectionLabel,
          sectionPath,
        })}
      />

      <div className="container-main max-w-3xl pt-24 sm:pt-28 md:pt-36">
        <Reveal>
          <Link
            href={sectionPath}
            className="link-arrow normal-case tracking-normal"
          >
            ← {sectionLabel}
          </Link>
          <p className="section-eyebrow mt-8">{page.eyebrow}</p>
          <h1 className="section-title mt-4">{page.h1}</h1>
          <p className="lede mt-5">{page.lede}</p>
        </Reveal>
      </div>

      {page.image ? (
        <Reveal className="container-main mt-12">
          <div className="relative mx-auto aspect-[16/10] max-w-4xl overflow-hidden rounded-xl border border-border bg-seafoam-100">
            <Image
              src={page.image}
              alt={page.imageAlt ?? page.h1}
              fill
              className="object-cover"
              sizes="896px"
              priority
            />
          </div>
        </Reveal>
      ) : null}

      <Reveal className="container-main mx-auto mt-12 max-w-3xl">
        <ul className="grid gap-3 sm:grid-cols-2">
          {page.bullets.map((bullet) => (
            <li
              key={bullet}
              className="rounded-lg border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-muted"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="container-main mx-auto mt-16 max-w-3xl space-y-12">
        {page.sections.map((section, index) => (
          <Reveal key={section.title} delay={index * 0.05}>
            <section>
              <h2 className="mono-label">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {section.body}
              </p>
            </section>
          </Reveal>
        ))}
      </div>

      {relatedStudies.length > 0 ? (
        <div className="container-main mt-20">
          <Reveal>
            <p className="section-eyebrow">Related work</p>
            <h2 className="section-title mt-4">Case studies</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedStudies.map((study, index) =>
              study ? (
                <Reveal key={study.slug} delay={index * 0.05}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-seafoam-100">
                      <CaseStudyImage
                        study={study}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <p className="mono-label mt-4">{study.industry}</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">
                      {study.client}
                    </h3>
                    <span className="link-arrow mt-3 inline-flex items-center gap-1.5 text-sm">
                      Read case study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ) : null
            )}
          </div>
        </div>
      ) : null}

      {page.relatedLinks.length > 0 ? (
        <Reveal className="container-main mx-auto mt-16 max-w-3xl">
          <p className="mono-label">Related pages</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-teal-800 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      <Reveal className="container-main mx-auto mt-20 max-w-3xl border-t border-border pt-10 text-center">
        <p className="text-lg font-semibold">Get a written scope and fixed quote</p>
        <p className="mt-3 text-muted">
          Tell us what you need built. We reply within 48 hours with an honest
          assessment if we are a fit.
        </p>
        <Link href="/#contact" className="btn-primary group mt-6 inline-flex">
          Get in touch
        </Link>
      </Reveal>
    </article>
  );
}

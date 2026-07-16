import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudyBySlug,
} from "@/lib/content/case-studies";
import { getReviewById } from "@/lib/content/reviews";
import { CaseStudyImage } from "@/components/ui/CaseStudyImage";
import { Reveal } from "@/components/ui/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const legacySlugMap: Record<string, string> = {
  "salon-booking-platform": "london-hair-co-booking",
  "trades-job-management": "morrison-sons-job-management",
  "accountant-client-portal": "sharma-co-client-portal",
  "ecommerce-storefront": "oak-co-ecommerce",
  "dental-clinic-booking": "bridge-dental-patient-hub",
  "veterinary-practice-system": "pawpath-vet-portal",
  "restaurant-operations": "copper-pot-kitchen-ops",
  "bridge-dental-patient-system": "bridge-dental-patient-hub",
  "pawpath-vet-booking": "pawpath-vet-portal",
  "copper-pot-restaurant-ops": "copper-pot-kitchen-ops",
};

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = legacySlugMap[slug] ?? slug;
  const study = getCaseStudyBySlug(resolved);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.client} — ${study.title} | TwinLabs`,
    description: study.challenge,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = legacySlugMap[slug] ?? slug;
  const study = getCaseStudyBySlug(resolved);
  if (!study) notFound();

  const review = getReviewById(study.reviewId);

  return (
    <article className="surface-band">
      <div className="container-main max-w-3xl pt-28 md:pt-36">
        <Reveal>
          <Link href="/work" className="link-arrow normal-case tracking-normal">
            ← All work
          </Link>
          <p className="section-eyebrow mt-8">{study.industry}</p>
          <h1 className="section-title mt-4">{study.client}</h1>
          <p className="lede mt-4">{study.title}</p>
          <p className="mono-label mt-4">Delivered in {study.timeline}</p>
        </Reveal>
      </div>

      <Reveal className="container-main mt-12">
        <div className="relative mx-auto aspect-[16/10] max-w-4xl overflow-hidden rounded-xl border border-border bg-seafoam-100">
          <CaseStudyImage
            study={study}
            sizes="896px"
            priority
          />
        </div>
      </Reveal>

      <dl className="container-main mx-auto mt-12 flex max-w-2xl justify-center gap-10 text-center md:gap-16">
        {study.metrics.map((m) => (
          <div key={m.label}>
            <dt className="stat-value">{m.value}</dt>
            <dd className="mono-label mt-2">{m.label}</dd>
          </div>
        ))}
      </dl>

      <div className="container-main mx-auto max-w-3xl space-y-12 py-20">
        <Reveal>
          <section>
            <h2 className="mono-label">The challenge</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{study.challenge}</p>
          </section>
        </Reveal>

        <Reveal delay={0.05}>
          <section>
            <h2 className="mono-label">What we built</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{study.solution}</p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section>
            <h2 className="mono-label">Results</h2>
            <ul className="mt-4 space-y-2">
              {study.results.map((r) => (
                <li key={r} className="text-base leading-relaxed text-muted">
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.15}>
          <section>
            <h2 className="mono-label">Technology</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{study.tech.join(" · ")}</p>
          </section>
        </Reveal>

        {review ? (
          <Reveal delay={0.2}>
            <div className="quote-card flex gap-4 p-6">
              <div className="initials-badge shrink-0">{review.initials}</div>
              <div>
                <p className="leading-relaxed text-foreground">&ldquo;{review.quote}&rdquo;</p>
                <p className="mono-label mt-4">
                  — {review.author}, {review.role}, {review.company}
                </p>
              </div>
            </div>
          </Reveal>
        ) : null}

        <Reveal className="border-t border-border pt-10 text-center">
          <p className="text-lg font-semibold">Need something similar?</p>
          <Link href="/#contact" className="btn-primary group mt-6 inline-flex">
            Get in touch
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

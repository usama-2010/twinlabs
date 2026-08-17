import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalPageContent as LegalPage } from "@/lib/content/legal";

type Props = {
  page: LegalPage;
};

function renderBlock(block: LegalPage["sections"][number]["blocks"][number], index: number) {
  if (block.type === "paragraph") {
    return (
      <p key={`p-${index}`} className="legal-paragraph">
        {block.text}
      </p>
    );
  }

  return (
    <div key={`ul-${index}`}>
      {block.intro ? <p className="legal-paragraph">{block.intro}</p> : null}
      <ul className="legal-list">
        {block.items.map((item) => (
          <li key={item.slice(0, 48)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function LegalPageContent({ page }: Props) {
  return (
    <div className="surface-band pb-16 sm:pb-20 md:pb-24">
      <div className="container-main max-w-3xl pt-24 sm:pt-28 md:pt-36">
        <Reveal>
          <Link href="/" className="link-arrow normal-case tracking-normal">
            ← Home
          </Link>
          <p className="section-eyebrow mt-8">{page.eyebrow}</p>
          <h1 className="section-title mt-4">{page.title}</h1>
          <p className="lede mt-5">{page.lede}</p>
          <p className="mt-4 text-sm text-muted">
            Last updated: {page.lastUpdated}
          </p>
        </Reveal>
      </div>

      <Reveal className="container-main mt-12 max-w-3xl md:mt-16">
        <article className="legal-document card-surface p-6 sm:p-8 md:p-10">
          <div className="legal-document-body">
            {page.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section scroll-mt-28"
              >
                <h2 className="legal-section-title">{section.title}</h2>
                {section.blocks.map((block, index) => renderBlock(block, index))}
              </section>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal className="container-main mt-10 max-w-3xl">
        <div className="border-t border-border pt-8">
          <p className="mono-label">See also</p>
          <Link
            href={page.related.href}
            className="mt-3 inline-flex items-center gap-2 text-base font-medium transition-colors hover:text-teal-700"
          >
            {page.related.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {page.related.description}
          </p>
        </div>
      </Reveal>

      <Reveal className="container-main mx-auto mt-16 max-w-3xl border-t border-border pt-10 text-center">
        <p className="text-lg font-semibold">Questions about this page?</p>
        <p className="mt-3 text-muted">
          Email us and we will point you in the right direction.
        </p>
        <a href="mailto:info@twinlabs.co.uk" className="btn-primary group mt-6 inline-flex">
          info@twinlabs.co.uk
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </div>
  );
}

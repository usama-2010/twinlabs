"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  pricingSection,
  pricingCategories,
  pricingAssurances,
} from "@/lib/content/pricing";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function PricingSection() {
  return (
    <section id="pricing" className="surface-band py-16 sm:py-20 md:py-28">
      <div className="container-main">
        <SectionHeader
          eyebrow={pricingSection.eyebrow}
          title={pricingSection.title}
          titleEm={pricingSection.titleEm}
          subtitle={pricingSection.subtitle}
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pricingCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.06}>
              <article className="pricing-category flex h-full flex-col">
                {category.common ? (
                  <p className="pricing-category-badge">Most common</p>
                ) : (
                  <span className="pricing-category-badge-placeholder" aria-hidden="true" />
                )}

                <h3 className="text-base font-semibold tracking-tight sm:text-lg">{category.title}</h3>

                <p className="pricing-category-range mt-4">
                  <span className="pricing-category-price-line">
                    <span className="pricing-category-price">{category.range}</span>
                    <span className="pricing-category-vat">ex VAT</span>
                  </span>
                </p>

                <p className="mono-label mt-3">{category.duration}</p>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {category.description}
                </p>

                <Link
                  href={category.reference.href}
                  className="link-arrow group mt-5 inline-flex items-center gap-1.5 break-words sm:mt-6"
                >
                  {category.reference.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-10 md:mt-12">
          <div className="discovery-card">
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {pricingAssurances.map((item) => (
                <div key={item.title}>
                  <h4 className="text-base font-semibold tracking-tight">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">{pricingSection.footnote}</p>
              <Link href={pricingSection.cta.href} className="btn-primary group w-full shrink-0 sm:w-auto">
                {pricingSection.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

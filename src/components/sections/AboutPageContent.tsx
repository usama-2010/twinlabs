import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { aboutPage, founders, teamValues } from "@/lib/content/team";

export function AboutPageContent() {
  return (
    <div className="surface-band pb-16 sm:pb-20 md:pb-24">
      <div className="container-main max-w-3xl pt-24 sm:pt-28 md:pt-36">
        <Reveal>
          <Link href="/" className="link-arrow normal-case tracking-normal">
            ← Home
          </Link>
          <p className="section-eyebrow mt-8">{aboutPage.eyebrow}</p>
          <h1 className="section-title mt-4">
            {aboutPage.title}
            <br />
            <span className="font-display italic">{aboutPage.titleEm}</span>
          </h1>
          <p className="lede mt-5">{aboutPage.lede}</p>
        </Reveal>
      </div>

      <div className="container-main mt-16 md:mt-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          {founders.map((founder, index) => (
            <Reveal key={founder.name} delay={index * 0.06}>
              <article className="card-surface overflow-hidden">
                <div className="relative aspect-[3/4] bg-seafoam-100">
                  <Image
                    src={founder.image}
                    alt={founder.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 480px"
                    priority={index === 0}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="mono-label">{founder.role}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    {founder.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {founder.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="container-main mx-auto mt-20 max-w-3xl">
        <h2 className="mono-label">{aboutPage.story.title}</h2>
        <div className="mt-6 space-y-4">
          {aboutPage.story.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <div className="container-main mt-20">
        <Reveal>
          <p className="section-eyebrow text-center">What we stand by</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {teamValues.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.04} className="h-full">
              <div className="card-surface flex h-full min-h-[7.5rem] flex-col p-5 sm:min-h-[8rem] sm:p-6">
                <h3 className="text-base font-semibold tracking-tight sm:text-[1.0625rem]">
                  {value.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="container-main mx-auto mt-20 max-w-3xl border-t border-border pt-10 text-center">
        <p className="text-lg font-semibold">Tell us what you need built</p>
        <p className="mt-3 text-muted">
          We reply within 48 hours with an honest scope and fixed quote if we are a fit.
        </p>
        <Link href={aboutPage.cta.href} className="btn-primary group mt-6 inline-flex">
          {aboutPage.cta.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </div>
  );
}

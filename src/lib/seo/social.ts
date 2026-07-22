import { hero, siteConfig } from "@/lib/content/site";

/** Copy used for Open Graph / Twitter / Meta link previews (homepage). */
export const socialShare = {
  title: `${hero.headline} ${hero.headlineEmCycle[2]?.replace(/\.$/, "") ?? hero.headlineEm}.`,
  shortTitle: "Build software. Ship with clarity.",
  description: `${hero.eyebrow} Scoped upfront. Fixed quotes. You own the code.`,
  imageAlt: `${siteConfig.name} — ${hero.headline} Ship with clarity.`,
  domain: "twinlabs.co.uk",
  stackLines: ["Scoped upfront.", "Fixed quotes.", "You own the code."],
} as const;

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

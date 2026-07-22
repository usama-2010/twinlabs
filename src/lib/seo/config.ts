import { siteConfig } from "@/lib/content/site";
import { socialShare } from "@/lib/seo/social";

export const seoConfig = {
  siteName: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  locale: "en_GB",
  defaultTitle:
    "Custom Software Development UK | Booking Systems, Portals & Field Apps",
  titleTemplate: "%s | TwinLabs",
  defaultDescription: siteConfig.description,
  /** Homepage / default link preview (Open Graph, Meta, Twitter, LinkedIn). */
  socialTitle: socialShare.shortTitle,
  socialDescription: socialShare.description,
  socialImageAlt: socialShare.imageAlt,
  defaultOgImage: "/opengraph-image",
  defaultOgImageAlt: socialShare.imageAlt,
  twitterHandle: undefined as string | undefined,
  keywords: [
    "custom software development UK",
    "custom software agency",
    "booking system development",
    "client portal development",
    "field service app development",
    "bespoke software UK",
    "SME software development",
    "Next.js development agency",
    "software development London",
    "TwinLabs",
  ],
  areaServed: "United Kingdom",
  serviceTypes: [
    "Custom software development",
    "Booking and appointment systems",
    "Client and patient portals",
    "Field service applications",
    "Workflow automation",
    "E-commerce development",
  ],
} as const;

export function absoluteUrl(path = ""): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.url}${normalized === "/" ? "" : normalized}`.replace(
    /([^:]\/)\/+/g,
    "$1"
  );
}

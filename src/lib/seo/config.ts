import { siteConfig } from "@/lib/content/site";

export const seoConfig = {
  siteName: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  locale: "en_GB",
  defaultTitle:
    "Custom Software Development UK | Booking Systems, Portals & Field Apps",
  titleTemplate: "%s | TwinLabs",
  defaultDescription: siteConfig.description,
  defaultOgImage: "/images/hero-london.jpg",
  defaultOgImageAlt:
    "TwinLabs — custom software studio for UK businesses, booking systems and client portals",
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

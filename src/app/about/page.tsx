import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { aboutIndexJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About TwinLabs — UK Custom Software Studio",
  description:
    "Meet Usama Ahmed and Muhammad Amer — the two founders behind TwinLabs. UK-based custom software for booking systems, portals, and field apps.",
  pathname: "/about",
  ogImage: "/images/team/usama-ahmed.jpg",
  ogImageAlt: "Usama Ahmed and Muhammad Amer, co-founders of TwinLabs",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutIndexJsonLd()} />
      <AboutPageContent />
    </>
  );
}

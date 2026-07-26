import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { GuaranteeStrip } from "@/components/sections/GuaranteeStrip";
import { seoConfig } from "@/lib/seo/config";
import { homePageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { TrustTicker } from "@/components/sections/TrustTicker";
import { Services } from "@/components/sections/Services";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { PricingSection } from "@/components/sections/PricingSection";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { DiscoveryBand } from "@/components/sections/DiscoveryBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechStack } from "@/components/sections/TechStack";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = createPageMetadata({
  title: seoConfig.defaultTitle,
  titleAbsolute: true,
  description: seoConfig.defaultDescription,
  ogTitle: seoConfig.socialTitle,
  ogDescription: seoConfig.socialDescription,
  pathname: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homePageJsonLd()} />
      <Hero />
      <GuaranteeStrip />
      <TrustTicker />
      <Services />
      <StatsStrip />
      <PricingSection />
      <CaseStudies />
      <DiscoveryBand />
      <Testimonials />
      <TechStack />
      <FAQ />
      <CtaBand />
      <Contact />
    </>
  );
}

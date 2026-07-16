import { Hero } from "@/components/sections/Hero";
import { TrustTicker } from "@/components/sections/TrustTicker";
import { Services } from "@/components/sections/Services";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { DiscoveryBand } from "@/components/sections/DiscoveryBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { TechStack } from "@/components/sections/TechStack";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <Services />
      <StatsStrip />
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

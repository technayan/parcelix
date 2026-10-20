import { BusinessSection } from "@/components/sections/business-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import TrackingSection from "@/components/sections/tracking-section";
import { VisibilitySection } from "@/components/sections/visibility-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrackingSection />
      <ServicesSection />
      <ProcessSection />
      <VisibilitySection />
      <StatsSection />
      <CoverageSection />
      <BusinessSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}

"use client";

import { useSectionMotion } from "@/hooks/use-section-motion";
import { FeaturesSection } from "./sections/features-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { FragmentationSection } from "./sections/fragmentation-section";
import { HeroSection } from "./sections/hero-section";

const SECTION_KEYS = ["hero", "fragmentation"];

export function HomePage() {
  const { act, transition, reducedMotion, refFor } = useSectionMotion(SECTION_KEYS);

  return (
    <div style={{ position: "relative", background: "#0A1A2F", width: "100%" }}>
      <HeroSection sectionRef={refFor("hero")} act={act("hero")} transition={transition} reducedMotion={reducedMotion} />
      <FragmentationSection
        sectionRef={refFor("fragmentation")}
        act={act("fragmentation")}
        transition={transition}
        reducedMotion={reducedMotion}
      />
      <FeaturesSection />
      <FinalCtaSection />
    </div>
  );
}

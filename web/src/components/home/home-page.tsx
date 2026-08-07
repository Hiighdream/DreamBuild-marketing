"use client";

import { useSectionMotion } from "@/hooks/use-section-motion";
import { BaysSection } from "./sections/bays-section";
import { CommunitySection } from "./sections/community-section";
import { EventsSection } from "./sections/events-section";
import { FinalCtaSection } from "./sections/final-cta-section";
import { FragmentationSection } from "./sections/fragmentation-section";
import { HeroSection } from "./sections/hero-section";
import { LeroySection } from "./sections/leroy-section";
import { MaintenanceSection } from "./sections/maintenance-section";
import { PartsSection } from "./sections/parts-section";
import { PlatformSection } from "./sections/platform-section";
import { RevealSection } from "./sections/reveal-section";
import { ThreeDSection } from "./sections/three-d-section";

const SECTION_KEYS = [
  "hero",
  "fragmentation",
  "reveal",
  "bays",
  "maintenance",
  "leroy",
  "parts",
  "threeD",
  "events",
  "community",
  "platform",
];

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
      <RevealSection sectionRef={refFor("reveal")} act={act("reveal")} transition={transition} reducedMotion={reducedMotion} />
      <BaysSection sectionRef={refFor("bays")} act={act("bays")} transition={transition} reducedMotion={reducedMotion} />
      <MaintenanceSection
        sectionRef={refFor("maintenance")}
        act={act("maintenance")}
        transition={transition}
        reducedMotion={reducedMotion}
      />
      <LeroySection sectionRef={refFor("leroy")} act={act("leroy")} transition={transition} reducedMotion={reducedMotion} />
      <PartsSection sectionRef={refFor("parts")} act={act("parts")} transition={transition} reducedMotion={reducedMotion} />
      <ThreeDSection sectionRef={refFor("threeD")} act={act("threeD")} transition={transition} reducedMotion={reducedMotion} />
      <EventsSection sectionRef={refFor("events")} act={act("events")} transition={transition} reducedMotion={reducedMotion} />
      <CommunitySection
        sectionRef={refFor("community")}
        act={act("community")}
        transition={transition}
        reducedMotion={reducedMotion}
      />
      <PlatformSection
        sectionRef={refFor("platform")}
        act={act("platform")}
        transition={transition}
        reducedMotion={reducedMotion}
      />
      <FinalCtaSection />
    </div>
  );
}

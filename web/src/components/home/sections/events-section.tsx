import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type EventsSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

export function EventsSection({ sectionRef, act, transition, reducedMotion }: EventsSectionProps) {
  const cloudsBg = makeClouds("eb", 3, {
    active: act,
    dir: 1,
    topMin: 0,
    topRange: 55,
    minSize: 420,
    sizeRange: 300,
    opacityCurve: () => lerp(0.5, 0.3, ease(act, 0.3, 0.75)),
    blur: 40,
  });

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    left: "6%",
    top: "14%",
    maxWidth: 520,
    opacity: lerp(0, 1, ease(act, 0, 0.3)),
    transition,
  };

  return (
    <PinnedSection
      id="events"
      sectionRef={sectionRef}
      heightVh={210}
      reducedMotion={reducedMotion}
      background={
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 70%, #13263F 0%, #0A1A2F 60%, #060D18 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "46%",
              opacity: 0.5,
              background: "repeating-linear-gradient(100deg, rgba(92,113,136,0.18) 0 2px, transparent 2px 40px)",
            }}
          />
          <div style={{ position: "absolute", right: "2%", bottom: 0, top: "20%", opacity: 0.42 }}>
            <ImageSlot
              src="/images/home/events-suv.webp"
              alt="SUV parked at overlook / meetup scene"
              placeholder="SUV parked at overlook / meetup scene"
              style={{ width: "54vw", height: "66vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>Discover what is happening around your garage.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch" }}>
          Find automotive events, RSVP through DreamBuild, discover local resources, and connect
          with activity relevant to your vehicles, interests, and area.
        </p>
      </div>
    </PinnedSection>
  );
}

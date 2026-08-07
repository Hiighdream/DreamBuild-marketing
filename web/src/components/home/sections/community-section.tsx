import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type CommunitySectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const cardBase: CSSProperties = {
  width: 230,
  background: "rgba(19,38,63,0.92)",
  border: "1px solid rgba(244,246,248,0.12)",
  borderRadius: 6,
  padding: 14,
};

const CARDS = [
  { pos: [10, 25] as const, delay: [0.1, 0.4] as const, eyebrow: "Alejandro Perez - Denver", body: "Anyone else notice a coolant smell after long highway drives?" },
  { pos: [14, 55] as const, delay: [0.2, 0.5] as const, eyebrow: "LOCAL · 8MI RADIUS", body: "Saturday meet moved to the north lot." },
  { pos: [10, 78] as const, delay: [0.3, 0.6] as const, eyebrow: "TRACK DAY · EVENT THREAD", body: "Who's bringing tire warmers Sunday?" },
];

export function CommunitySection({ sectionRef, act, transition, reducedMotion }: CommunitySectionProps) {
  const cardStyle = ([x, y]: readonly [number, number], [a, b]: readonly [number, number]): CSSProperties => ({
    position: "absolute",
    left: x + "%",
    top: y + "%",
    opacity: lerp(0, 1, ease(act, a, b)),
    transform: `translateY(${lerp(30, 0, ease(act, a, b))}px)`,
    transition,
  });

  const cloudsBg = makeClouds("cb", 4, {
    active: act,
    dir: -1,
    topMin: 0,
    topRange: 100,
    minSize: 440,
    sizeRange: 320,
    opacityCurve: () => lerp(0.5, 0.3, ease(act, 0.3, 0.75)),
    blur: 40,
  });

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    right: "6%",
    top: "18%",
    maxWidth: 540,
    textAlign: "right",
    opacity: lerp(0, 1, ease(act, 0, 0.3)),
    transition,
  };

  return (
    <PinnedSection
      id="community"
      sectionRef={sectionRef}
      heightVh={210}
      reducedMotion={reducedMotion}
      background={
        <>
          <div style={{ position: "absolute", inset: 0, background: "#0A1A2F" }} />
          <div style={{ position: "absolute", right: 0, bottom: 0, top: "16%", opacity: 0.36 }}>
            <ImageSlot
              src="/images/home/community-sedan.webp"
              alt="Sport sedan at dusk, community meetup context"
              placeholder="Sport sedan at dusk, community meetup context"
              style={{ width: "52vw", height: "68vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      {CARDS.map((card) => (
        <div key={card.eyebrow} style={cardStyle(card.pos, card.delay)}>
          <div style={cardBase}>
            <div style={{ fontSize: 11, color: "#3DC9F7", marginBottom: 6 }}>{card.eyebrow}</div>
            <div style={{ fontSize: 13, color: "#C7D1DB" }}>{card.body}</div>
          </div>
        </div>
      ))}
      <div style={textWrapStyle}>
        <h2 style={h2Style(18)}>A community connected by more than a feed.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch" }}>
          Join conversations around the vehicles you own, the topics you care about, and the
          automotive activity happening near you.
        </p>
      </div>
    </PinnedSection>
  );
}

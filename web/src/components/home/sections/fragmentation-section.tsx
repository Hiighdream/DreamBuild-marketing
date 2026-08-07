import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type FragmentationSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const CARD_STYLE_BASE: CSSProperties = {
  padding: "14px 18px",
  background: "rgba(19,38,63,0.9)",
  border: "1px solid rgba(244,246,248,0.15)",
  borderRadius: 4,
  fontSize: 13,
  color: "#C7D1DB",
  width: 200,
};

const CARDS = [
  { from: [15, 20], to: [44, 42], delay: [0, 0.3], label: "🧾 Service receipt", sub: "glove box, 2024" },
  { from: [78, 18], to: [52, 40], delay: [0.05, 0.35], label: "🔔 Maintenance app", sub: "separate login" },
  { from: [10, 65], to: [46, 58], delay: [0.1, 0.4], label: "🛒 Parts research", sub: "12 browser tabs" },
  { from: [85, 68], to: [54, 58], delay: [0.15, 0.45], label: "💬 Community thread", sub: "unrelated forum" },
  { from: [50, 15], to: [50, 44], delay: [0.2, 0.5], label: "📍 Local event", sub: "disconnected feed" },
] as const;

export function FragmentationSection({ sectionRef, act, transition, reducedMotion }: FragmentationSectionProps) {
  const converge = ease(act, 0.55, 1);

  const cardStyle = (
    [fromX, fromY]: readonly [number, number],
    [toX, toY]: readonly [number, number],
    [delayA, delayB]: readonly [number, number]
  ): CSSProperties => {
    const local = ease(act, delayA, delayB);
    return {
      position: "absolute",
      left: lerp(fromX, toX, converge) + "%",
      top: lerp(fromY, toY, converge) + "%",
      opacity: lerp(0, 1, ease(act, 0, 0.25)) * lerp(1, 0, ease(act, 0.85, 1)),
      transform: `translate(-50%,-50%) scale(${lerp(0.85, 1, local)})`,
      transition,
    };
  };

  const cloudsBg = makeClouds("fb", 5, {
    active: 1,
    dir: 1,
    topMin: 0,
    topRange: 100,
    minSize: 500,
    sizeRange: 420,
    opacityCurve: () => 0.65,
    blur: 46,
  });
  const cloudsFg = makeClouds("ff", 4, {
    active: act,
    dir: -1,
    driftBase: 60,
    topMin: 55,
    topRange: 40,
    minSize: 320,
    sizeRange: 260,
    color: "radial-gradient(ellipse at center, rgba(200,215,230,0.6), rgba(160,180,200,0) 70%)",
    opacityCurve: () => 0.5,
    blur: 24,
  });

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    left: "8%",
    bottom: "10%",
    maxWidth: 600,
    opacity: lerp(0, 1, ease(act, 0, 0.3)) * lerp(1, 0, ease(act, 0.6, 0.85)),
    transition,
  };

  const transitionTextStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "80%",
    opacity: lerp(0, 1, ease(act, 0.65, 0.9)) * lerp(1, 0, ease(act, 0.95, 1)),
    transition,
  };

  return (
    <PinnedSection
      id="fragmentation"
      sectionRef={sectionRef}
      heightVh={230}
      reducedMotion={reducedMotion}
      background={
        <>
          <div style={{ position: "absolute", inset: 0, background: "#0A1A2F" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "6%",
              display: "flex",
              justifyContent: "center",
              opacity: 0.49,
              WebkitMaskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, #000 40%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 55% 60% at 50% 50%, #000 40%, transparent 100%)",
            }}
          >
            <ImageSlot
              src="/images/home/frag-coupe.webp"
              alt="Same performance coupe, partially veiled by atmosphere"
              placeholder="Same performance coupe, partially veiled by atmosphere"
              style={{ width: "70vw", height: "48vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      {CARDS.map((card) => (
        <div key={card.label} style={cardStyle(card.from, card.to, card.delay)}>
          <div style={CARD_STYLE_BASE}>
            {card.label}
            <br />
            <span style={{ color: "#5C7188", fontSize: 11 }}>{card.sub}</span>
          </div>
        </div>
      ))}
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>Your vehicle information is scattered.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "52ch" }}>
          Service records sit in glove boxes. Maintenance reminders live in separate apps. Parts
          research spreads across browser tabs. Events, shops, and automotive communities are
          disconnected from the vehicles you actually own.
        </p>
      </div>
      <div style={transitionTextStyle}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(22px, 3vw, 36px)",
            color: "#3DC9F7",
            textAlign: "center",
          }}
        >
          DreamBuild brings those pieces together.
        </p>
      </div>
      {cloudsFg.map((c) => (
        <div key={c.id} style={c.style} />
      ))}
    </PinnedSection>
  );
}

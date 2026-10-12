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
  background: "rgba(19,38,63,0.95)",
  border: "1px solid rgba(244,246,248,0.15)",
  borderRadius: 4,
  fontSize: 15,
  color: "#C7D1DB",
  width: "clamp(150px, 15vw, 220px)",
};

// Cards start in one row near the top, then converge on the "DreamBuild brings those pieces together." line.
const ROW_TOP = 17;
const MERGE_POINT = { x: 50, y: 40 };

const CARDS = [
  { x: 12, label: "Service receipt", sub: "glove box, 2024" },
  { x: 31, label: "Maintenance app", sub: "separate login" },
  { x: 50, label: "Parts research", sub: "12 browser tabs" },
  { x: 69, label: "Community thread", sub: "unrelated forum" },
  { x: 88, label: "Local event", sub: "disconnected feed" },
] as const;

export function FragmentationSection({ sectionRef, act: scrollAct, transition, reducedMotion }: FragmentationSectionProps) {
  // Reduced motion reports act=1 on entry, past every fade-out; 0.3 is the frame where the card row and copy are both fully shown.
  const act = reducedMotion ? 0.3 : scrollAct;
  const converge = ease(act, 0.45, 0.8);

  const cardStyle = (x: number, index: number): CSSProperties => {
    const enter = ease(act, index * 0.03, index * 0.03 + 0.15);
    return {
      position: "absolute",
      left: lerp(x, MERGE_POINT.x, converge) + "%",
      top: lerp(ROW_TOP, MERGE_POINT.y, converge) + "%",
      opacity: enter * (1 - ease(act, 0.68, 0.82)),
      transform: `translate(-50%,-50%) translateY(${lerp(20, 0, enter)}px) scale(${lerp(1, 0.55, converge)})`,
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
    left: "50%",
    top: "26%",
    transform: "translateX(-50%)",
    width: "min(780px, 88vw)",
    textAlign: "center",
    opacity: ease(act, 0, 0.2) * (1 - ease(act, 0.38, 0.52)),
    transition,
  };

  const transitionTextStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: `${MERGE_POINT.y}%`,
    transform: "translate(-50%,-50%)",
    width: "80%",
    opacity: ease(act, 0.7, 0.88) * (1 - ease(act, 0.95, 1)),
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
          {cloudsFg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      {CARDS.map((card, i) => (
        <div key={card.label} style={cardStyle(card.x, i)}>
          <div style={CARD_STYLE_BASE}>
            {card.label}
            <br />
            <span style={{ color: "#9BA9B8", fontSize: 13 }}>{card.sub}</span>
          </div>
        </div>
      ))}
      <div style={textWrapStyle}>
        <h2 style={{ ...h2Style(22), margin: "0 auto 18px" }}>Your vehicle information is scattered.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "60ch", margin: "0 auto" }}>
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
    </PinnedSection>
  );
}

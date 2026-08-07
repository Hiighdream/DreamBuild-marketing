import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type BaysSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const BAY_CARDS = [
  { pos: [58, 22] as const, delay: [0.1, 0.4] as const, bay: "BAY 01", name: "Dodge Ram 1500", meta: "62,140 mi · 6 records" },
  { pos: [70, 45] as const, delay: [0.25, 0.55] as const, bay: "BAY 02", name: "VW Jetta", meta: "28,410 mi · 11 records" },
  { pos: [56, 68] as const, delay: [0.4, 0.7] as const, bay: "BAY 03", name: "Toyota 4-Runner", meta: "41,900 mi · 8 records" },
];

export function BaysSection({ sectionRef, act, transition, reducedMotion }: BaysSectionProps) {
  const cardStyle = ([x, y]: readonly [number, number], [a, b]: readonly [number, number]): CSSProperties => ({
    position: "absolute",
    left: x + "%",
    top: y + "%",
    opacity: lerp(0, 1, ease(act, a, b)),
    transform: `translateY(${lerp(40, 0, ease(act, a, b))}px)`,
    transition,
  });

  const cloudsBg = makeClouds("bb", 4, {
    active: act,
    dir: 1,
    topMin: 0,
    topRange: 100,
    minSize: 480,
    sizeRange: 360,
    opacityCurve: () => lerp(0.55, 0.32, ease(act, 0.4, 0.9)),
    blur: 44,
  });
  const cloudsFg = makeClouds("bf", 3, {
    active: act,
    dir: -1,
    topMin: 60,
    topRange: 35,
    minSize: 300,
    sizeRange: 220,
    opacityCurve: () => 0.35,
    blur: 20,
  });

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    left: "6%",
    top: "20%",
    maxWidth: 520,
    opacity: lerp(0, 1, ease(act, 0, 0.3)),
    transform: `translateY(${lerp(30, 0, ease(act, 0, 0.3))}px)`,
    transition,
  };

  return (
    <PinnedSection
      id="bays"
      sectionRef={sectionRef}
      heightVh={230}
      reducedMotion={reducedMotion}
      background={
        <>
          <div style={{ position: "absolute", inset: 0, background: "#0A1A2F" }} />
          <div style={{ position: "absolute", left: "4%", bottom: 0, top: "14%", opacity: 0.56 }}>
            <ImageSlot
              src="/images/home/bays-truck.webp"
              alt="Pickup truck, 3/4 rear, worksite or trailhead"
              placeholder="Pickup truck, 3/4 rear, worksite or trailhead"
              style={{ width: "56vw", height: "64vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      {BAY_CARDS.map((card) => (
        <div key={card.bay} style={cardStyle(card.pos, card.delay)}>
          <div
            style={{
              width: 230,
              background: "rgba(19,38,63,0.92)",
              border: "1px solid rgba(61,201,247,0.3)",
              borderRadius: 6,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 11, color: "#3DC9F7", fontWeight: 700, marginBottom: 6 }}>{card.bay}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{card.name}</div>
            <div style={{ fontSize: 12, color: "#9BA9B8" }}>{card.meta}</div>
          </div>
        </div>
      ))}
      <div style={textWrapStyle}>
        <h2 style={h2Style(14)}>A digital Bay for every vehicle.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch" }}>
          Give each vehicle its own organized space inside DreamBuild. Keep specifications, service
          records, maintenance history, mileage, notes, and important ownership information
          together.
        </p>
      </div>
      {cloudsFg.map((c) => (
        <div key={c.id} style={c.style} />
      ))}
    </PinnedSection>
  );
}

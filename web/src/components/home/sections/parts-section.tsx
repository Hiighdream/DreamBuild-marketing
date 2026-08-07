import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds, seededRand } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle, sectionQualifierStyle } from "../styles";

type PartsSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const PART_LABELS = ["Grille", "Brake pad", "Mirror", "Rotor", "Sensor", "Cabin filter"];

export function PartsSection({ sectionRef, act, transition, reducedMotion }: PartsSectionProps) {
  const collapse = ease(act, 0.35, 0.8);

  const cards = PART_LABELS.map((label, i) => {
    const rnd = seededRand("parts" + i);
    const scatterX = 8 + rnd() * 84;
    const scatterY = 12 + rnd() * 70;
    const isMatch = i === PART_LABELS.length - 1;
    const targetX = isMatch ? 50 : scatterX + (rnd() - 0.5) * 10;
    const targetY = isMatch ? 82 : scatterY + (rnd() - 0.5) * 10;
    const fade = !isMatch ? ease(act, 0.45, 0.85) : 0;
    const style: CSSProperties = {
      position: "absolute",
      left: lerp(scatterX, targetX, collapse) + "%",
      top: lerp(scatterY, targetY, collapse) + "%",
      opacity: lerp(0, 1, ease(act, 0, 0.2)) * (1 - fade),
      transform: "translate(-50%,-50%)",
      transition,
    };
    return { label, style };
  });

  const cloudsBg = makeClouds("pb", 4, {
    active: act,
    dir: -1,
    topMin: 0,
    topRange: 100,
    minSize: 460,
    sizeRange: 340,
    opacityCurve: () => lerp(0.5, 0.3, ease(act, 0.3, 0.8)),
    blur: 40,
  });

  const resultCardStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "86%",
    transform: "translate(-50%,-50%)",
    opacity: lerp(0, 1, ease(act, 0.75, 1)),
    transition,
  };
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
      id="parts"
      sectionRef={sectionRef}
      heightVh={230}
      reducedMotion={reducedMotion}
      background={
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 40% 50%, #13263F 0%, #0A1A2F 60%, #060D18 100%)",
            }}
          />
          <div style={{ position: "absolute", right: 0, bottom: 0, top: "18%", opacity: 0.36 }}>
            <ImageSlot
              src="/images/home/parts-truck.webp"
              alt="Pickup truck front 3/4, gravel lot"
              placeholder="Pickup truck front 3/4, gravel lot"
              style={{ width: "52vw", height: "68vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      {cards.map((card) => (
        <div key={card.label} style={card.style}>
          <div
            style={{
              width: 110,
              height: 78,
              background: "rgba(19,38,63,0.9)",
              border: "1px solid rgba(244,246,248,0.12)",
              borderRadius: 4,
              padding: 8,
              fontSize: 10,
              color: "#9BA9B8",
            }}
          >
            {card.label}
          </div>
        </div>
      ))}
      <div style={resultCardStyle}>
        <div
          style={{
            width: "min(300px,80vw)",
            background: "rgba(19,38,63,0.95)",
            border: "1px solid rgba(61,201,247,0.4)",
            borderRadius: 6,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 11, color: "#3DC9F7", fontWeight: 700, marginBottom: 8 }}>MATCHED TO BAY 01</div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Cabin Air Filter</div>
          <div style={{ fontSize: 12, color: "#9BA9B8" }}>Fits 2022 Sport Sedan</div>
        </div>
      </div>
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>Start with the vehicle, not the catalog.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch", marginBottom: 14 }}>
          DreamBuild connects vehicle information, supplier data, fitment details, and
          vehicle-based navigation to help users narrow their parts search.
        </p>
        <p style={sectionQualifierStyle}>
          Fitment and availability depend on vehicle information, supplier data, and supported
          inventory. Compatibility should be confirmed before purchase or installation.
        </p>
      </div>
    </PinnedSection>
  );
}

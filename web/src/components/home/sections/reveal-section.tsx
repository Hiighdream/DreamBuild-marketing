import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type RevealSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const FEATURE_LABELS = [
  "Garage Bays",
  "Service history",
  "Maintenance guidance",
  "Parts discovery",
  "Events",
  "Local resources",
  "Community",
  "Leroy",
];

export function RevealSection({ sectionRef, act, transition, reducedMotion }: RevealSectionProps) {
  const cloudsBg = makeClouds("rb", 4, {
    active: act,
    dir: -1,
    topMin: 0,
    topRange: 100,
    minSize: 460,
    sizeRange: 360,
    opacityCurve: () => lerp(0.6, 0.32, ease(act, 0.3, 0.8)),
    blur: 42,
  });

  const bayCardStyle: CSSProperties = {
    position: "absolute",
    left: "8%",
    top: "50%",
    transform: `translateY(-50%) translateY(${lerp(40, 0, ease(act, 0, 0.4))}px) scale(${lerp(0.92, 1, ease(act, 0, 0.4))})`,
    opacity: lerp(0, 1, ease(act, 0, 0.4)),
    transition,
  };

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    right: "8%",
    top: "18%",
    maxWidth: 560,
    textAlign: "right",
    opacity: lerp(0, 1, ease(act, 0.1, 0.5)),
    transform: `translateY(${lerp(30, 0, ease(act, 0.1, 0.5))}px)`,
    transition,
  };

  return (
    <PinnedSection
      id="reveal"
      sectionRef={sectionRef}
      heightVh={210}
      reducedMotion={reducedMotion}
      background={
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 60%, #13263F 0%, #0A1A2F 60%, #060D18 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-5%",
              bottom: 0,
              top: "20%",
              opacity: 0.42,
              WebkitMaskImage: "radial-gradient(ellipse 60% 65% at 50% 50%, #000 35%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 60% 65% at 50% 50%, #000 35%, transparent 100%)",
            }}
          >
            <ImageSlot
              src="/images/home/reveal-sedan.webp"
              alt="Sport sedan, side profile silhouette"
              placeholder="Sport sedan, side profile silhouette"
              style={{ width: "60vw", height: "60vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      <div style={bayCardStyle}>
        <div
          style={{
            width: "min(560px,86vw)",
            background: "rgba(10,20,35,0.9)",
            border: "1px solid rgba(61,201,247,0.3)",
            borderRadius: 8,
            padding: 24,
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "#3DC9F7", fontWeight: 700, marginBottom: 10 }}>
            THE BAY
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
            2022 Sport Sedan · Bay 01
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 10 }}>
            {FEATURE_LABELS.map((label) => (
              <div
                key={label}
                style={{
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 4,
                  fontSize: 13,
                  color: "#C7D1DB",
                  borderLeft: "2px solid #3DC9F7",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>One garage. Every part of ownership.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch" }}>
          DreamBuild connects the information and tools used throughout vehicle ownership. Manage
          records, follow maintenance needs, explore relevant parts, discover automotive resources,
          and connect through vehicles and location.
        </p>
      </div>
    </PinnedSection>
  );
}

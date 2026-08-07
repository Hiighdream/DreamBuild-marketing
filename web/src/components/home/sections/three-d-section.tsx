import type { CSSProperties } from "react";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle, sectionQualifierStyle } from "../styles";
import { VehicleStage } from "../vehicle-stage";

type ThreeDSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

export function ThreeDSection({ sectionRef, act, transition, reducedMotion }: ThreeDSectionProps) {
  const cloudsBg = makeClouds("tb", 4, {
    active: act,
    dir: 1,
    topMin: 0,
    topRange: 100,
    minSize: 460,
    sizeRange: 340,
    opacityCurve: () => lerp(0.55, 0.32, ease(act, 0.3, 0.75)),
    blur: 40,
  });

  const hotspotCardStyle: CSSProperties = {
    position: "absolute",
    left: "62%",
    top: "68%",
    opacity: lerp(0, 1, ease(act, 0.55, 0.85)),
    transform: `translateY(${lerp(20, 0, ease(act, 0.55, 0.85))}px)`,
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
      id="three-d"
      sectionRef={sectionRef}
      heightVh={230}
      reducedMotion={reducedMotion}
      background={
        <>
          <div style={{ position: "absolute", inset: 0, background: "#0A1A2F" }} />
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          top: "10%",
          transform: "translateX(-50%)",
          width: "min(900px,86vw)",
          height: "78vh",
        }}
      >
        <VehicleStage modelSrc="/assets/hellcat.glb" />
      </div>
      <div style={hotspotCardStyle}>
        <div
          style={{
            width: 220,
            background: "rgba(19,38,63,0.94)",
            border: "1px solid rgba(61,201,247,0.4)",
            borderRadius: 6,
            padding: 14,
          }}
        >
          <div style={{ fontSize: 11, color: "#3DC9F7", fontWeight: 700, marginBottom: 4 }}>FRONT SUSPENSION</div>
          <div style={{ fontSize: 12, color: "#C7D1DB" }}>3 compatible parts found</div>
        </div>
      </div>
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>Explore supported vehicles by system.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch", marginBottom: 14 }}>
          Move through supported exterior, interior, and chassis views, then select interactive
          hotspots to explore parts associated with specific areas of the vehicle.
        </p>
        <p style={sectionQualifierStyle}>
          Advanced 3D views and hotspots are available for supported vehicle models and will expand
          over time.
        </p>
      </div>
    </PinnedSection>
  );
}

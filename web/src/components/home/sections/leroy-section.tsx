import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type LeroySectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const linkChipStyle: CSSProperties = {
  padding: "9px 13px",
  background: "rgba(19,38,63,0.85)",
  border: "1px solid rgba(61,201,247,0.3)",
  borderRadius: 4,
  fontSize: 12,
  color: "#9BA9B8",
};

export function LeroySection({ sectionRef, act, transition, reducedMotion }: LeroySectionProps) {
  const cloudsBg = makeClouds("lb", 4, {
    active: act,
    dir: 1,
    topMin: 0,
    topRange: 100,
    minSize: 460,
    sizeRange: 340,
    opacityCurve: () => lerp(0.5, 0.3, ease(act, 0.3, 0.8)),
    blur: 40,
  });

  const panelStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%,-50%) scale(${lerp(0.9, 1, ease(act, 0, 0.35))})`,
    opacity: lerp(0, 1, ease(act, 0, 0.35)),
    transition,
  };
  const link1Style: CSSProperties = {
    position: "absolute",
    left: "10%",
    top: "30%",
    opacity: lerp(0, 1, ease(act, 0.3, 0.55)),
    transition,
  };
  const link2Style: CSSProperties = {
    position: "absolute",
    left: "8%",
    top: "62%",
    opacity: lerp(0, 1, ease(act, 0.4, 0.65)),
    transition,
  };
  const textWrapStyle: CSSProperties = {
    position: "absolute",
    right: "6%",
    bottom: "12%",
    maxWidth: 520,
    textAlign: "right",
    opacity: lerp(0, 1, ease(act, 0, 0.3)),
    transition,
  };

  return (
    <PinnedSection
      id="leroy"
      sectionRef={sectionRef}
      heightVh={220}
      reducedMotion={reducedMotion}
      background={
        <>
          <div style={{ position: "absolute", inset: 0, background: "#0A1A2F" }} />
          <div style={{ position: "absolute", left: 0, top: "4%", bottom: "4%", opacity: 0.36 }}>
            <ImageSlot
              src="/images/home/leroy-sedan.webp"
              alt="Sport sedan interior/dash detail, low light"
              placeholder="Sport sedan interior/dash detail, low light"
              style={{ width: "46vw", height: "100%" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      <div style={panelStyle}>
        <div
          style={{
            width: "min(480px,88vw)",
            background: "rgba(19,38,63,0.92)",
            border: "1px solid rgba(61,201,247,0.3)",
            borderRadius: 8,
            padding: 22,
          }}
        >
          <div style={{ fontSize: 11, color: "#3DC9F7", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 14 }}>
            LEROY · BAY 01 CONTEXT
          </div>
          <div
            style={{
              alignSelf: "flex-end",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 4,
              padding: "10px 14px",
              fontSize: 14,
              marginBottom: 12,
              maxWidth: "80%",
              marginLeft: "auto",
            }}
          >
            What maintenance should I plan next?
          </div>
          <div
            style={{
              background: "rgba(61,201,247,0.08)",
              border: "1px solid rgba(61,201,247,0.25)",
              borderRadius: 4,
              padding: 14,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#E8EEF3",
            }}
          >
            Based on 61,760 miles and your last service in March, an oil change and tire rotation
            are approaching.
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: "#5C7188", lineHeight: 1.5 }}>
            Leroy provides informational automotive guidance and does not replace professional
            inspection, diagnosis, or repair.
          </div>
        </div>
      </div>
      <div style={link1Style}>
        <div style={linkChipStyle}>Service history</div>
      </div>
      <div style={link2Style}>
        <div style={linkChipStyle}>Current mileage</div>
      </div>
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>Automotive guidance that knows your garage.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "50ch" }}>
          Leroy helps explain maintenance procedures, dashboard indicators, service intervals,
          recalls, vehicle systems, compatible parts, and common automotive questions.
        </p>
      </div>
    </PinnedSection>
  );
}

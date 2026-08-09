import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type PlatformSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const nodeChipStyle: CSSProperties = {
  padding: "clamp(5px, 1.6cqw, 8px) clamp(8px, 2.6cqw, 14px)",
  background: "rgba(19,38,63,0.9)",
  border: "1px solid rgba(61,201,247,0.3)",
  borderRadius: 4,
  fontSize: "clamp(9px, 2.1cqw, 12px)",
  color: "#C7D1DB",
  whiteSpace: "nowrap",
};

// The box every NODE position and the underlay image share — this is what
// makes the tags stay pinned to the glow line endpoints baked into
// platform-coupe.webp at every viewport size. Sizing/centering must stay
// identical to the image wrapper below it; `containerType` lets the chips'
// clamp() sizes above scale off this box's own width instead of the
// viewport. Do not reposition NODES without the image.
const stageStyle: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "8%",
  transform: "translateX(-50%)",
  width: "min(1600px,90vw)",
  height: "min(700px,39vw)",
  containerType: "inline-size",
};

const NODES = [
  { pos: [28.76, 30.81] as const, delay: [0.35, 0.65] as const, label: "Service record" },
  { pos: [71.24, 30.81] as const, delay: [0.4, 0.7] as const, label: "Maintenance reminder" },
  { pos: [19.77, 58.0] as const, delay: [0.45, 0.75] as const, label: "Parts search" },
  { pos: [28.99, 78.6] as const, delay: [0.5, 0.8] as const, label: "Leroy" },
  { pos: [77.28, 57.82] as const, delay: [0.55, 0.85] as const, label: "Local community" },
  { pos: [70.32, 78.6] as const, delay: [0.6, 0.9] as const, label: "Bay" },
];

export function PlatformSection({ sectionRef, act, transition, reducedMotion }: PlatformSectionProps) {
  const nodeStyle = ([x, y]: readonly [number, number], [a, b]: readonly [number, number]): CSSProperties => ({
    position: "absolute",
    left: x + "%",
    top: y + "%",
    opacity: lerp(0, 1, ease(act, a, b)),
    transform: "translate(-50%,-50%)",
    transition,
  });

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    bottom: "8%",
    transform: "translateX(-50%)",
    maxWidth: 640,
    textAlign: "center",
    opacity: lerp(0, 1, ease(act, 0.6, 0.9)),
    transition,
  };

  return (
    <PinnedSection
      id="platform"
      sectionRef={sectionRef}
      heightVh={220}
      reducedMotion={reducedMotion}
      background={
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 40%, #13263F 0%, #0A1A2F 55%, #060D18 100%)",
          }}
        />
      }
    >
      <div style={stageStyle}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.56 }}>
          <ImageSlot
            src="/images/home/platform-coupe.webp"
            alt="Hero coupe returning, full clarity, open road/clearing sky, glowing connection lines converging on a central hub"
            placeholder="Hero coupe returning, full clarity, open road/clearing sky"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {NODES.map((node) => (
          <div key={node.label} style={nodeStyle(node.pos, node.delay)}>
            <div style={nodeChipStyle}>{node.label}</div>
          </div>
        ))}
      </div>
      <div style={textWrapStyle}>
        <h2 style={{ ...h2Style(16), textAlign: "center" }}>More useful because it works together.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "54ch", margin: "0 auto" }}>
          A service record can inform a maintenance reminder. A vehicle profile can narrow a parts
          search. A Bay can give Leroy useful context. An event can connect an owner to a local
          community.
        </p>
      </div>
    </PinnedSection>
  );
}

import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { PinnedSection } from "../pinned-section";
import { h2Style, sectionBodyStyle } from "../styles";

type MaintenanceSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

const rowBase: CSSProperties = { padding: "10px 14px", borderRadius: 4, fontSize: 13 };

export function MaintenanceSection({ sectionRef, act, transition, reducedMotion }: MaintenanceSectionProps) {
  const rowStyle = (a1: number, a2: number, dir: 1 | -1): CSSProperties => ({
    opacity: lerp(0, 1, ease(act, a1, a2)),
    transform: `translateY(${lerp(dir * 24, 0, ease(act, a1, a2))}px)`,
    transition,
  });

  const cloudsBg = makeClouds("mb", 4, {
    active: act,
    dir: -1,
    topMin: 0,
    topRange: 100,
    minSize: 460,
    sizeRange: 340,
    opacityCurve: () => lerp(0.5, 0.3, ease(act, 0.3, 0.8)),
    blur: 40,
  });

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    right: "6%",
    top: "16%",
    maxWidth: 520,
    textAlign: "right",
    opacity: lerp(0, 1, ease(act, 0, 0.3)),
    transition,
  };

  return (
    <PinnedSection
      id="maintenance"
      sectionRef={sectionRef}
      heightVh={220}
      reducedMotion={reducedMotion}
      background={
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 60% 40%, #13263F 0%, #0A1A2F 60%, #060D18 100%)",
            }}
          />
          <div style={{ position: "absolute", right: 0, bottom: 0, top: "10%", opacity: 0.39 }}>
            <ImageSlot
              src="/images/home/maint-suv.webp"
              alt="SUV wheel + brake assembly close-up, workshop light"
              placeholder="SUV wheel + brake assembly close-up, workshop light"
              style={{ width: "54vw", height: "70vh" }}
            />
          </div>
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      <div style={{ position: "absolute", left: "8%", top: "50%", transform: "translateY(-50%)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "min(420px,88vw)" }}>
          <div style={rowStyle(0, 0.25, -1)}>
            <div style={{ ...rowBase, background: "rgba(19,38,63,0.7)", color: "#5C7188", borderLeft: "2px solid #5C7188" }}>
              Coolant service recorded — March 2026
            </div>
          </div>
          <div style={rowStyle(0.1, 0.35, -1)}>
            <div
              style={{
                ...rowBase,
                padding: "12px 14px",
                background: "rgba(61,201,247,0.1)",
                color: "#3DC9F7",
                borderLeft: "2px solid #3DC9F7",
                fontWeight: 600,
              }}
            >
              ● Today — 61,760 mi
            </div>
          </div>
          <div style={rowStyle(0.25, 0.5, 1)}>
            <div style={{ ...rowBase, background: "rgba(19,38,63,0.85)", color: "#E8A33D", borderLeft: "2px solid #E8A33D" }}>
              Oil change due in 340 miles
            </div>
          </div>
          <div style={rowStyle(0.35, 0.6, 1)}>
            <div
              style={{
                ...rowBase,
                background: "rgba(19,38,63,0.85)",
                color: "#C7D1DB",
                borderLeft: "2px solid rgba(244,246,248,0.25)",
              }}
            >
              Tire rotation approaching
            </div>
          </div>
          <div style={rowStyle(0.45, 0.7, 1)}>
            <div
              style={{
                ...rowBase,
                background: "rgba(19,38,63,0.85)",
                color: "#C7D1DB",
                borderLeft: "2px solid rgba(244,246,248,0.25)",
              }}
            >
              Brake inspection recommended
            </div>
          </div>
          <div style={rowStyle(0.55, 0.8, 1)}>
            <div
              style={{
                ...rowBase,
                background: "rgba(19,38,63,0.85)",
                color: "#C7D1DB",
                borderLeft: "2px solid rgba(244,246,248,0.25)",
              }}
            >
              Registration renewal due next month
            </div>
          </div>
        </div>
      </div>
      <div style={textWrapStyle}>
        <h2 style={h2Style(16)}>Keep service history from becoming guesswork.</h2>
        <p style={{ ...sectionBodyStyle, maxWidth: "48ch" }}>
          Record completed services, preserve maintenance history, and follow upcoming needs based
          on time, mileage, and available vehicle information.
        </p>
      </div>
    </PinnedSection>
  );
}

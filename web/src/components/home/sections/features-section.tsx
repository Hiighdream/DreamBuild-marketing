import type { CSSProperties, ReactNode } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { VehicleStage } from "../vehicle-stage";
import { eyebrowStyle, h2Style, sectionBodyStyle, sectionQualifierStyle } from "../styles";

const panelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  background: "#0F2035",
  border: "1px solid rgba(244,246,248,0.1)",
  borderRadius: 8,
  overflow: "hidden",
  minWidth: 0,
};

const visualStyle: CSSProperties = {
  position: "relative",
  height: 280,
  background: "#060D18",
  overflow: "hidden",
};

const visualFadeStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(15,32,53,0) 55%, #0F2035 100%)",
  pointerEvents: "none",
};

const uiCardStyle: CSSProperties = {
  background: "rgba(19,38,63,0.96)",
  border: "1px solid rgba(61,201,247,0.35)",
  borderRadius: 6,
  padding: "12px 14px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
};

const uiLabelStyle: CSSProperties = { fontSize: 12, color: "#3DC9F7", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 };
const uiMetaStyle: CSSProperties = { fontSize: 13, color: "#9BA9B8" };

const BAYS = [
  { bay: "BAY 01", name: "Dodge Ram 1500", meta: "62,140 mi · 6 records" },
  { bay: "BAY 02", name: "VW Jetta", meta: "28,410 mi · 11 records" },
];

const MAINTENANCE_ROWS = [
  { text: "● Today — 61,760 mi", color: "#3DC9F7", accent: "#3DC9F7", bold: true },
  { text: "Oil change due in 340 miles", color: "#E8A33D", accent: "#E8A33D" },
  { text: "Tire rotation approaching", color: "#C7D1DB", accent: "rgba(244,246,248,0.25)" },
  { text: "Brake inspection recommended", color: "#C7D1DB", accent: "rgba(244,246,248,0.25)" },
];

type FeaturePanelProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  qualifier?: string;
  visual: ReactNode;
};

function FeaturePanel({ id, eyebrow, title, body, qualifier, visual }: FeaturePanelProps) {
  return (
    <article id={id} style={panelStyle}>
      <div style={visualStyle}>
        {visual}
        <div style={visualFadeStyle} />
      </div>
      <div style={{ padding: "8px 28px 30px" }}>
        <div style={eyebrowStyle}>{eyebrow}</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(24px, 2.2vw, 30px)",
            lineHeight: 1.15,
            margin: "0 0 12px",
          }}
        >
          {title}
        </h3>
        <p style={{ ...sectionBodyStyle, marginBottom: qualifier ? 14 : 0 }}>{body}</p>
        {qualifier && <p style={sectionQualifierStyle}>{qualifier}</p>}
      </div>
    </article>
  );
}

function PhotoUnderlay({ src, alt, opacity }: { src: string; alt: string; opacity: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <ImageSlot
        src={src}
        alt={alt}
        placeholder={alt}
        sizes="(max-width: 960px) 100vw, 50vw"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

/**
 * Replaces the former Bays, Maintenance, Parts and 3D pinned sections with
 * one normal-flow section, so the copy stays put and readable instead of
 * fading in and out with scroll position.
 */
export function FeaturesSection() {
  const clouds = makeClouds("kf", 4, {
    topMin: 0,
    topRange: 100,
    minSize: 460,
    sizeRange: 340,
    opacity: 0.35,
    blur: 44,
  });

  return (
    <section
      id="features"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 6vw",
        background:
          "radial-gradient(ellipse at 50% 35%, #13263F 0%, rgba(10,26,47,0) 60%), linear-gradient(180deg, #060D18 0%, #0A1A2F 14%, #0A1A2F 86%, #060D18 100%)",
      }}
    >
      {clouds.map((c) => (
        <div key={c.id} style={c.style} />
      ))}

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <div style={eyebrowStyle}>KEY FEATURES</div>
          <h2 style={h2Style(18)}>One garage. Every part of ownership.</h2>
          <p style={sectionBodyStyle}>
            Each vehicle gets its own Bay. Service history, maintenance, parts, and 3D views all
            work from the vehicle you actually own.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: 24,
          }}
        >
          <FeaturePanel
            id="bays"
            eyebrow="BAYS"
            title="A digital Bay for every vehicle."
            body="Give each vehicle its own organized space. Keep specifications, service records, maintenance history, mileage, notes, and ownership information together."
            visual={
              <>
                <PhotoUnderlay src="/images/home/bays-truck.webp" alt="Pickup truck, 3/4 rear, worksite or trailhead" opacity={0.5} />
                <div style={{ position: "absolute", right: 20, top: 20, display: "flex", flexDirection: "column", gap: 10, width: "min(230px, 70%)" }}>
                  {BAYS.map((b) => (
                    <div key={b.bay} style={uiCardStyle}>
                      <div style={uiLabelStyle}>{b.bay}</div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{b.name}</div>
                      <div style={uiMetaStyle}>{b.meta}</div>
                    </div>
                  ))}
                </div>
              </>
            }
          />

          <FeaturePanel
            id="maintenance"
            eyebrow="MAINTENANCE"
            title="Keep service history from becoming guesswork."
            body="Record completed services, preserve maintenance history, and follow upcoming needs based on time, mileage, and available vehicle information."
            visual={
              <>
                <PhotoUnderlay src="/images/home/maint-suv.webp" alt="SUV wheel + brake assembly close-up, workshop light" opacity={0.4} />
                <div style={{ position: "absolute", left: 20, top: 24, display: "flex", flexDirection: "column", gap: 8, width: "min(320px, 80%)" }}>
                  {MAINTENANCE_ROWS.map((row) => (
                    <div
                      key={row.text}
                      style={{
                        padding: "10px 14px",
                        borderRadius: 4,
                        fontSize: 14,
                        fontWeight: row.bold ? 600 : 400,
                        background: "rgba(19,38,63,0.95)",
                        color: row.color,
                        borderLeft: `2px solid ${row.accent}`,
                      }}
                    >
                      {row.text}
                    </div>
                  ))}
                </div>
              </>
            }
          />

          <FeaturePanel
            id="parts"
            eyebrow="PARTS"
            title="Start with the vehicle, not the catalog."
            body="Search for parts from the vehicle in your Bay, so results are narrowed to what fits it."
            qualifier="Fitment and availability depend on vehicle information, supplier data, and supported inventory. Compatibility should be confirmed before purchase or installation."
            visual={
              <>
                <PhotoUnderlay src="/images/home/parts-truck.webp" alt="Pickup truck front 3/4, gravel lot" opacity={0.45} />
                <div style={{ position: "absolute", left: 20, bottom: 40, width: "min(300px, 80%)" }}>
                  <div style={uiCardStyle}>
                    <div style={uiLabelStyle}>MATCHED TO YOUR GARAGE</div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Cabin Air Filter</div>
                    <div style={uiMetaStyle}>Fits Daily Driver · Bay 01</div>
                  </div>
                </div>
              </>
            }
          />

          <FeaturePanel
            id="three-d"
            eyebrow="3D VIEWS"
            title="Explore supported vehicles by system."
            body="Move through supported exterior, interior, and chassis views, then select interactive hotspots to explore parts associated with specific areas of the vehicle."
            qualifier="Advanced 3D views and hotspots are available for supported vehicle models and will expand over time."
            visual={
              <>
                <div style={{ position: "absolute", inset: 0 }}>
                  <VehicleStage modelSrc="/assets/hellcat.glb" />
                </div>
                <div style={{ position: "absolute", right: 20, bottom: 40, width: "min(220px, 70%)", pointerEvents: "none" }}>
                  <div style={uiCardStyle}>
                    <div style={uiLabelStyle}>FRONT SUSPENSION</div>
                    <div style={{ fontSize: 14, color: "#C7D1DB" }}>3 compatible parts found</div>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

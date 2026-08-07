"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollY } from "@/hooks/use-scroll-y";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { makeClouds } from "@/lib/clouds";
import { EXPANDING_ITEMS, FOUNDATION_ITEMS, PLANNED_ITEMS, PRIORITY_INPUTS } from "./roadmap-data";
import {
  ctaPrimaryLargeStyle,
  ctaPrimaryStyle,
  ctaSecondaryLargeStyle,
  ctaSecondaryStyle,
  ctaTertiaryStyle,
  eyebrowStyle,
  h1Style,
  h2Style,
  heroBodyStyle,
  sectionBodyStyle,
  statusBadgeStyle,
} from "./styles";

export function RoadmapPage() {
  const reducedMotion = useReducedMotion();
  const scrollY = useScrollY(reducedMotion);
  const { entered, refFor } = useSectionReveal();

  const heroClouds = useMemo(
    () => makeClouds("rmh", 4, { topMin: 0, topRange: 55, minSize: 420, sizeRange: 340, opacity: 0.35, blur: 44 }),
    []
  );
  const expandingClouds = useMemo(
    () => makeClouds("rme", 4, { topMin: 0, topRange: 100, minSize: 420, sizeRange: 320, opacity: 0.3, blur: 40 }),
    []
  );

  const reveal = (key: string): CSSProperties => ({
    opacity: entered[key] ? 1 : 0,
    transform: entered[key] ? "translateY(0)" : "translateY(36px)",
    transition: "opacity .8s ease, transform .8s ease",
  });

  const parallaxRoadStyle: CSSProperties = reducedMotion ? {} : { transform: `translateY(${-scrollY * 0.06}px)` };
  const parallaxVehicleStyle: CSSProperties = {
    transform: `translateX(-50%) ${reducedMotion ? "" : `translateY(${-scrollY * 0.1}px)`}`,
  };

  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 30%, #13263F 0%, #0A1A2F 55%, #060D18 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "55%",
            opacity: 0.5,
            clipPath: "polygon(44% 100%, 56% 100%, 51.5% 0%, 48.5% 0%)",
            background: "linear-gradient(180deg, #1a2c42 0%, #0d1c2e 100%)",
            ...parallaxRoadStyle,
          }}
        />
        <div style={{ position: "absolute", left: "50%", bottom: "8%", opacity: 0.35, ...parallaxVehicleStyle }}>
          <ImageSlot
            src="/images/roadmap/hero-open-road.png"
            alt="Vehicle receding down an open mountain road under a dramatic sky"
            placeholder="Vehicle receding down an open route, low angle"
            style={{ width: "min(700px,60vw)", height: "34vh" }}
          />
        </div>
        {heroClouds.map((c) => (
          <div key={c.id} style={c.style} />
        ))}
        <div style={{ position: "absolute", left: "8%", top: "32%", maxWidth: 640 }}>
          <div style={eyebrowStyle}>THE ROAD AHEAD</div>
          <h1 style={h1Style}>Building the connected garage, one capability at a time.</h1>
          <p style={heroBodyStyle}>
            DreamBuild is launching with a focused foundation and will expand through real use,
            member feedback, supplier connections, and broader vehicle support. Explore what is
            available, what is being expanded, and where the platform is headed.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/#final" style={ctaPrimaryStyle}>
              Create Your Garage
            </Link>
            <Link href="/#final" style={ctaSecondaryStyle}>
              Join the Web Launch List
            </Link>
            <Link href="#foundation" style={ctaTertiaryStyle}>
              Explore Current Features ↓
            </Link>
          </div>
        </div>
      </section>

      {/* FOUNDATION */}
      <section
        id="foundation"
        ref={refFor("foundation")}
        style={{ position: "relative", padding: "120px 8vw", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.22 }}>
          <ImageSlot
            src="/images/roadmap/foundation-truck.png"
            alt="Pickup truck parked in a dim workshop, tool wall in background"
            placeholder="Pickup truck, grounded, workshop context"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,26,47,0.75), rgba(10,26,47,0.95))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", ...reveal("foundation") }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={statusBadgeStyle("#3DDC84", "rgba(61,220,132,0.12)", "rgba(61,220,132,0.4)")}>
              AVAILABLE · WEB LAUNCH
            </span>
          </div>
          <h2 style={h2Style(16)}>The foundation of DreamBuild</h2>
          <p style={sectionBodyStyle}>
            The initial product connects Garage Bays, vehicle information, records, maintenance,
            events, community, and supported vehicle experiences.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
            {FOUNDATION_ITEMS.map((label) => (
              <div
                key={label}
                style={{
                  padding: "14px 16px",
                  background: "rgba(19,38,63,0.8)",
                  border: "1px solid rgba(61,220,132,0.2)",
                  borderLeft: "2px solid #3DDC84",
                  borderRadius: 4,
                  fontSize: 13,
                  color: "#E8EEF3",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPANDING */}
      <section
        id="expanding"
        ref={refFor("expanding")}
        style={{ position: "relative", padding: "120px 8vw", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.22 }}>
          <ImageSlot
            src="/images/roadmap/expanding-suv.png"
            alt="SUV parked on a rocky overlook, mountains and lake in the background"
            placeholder="SUV, off-road setting"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 60% 40%, rgba(19,38,63,0.65), rgba(6,13,24,0.95))",
          }}
        />
        {expandingClouds.map((c) => (
          <div key={c.id} style={c.style} />
        ))}
        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", ...reveal("expanding") }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={statusBadgeStyle("#3DC9F7", "rgba(61,201,247,0.12)", "rgba(61,201,247,0.4)")}>
              EXPANDING
            </span>
          </div>
          <h2 style={h2Style(16)}>Expanding what each Bay can do</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
            {EXPANDING_ITEMS.map((label) => (
              <div
                key={label}
                style={{
                  padding: "14px 16px",
                  background: "rgba(19,38,63,0.82)",
                  border: "1px solid rgba(61,201,247,0.25)",
                  borderLeft: "2px solid #3DC9F7",
                  borderRadius: 4,
                  fontSize: 13,
                  color: "#E8EEF3",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANNED */}
      <section
        id="planned"
        ref={refFor("planned")}
        style={{ position: "relative", padding: "120px 8vw", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
          <ImageSlot
            src="/images/roadmap/planned-sedan.png"
            alt="Sport sedan at night against a city skyline, with technical overlay arcs and node lines"
            placeholder="Sport sedan with subtle technical overlay lines"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,13,24,0.9), rgba(10,26,47,0.85))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", ...reveal("planned") }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={statusBadgeStyle("#9BA9B8", "rgba(155,169,184,0.12)", "rgba(155,169,184,0.35)")}>
              PLANNED
            </span>
          </div>
          <h2 style={h2Style(14)}>Deeper vehicle awareness</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
            {PLANNED_ITEMS.map((label) => (
              <div
                key={label}
                style={{
                  padding: "14px 16px",
                  background: "rgba(19,38,63,0.7)",
                  border: "1px solid rgba(155,169,184,0.2)",
                  borderLeft: "2px solid #5C7188",
                  borderRadius: 4,
                  fontSize: 13,
                  color: "#C7D1DB",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIORITIES */}
      <section
        id="priorities"
        ref={refFor("priorities")}
        style={{ position: "relative", padding: "120px 8vw", background: "#060D18" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", ...reveal("priorities") }}>
          <h2 style={{ ...h2Style(999), fontSize: "clamp(26px, 3.2vw, 40px)" }}>
            The roadmap will be shaped by real use.
          </h2>
          <p style={{ ...sectionBodyStyle, maxWidth: "none", marginBottom: 40 }}>
            DreamBuild priorities should be informed by member feedback, platform usage, vehicle
            coverage, supplier availability, technical readiness, and the practical value each
            capability adds to vehicle ownership.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {PRIORITY_INPUTS.map((label) => (
              <div
                key={label}
                style={{
                  padding: "12px 18px",
                  background: "rgba(19,38,63,0.8)",
                  border: "1px solid rgba(61,201,247,0.25)",
                  borderRadius: 20,
                  fontSize: 13,
                  color: "#C7D1DB",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ padding: "40px 8vw", background: "#060D18", borderTop: "1px solid rgba(244,246,248,0.06)" }}>
        <p style={{ maxWidth: 800, margin: "0 auto", fontSize: 12, color: "#5C7188", textAlign: "center", lineHeight: 1.6 }}>
          Roadmap items, sequencing, and availability may change as DreamBuild develops. Planned
          features are not commitments to specific release dates.
        </p>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", padding: "120px 8vw", background: "#060D18", textAlign: "center" }}>
        <h2 style={{ ...h2Style(999), fontSize: "clamp(28px, 3.6vw, 44px)", margin: "0 0 22px" }}>
          Help shape what comes next.
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/#final" style={ctaPrimaryLargeStyle}>
            Create Your Garage
          </Link>
          <Link href="/contact" style={ctaSecondaryLargeStyle}>
            Contact DreamBuild
          </Link>
        </div>
      </section>
    </div>
  );
}

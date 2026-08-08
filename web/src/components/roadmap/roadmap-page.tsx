"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollY } from "@/hooks/use-scroll-y";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { makeClouds } from "@/lib/clouds";
import { AUTH_URL } from "@/lib/site";
import { PRIORITY_INPUTS, ROADMAP_MILESTONES } from "./roadmap-data";
import {
  ctaDiscordStyle,
  ctaPrimaryStyle,
  ctaSecondaryStyle,
  ctaTertiaryStyle,
  eyebrowStyle,
  h1Style,
  h2Style,
  heroBodyStyle,
  sectionBodyStyle,
  statusBadgeStyle,
} from "./styles";

/** Color treatment per milestone status label, reusing the same
 * available/near-term/planned meaning as the previous 3-tier system. */
function statusColors(label: string): [string, string, string] {
  if (label === "AVAILABLE NOW") return ["#3DDC84", "rgba(61,220,132,0.12)", "rgba(61,220,132,0.4)"];
  if (label === "FUTURE") return ["#9BA9B8", "rgba(155,169,184,0.12)", "rgba(155,169,184,0.35)"];
  return ["#3DC9F7", "rgba(61,201,247,0.12)", "rgba(61,201,247,0.4)"]; // "8/2026", "NEXT"
}

export function RoadmapPage() {
  const reducedMotion = useReducedMotion();
  const scrollY = useScrollY(reducedMotion);
  const { entered, refFor } = useSectionReveal();

  const heroClouds = useMemo(
    () => makeClouds("rmh", 4, { topMin: 0, topRange: 55, minSize: 420, sizeRange: 340, opacity: 0.35, blur: 44 }),
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
            alt=""
            placeholder="Vehicle receding down an open route, low angle"
            style={{ width: "min(700px,60vw)", height: "34vh" }}
            priority
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
            <a href={AUTH_URL} style={ctaPrimaryStyle}>
              Create Your Garage
            </a>
            <Link href="/#waitlist" style={ctaSecondaryStyle}>
              Join the Web Launch List
            </Link>
            <Link href="#foundation" style={ctaTertiaryStyle}>
              Explore Current Features ↓
            </Link>
          </div>
        </div>
      </section>

      {/* ROADMAP GRAPHIC — approved Canva export, primary visual */}
      <section id="foundation" ref={refFor("foundation")} style={{ position: "relative", padding: "100px 8vw", background: "#060D18" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", ...reveal("foundation") }}>
          <div style={{ overflowX: "auto", borderRadius: 8 }}>
            <Image
              src="/images/roadmap/product-roadmap-overview.png"
              alt="DreamBuild product roadmap graphic showing four milestones along a road: In the Garage (Available Now), Ready for Launch – Web (8/2026), The Next Mile (Next), and Beyond the Horizon (Future)."
              width={2000}
              height={1200}
              style={{ width: "100%", height: "auto", minWidth: 1100, display: "block", borderRadius: 8 }}
              sizes="(min-width: 1400px) 1400px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ROADMAP DETAILS — accessible/indexable text equivalent of the graphic above */}
      <section aria-labelledby="roadmap-details-heading" style={{ position: "relative", padding: "0 8vw 100px", background: "#060D18" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 id="roadmap-details-heading" style={{ ...h2Style(999), fontSize: 22, marginBottom: 28, color: "#9BA9B8" }}>
            Roadmap details
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 32 }}>
            {ROADMAP_MILESTONES.map((m) => {
              const [color, bg, border] = statusColors(m.statusLabel);
              return (
                <div key={m.id}>
                  <span style={{ ...statusBadgeStyle(color, bg, border), marginBottom: 10, display: "inline-block" }}>
                    {m.statusLabel}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 17,
                      margin: "10px 0 10px",
                      color: "#F4F6F8",
                    }}
                  >
                    {m.number}. {m.title}
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: "#9BA9B8" }}>
                    {m.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
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

      {/* DISCORD CTA */}
      <section style={{ position: "relative", padding: "100px 8vw 140px", background: "#060D18", textAlign: "center" }}>
        <h2 style={{ ...h2Style(999), fontSize: "clamp(28px, 3.6vw, 44px)", margin: "0 0 18px" }}>
          Stay up to date. Shape what comes next.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "#C7D1DB", maxWidth: "56ch", margin: "0 auto 32px" }}>
          Join the DreamBuild Discord to follow roadmap progress and submit feature requests and feedback.
        </p>
        <a href="#" style={ctaDiscordStyle}>
          Join the Discord
        </a>
      </section>
    </div>
  );
}

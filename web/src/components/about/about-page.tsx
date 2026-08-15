"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { CreateGarageCta } from "@/components/waitlist-ctas";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useScrollY } from "@/hooks/use-scroll-y";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { makeClouds } from "@/lib/clouds";
import { AUDIENCES, PRINCIPLES, TEAM } from "./about-data";
import {
  bodyPStyle,
  ctaPrimaryLargeStyle,
  ctaPrimaryStyle,
  ctaSecondaryLargeStyle,
  ctaSecondaryStyle,
  eyebrowStyle,
  fragChipStyle,
  h1Style,
  h2Style,
  heroBodyStyle,
} from "./styles";

export function AboutPage() {
  const reducedMotion = useReducedMotion();
  const scrollY = useScrollY(reducedMotion);
  const { entered, refFor } = useSectionReveal();

  const heroClouds = useMemo(
    () =>
      makeClouds("abaud", 3, {
        topMin: 0,
        topRange: 60,
        minSize: 400,
        sizeRange: 300,
        opacity: 0.25,
        blur: 40,
      }),
    []
  );

  const reveal = (key: string): CSSProperties => ({
    opacity: entered[key] ? 1 : 0,
    transform: entered[key] ? "translateY(0)" : "translateY(36px)",
    transition: "opacity .8s ease, transform .8s ease",
  });

  // Sits clear of the text column (left:8%, max-width:600px) so the badges
  // float over the hero background instead of on top of the headline.
  const fragStyle = (top: string): CSSProperties => ({
    position: "absolute",
    top,
    left: "54%",
    opacity: reducedMotion ? 0.9 : Math.max(0, 0.9 - scrollY * 0.002),
    transform: reducedMotion ? "none" : `translateY(${-scrollY * 0.15}px)`,
  });

  const heroParallaxStyle: CSSProperties = reducedMotion
    ? {}
    : { transform: `translateY(${-scrollY * 0.08}px)` };

  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 60% 40%, #13263F 0%, #0A1A2F 55%, #060D18 100%)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, ...heroParallaxStyle }}>
          <ImageSlot
            src="/images/about/hero-garage.png"
            alt="Vehicle in a garage/workshop, surrounded by ownership artifacts"
            placeholder="Vehicle in a garage/workshop, surrounded by ownership artifacts"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(6,13,24,0.95) 0%, rgba(6,13,24,0.9) 40%, rgba(6,13,24,0.2) 62%, rgba(6,13,24,0.35) 100%)",
          }}
        />
        <div style={fragStyle("16%")}>
          <div style={fragChipStyle}>🧾 Receipt</div>
        </div>
        <div style={fragStyle("40%")}>
          <div style={fragChipStyle}>📝 Notes</div>
        </div>
        <div style={fragStyle("64%")}>
          <div style={fragChipStyle}>📍 Event</div>
        </div>
        <div style={{ position: "relative", left: "8%", maxWidth: 600 }}>
          <div style={eyebrowStyle}>WHY DREAMBUILD EXISTS</div>
          <h1 style={h1Style}>Vehicle ownership should not feel this disconnected.</h1>
          <p style={heroBodyStyle}>
            Service records, maintenance reminders, parts research, automotive resources, events,
            and community are scattered across separate tools. DreamBuild is being created to bring
            those experiences into one connected garage.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/" style={ctaPrimaryStyle}>
              Explore DreamBuild
            </Link>
            <Link href="/roadmap" style={ctaSecondaryStyle}>
              View the Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section
        ref={refFor("problem")}
        style={{ position: "relative", padding: "120px 8vw", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.21 }}>
          <ImageSlot
            src="/images/about/problem-interior.png"
            alt=""
            placeholder="Sedan interior, dashboard detail"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,26,47,0.85), rgba(6,13,24,0.95))",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 800,
            margin: "0 auto",
            textAlign: "center",
            ...reveal("problem"),
          }}
        >
          <h2 style={h2Style}>Vehicle ownership lives across too many places.</h2>
          <p style={bodyPStyle}>
            Service records sit in glove boxes. Maintenance reminders live in separate apps. Parts
            research spreads across browser tabs. Events, shops, and automotive communities are
            disconnected from the vehicles owners actually have.
          </p>
        </div>
      </section>

      {/* IDEA */}
      <section
        ref={refFor("idea")}
        style={{
          position: "relative",
          padding: "120px 8vw",
          overflow: "hidden",
          background: "#060D18",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            top: "20%",
            opacity: 0.25,
            width: "46vw",
            height: "60vh",
          }}
        >
          <ImageSlot
            src="/images/about/idea-coupe.webp"
            alt="SUV, 3/4 profile"
            placeholder="SUV, 3/4 profile"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "relative",
            maxWidth: 600,
            margin: "0 0 0 auto",
            textAlign: "right",
            ...reveal("idea"),
          }}
        >
          <h2 style={h2Style}>What if the vehicle became the center?</h2>
          <p style={bodyPStyle}>
            DreamBuild is designed around each vehicle and its Bay. Records, maintenance, guidance,
            parts, events, and community become more useful when they connect to the vehicle rather
            than existing as isolated tools.
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section
        ref={refFor("principles")}
        style={{ position: "relative", padding: "120px 8vw", background: "#0A1A2F" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", ...reveal("principles") }}>
          <h2 style={{ ...h2Style, marginBottom: 40, textAlign: "center" }}>
            What DreamBuild believes
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16 }}>
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                style={{
                  padding: 20,
                  background: "rgba(19,38,63,0.7)",
                  border: "1px solid rgba(61,201,247,0.15)",
                  borderRadius: 6,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: "#F4F6F8", marginBottom: 8 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 13, color: "#9BA9B8", lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section
        ref={refFor("audience")}
        style={{
          position: "relative",
          padding: "120px 8vw",
          overflow: "hidden",
          background: "#060D18",
        }}
      >
        {heroClouds.map((c) => (
          <div key={c.id} style={c.style} />
        ))}
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", ...reveal("audience") }}>
          <h2
            style={{
              ...h2Style,
              marginBottom: 40,
              textAlign: "center",
              maxWidth: "16ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Built for every kind of vehicle owner
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 18 }}>
            {AUDIENCES.map((a) => (
              <div
                key={a.id}
                style={{ position: "relative", borderRadius: 6, overflow: "hidden", height: 220 }}
              >
                <ImageSlot src={a.src} alt={a.label} placeholder={a.placeholder} style={{ width: "100%", height: "100%" }} />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 14,
                    background:
                      "linear-gradient(180deg, rgba(6,13,24,0) 0%, rgba(6,13,24,0.92) 90%)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
        ref={refFor("team")}
        style={{ position: "relative", padding: "120px 8vw", background: "#0A1A2F" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", ...reveal("team") }}>
          <h2 style={{ ...h2Style, marginBottom: 40 }}>Who&rsquo;s building DreamBuild</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {TEAM.map((t) => (
              <div
                key={t.id}
                style={{
                  width: 220,
                  padding: 20,
                  background: "rgba(19,38,63,0.6)",
                  border: "1px dashed rgba(155,169,184,0.35)",
                  borderRadius: 8,
                }}
              >
                <ImageSlot
                  shape="circle"
                  alt={`${t.name} — photo pending`}
                  placeholder="Photo — pending"
                  style={{ width: 88, height: 88, margin: "0 auto 14px" }}
                />
                <div style={{ fontSize: 14, fontWeight: 600, color: "#9BA9B8" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#5C7188", margin: "4px 0 10px" }}>{t.role}</div>
                <div style={{ fontSize: 12, color: "#5C7188", lineHeight: 1.5 }}>
                  Bio — pending verified content
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section
        ref={refFor("vision")}
        style={{
          position: "relative",
          padding: "120px 8vw",
          overflow: "hidden",
          background: "#060D18",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
          <ImageSlot
            src="/images/about/vision-classic-modern.png"
            alt=""
            placeholder="Classic vehicle alongside a modern coupe, open sky"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(6,13,24,0.9), rgba(6,13,24,0.75))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto", ...reveal("vision") }}>
          <h2 style={h2Style}>A connected garage that grows with the vehicle owner.</h2>
          <p style={bodyPStyle}>
            DreamBuild will keep expanding vehicle coverage, guidance, and connected tools as the
            platform grows — always grounded in what owners actually need.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", padding: "120px 8vw", background: "#060D18", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            margin: "0 0 22px",
          }}
        >
          See what DreamBuild is becoming.
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/roadmap" style={ctaPrimaryLargeStyle}>
            Explore the Roadmap
          </Link>
          <CreateGarageCta style={ctaSecondaryLargeStyle}>Create Your Garage</CreateGarageCta>
        </div>
      </section>
    </div>
  );
}

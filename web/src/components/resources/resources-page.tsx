"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { CreateGarageCta } from "@/components/waitlist-ctas";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { CATEGORIES, GUIDES } from "./resources-data";

const h2Style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 22,
  margin: "0 0 20px",
};

export function ResourcesPage() {
  const { entered, refFor } = useSectionReveal();

  const reveal = (key: string): CSSProperties => ({
    opacity: entered[key] ? 1 : 0,
    transform: entered[key] ? "translateY(0)" : "translateY(24px)",
    transition: "opacity .7s ease, transform .7s ease",
  });

  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      {/* HERO */}
      <section style={{ position: "relative", padding: "170px 8vw 90px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.16 }}>
          <ImageSlot
            src="/images/resources/hero-workbench.png"
            alt=""
            placeholder="Garage workbench / dashboard, editorial tone"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,26,47,0.8), rgba(10,26,47,0.95))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
            <ol
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 8,
                listStyle: "none",
                margin: 0,
                padding: 0,
                fontSize: 12,
                color: "#5C7188",
              }}
            >
              <li>
                <Link href="/" style={{ color: "#5C7188", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" style={{ color: "#9BA9B8" }}>
                Resources
              </li>
            </ol>
          </nav>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#3DC9F7", marginBottom: 14 }}>
            DREAMBUILD RESOURCES
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 4vw, 52px)",
              margin: "0 0 18px",
            }}
          >
            Better information for the road ahead.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#C7D1DB", margin: "0 0 28px" }}>
            Explore practical guides covering vehicle maintenance, service records, ownership,
            dashboard indicators, parts and fitment, events, and DreamBuild features.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link
              href="#featured"
              style={{
                padding: "13px 24px",
                background: "#3DC9F7",
                color: "#0A1A2F",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Explore Featured Guides
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "13px 18px",
                border: "1px solid rgba(244,246,248,0.2)",
                borderRadius: 4,
                color: "#5C7188",
                fontSize: 13,
              }}
            >
              🔍 Search Resources
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section id="featured" ref={refFor("featured")} style={{ position: "relative", padding: "0 8vw 80px", ...reveal("featured") }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
            borderRadius: 10,
            overflow: "hidden",
            background: "rgba(19,38,63,0.6)",
            border: "1px solid rgba(244,246,248,0.08)",
          }}
        >
          <ImageSlot
            src="/images/resources/featured.webp"
            alt="Featured guide image"
            placeholder="Featured guide image"
            style={{ width: "100%", height: "100%", minHeight: 320 }}
          />
          <div style={{ padding: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#3DC9F7", marginBottom: 10 }}>
              DREAMBUILD GUIDES · FEATURED
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, margin: "0 0 12px" }}>
              What Is a Digital Garage?
            </h2>
            <p style={{ fontSize: 14, color: "#C7D1DB", lineHeight: 1.6, margin: "0 0 18px" }}>
              An introduction to organizing vehicle information, records, and maintenance in one
              connected space.
            </p>
            <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#5C7188", marginBottom: 18 }}>
              <span>6 min read</span>
              <span>·</span>
              <span>Updated Aug 2026</span>
            </div>
            <Link href="/resources/what-is-a-digital-garage" style={{ fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Read the guide →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" ref={refFor("categories")} style={{ position: "relative", padding: "20px 8vw 80px", ...reveal("categories") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={h2Style}>Browse by category</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 14 }}>
            {CATEGORIES.map((label) => (
              <div
                key={label}
                style={{
                  padding: 18,
                  background: "rgba(19,38,63,0.6)",
                  border: "1px solid rgba(61,201,247,0.15)",
                  borderLeft: "2px solid #3DC9F7",
                  borderRadius: 6,
                  fontSize: 14,
                  color: "#E8EEF3",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" ref={refFor("guides")} style={{ position: "relative", padding: "20px 8vw 100px", ...reveal("guides") }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ ...h2Style, margin: 0 }}>Recently updated</h2>
            <div style={{ display: "flex", gap: 10, fontSize: 12, color: "#9BA9B8" }}>
              <span style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(61,201,247,0.12)", color: "#3DC9F7" }}>
                All
              </span>
              <span style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)" }}>Beginner</span>
              <span style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)" }}>Maintenance</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 18 }}>
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/resources/${g.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  background: "rgba(19,38,63,0.55)",
                  border: "1px solid rgba(244,246,248,0.08)",
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <ImageSlot alt={g.placeholder} placeholder={g.placeholder} style={{ width: "100%", height: 140 }} />
                {g.status === "pending" && (
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "rgba(232,163,61,0.15)",
                      border: "1px solid rgba(232,163,61,0.4)",
                      color: "#E8C89A",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    COMING SOON
                  </span>
                )}
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 11, color: "#3DC9F7", marginBottom: 6 }}>{g.category}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#F4F6F8", lineHeight: 1.4 }}>{g.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section style={{ position: "relative", padding: "100px 8vw", background: "#060D18", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(26px, 3.2vw, 38px)",
            margin: "0 0 22px",
          }}
        >
          Organize what you learn around your own vehicle.
        </h2>
        <CreateGarageCta
          style={{
            padding: "15px 28px",
            background: "#3DC9F7",
            color: "#0A1A2F",
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          Create Your Garage
        </CreateGarageCta>
      </section>
    </div>
  );
}

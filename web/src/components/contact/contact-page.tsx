"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { CATEGORIES } from "./contact-data";

const labelStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#9BA9B8" };
const inputStyle: CSSProperties = {
  padding: "12px 14px",
  background: "#0A1A2F",
  border: "1px solid rgba(244,246,248,0.15)",
  borderRadius: 4,
  color: "#F4F6F8",
  fontSize: 14,
};

export function ContactPage() {
  const { entered, refFor } = useSectionReveal();

  const reveal = (key: string): CSSProperties => ({
    opacity: entered[key] ? 1 : 0,
    transform: entered[key] ? "translateY(0)" : "translateY(24px)",
    transition: "opacity .7s ease, transform .7s ease",
  });

  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      {/* HERO */}
      <section style={{ position: "relative", padding: "180px 8vw 100px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.14 }}>
          <ImageSlot
            alt="Vehicle underlay, low opacity, technical connection lines"
            placeholder="Vehicle underlay, low opacity, technical connection lines"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 30%, rgba(19,38,63,0.6), rgba(10,26,47,0.95))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#3DC9F7", marginBottom: 14 }}>
            CONTACT DREAMBUILD
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 4vw, 52px)",
              margin: "0 0 18px",
            }}
          >
            Start the right conversation.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#C7D1DB", margin: 0 }}>
            Questions about the platform, account access, automotive partnerships, events,
            inventory, or media can be routed to the right place.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section ref={refFor("categories")} style={{ position: "relative", padding: "0 8vw 80px", ...reveal("categories") }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12 }}>
          {CATEGORIES.map((label) => (
            <div
              key={label}
              style={{
                padding: 16,
                background: "rgba(19,38,63,0.6)",
                border: "1px solid rgba(61,201,247,0.15)",
                borderRadius: 6,
                fontSize: 13,
                color: "#C7D1DB",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section ref={refFor("form")} style={{ position: "relative", padding: "20px 8vw 100px", ...reveal("form") }}>
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background: "rgba(19,38,63,0.6)",
            border: "1px solid rgba(244,246,248,0.1)",
            borderRadius: 10,
            padding: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 18 }}>
              <label style={labelStyle}>
                Name
                <input type="text" placeholder="Your name" style={inputStyle} />
              </label>
              <label style={labelStyle}>
                Email
                <input type="email" placeholder="you@email.com" style={inputStyle} />
              </label>
            </div>
            <label style={labelStyle}>
              Inquiry type
              <select style={inputStyle}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label style={labelStyle}>
              Subject
              <input type="text" placeholder="Brief subject" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Message
              <textarea rows={5} placeholder="How can we help?" style={{ ...inputStyle, resize: "vertical" }} />
            </label>
            <label style={labelStyle}>
              Company or organization (optional)
              <input type="text" placeholder="Optional" style={inputStyle} />
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#9BA9B8" }}>
              <input type="checkbox" style={{ marginTop: 3 }} />I consent to DreamBuild contacting me
              about this inquiry.
            </label>
            <button
              type="button"
              style={{
                padding: "14px 24px",
                background: "#3DC9F7",
                color: "#0A1A2F",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
            <div style={{ fontSize: 12, color: "#5C7188", textAlign: "center" }}>
              DreamBuild will respond as soon as possible. Response times may vary by inquiry type
              and launch activity.
            </div>
          </div>
        </div>
      </section>

      {/* ALT CONTACT */}
      <section ref={refFor("alt")} style={{ position: "relative", padding: "20px 8vw 100px", ...reveal("alt") }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: "#9BA9B8", marginBottom: 4 }}>SUPPORT</div>
            <a href="#" style={{ fontSize: 14 }}>
              support@dreambuild.app
            </a>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#9BA9B8", marginBottom: 4 }}>BUSINESS</div>
            <a href="#" style={{ fontSize: 14 }}>
              partnerships@dreambuild.app
            </a>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#9BA9B8", marginBottom: 4 }}>COMMUNITY</div>
            <a href="#" style={{ fontSize: 14 }}>
              Discord
            </a>
          </div>
        </div>
      </section>

      {/* FAQ SHORTCUT */}
      <section style={{ padding: "20px 8vw 100px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", fontSize: 13, color: "#9BA9B8" }}>
          <Link href="/resources">Resources</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#">Account access</a>
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
          Looking for an answer before reaching out?
        </h2>
        <Link
          href="/resources"
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
          Explore DreamBuild Resources
        </Link>
      </section>
    </div>
  );
}

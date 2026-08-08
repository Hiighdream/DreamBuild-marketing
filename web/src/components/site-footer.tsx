import Link from "next/link";
import type { CSSProperties } from "react";
import { AUTH_URL } from "@/lib/site";

const columnHeadingStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  color: "#9BA9B8",
  marginBottom: 14,
};

const linkStyle: CSSProperties = {
  fontSize: 13,
  color: "#C7D1DB",
  textDecoration: "none",
};

const columnListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

export function SiteFooter() {
  return (
    <footer
      style={{
        position: "relative",
        background: "#060D18",
        padding: "64px 8vw 32px",
        borderTop: "1px solid rgba(244,246,248,0.08)",
        fontFamily: "var(--font-body)",
        color: "#F4F6F8",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.3fr) repeat(4,minmax(0,1fr))",
          gap: 36,
          maxWidth: 1280,
          margin: "0 auto 48px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            DREAM<span style={{ color: "#3DC9F7" }}>BUILD</span>
          </div>
          <p style={{ fontSize: 13, color: "#5C7188", lineHeight: 1.6, maxWidth: "26ch", margin: 0 }}>
            One connected garage for vehicle information, maintenance, parts, events, and community.
          </p>
        </div>

        <div>
          <div style={columnHeadingStyle}>PRODUCT</div>
          <div style={columnListStyle}>
            <Link href="/#bays" style={linkStyle}>Digital Garage</Link>
            <Link href="/#maintenance" style={linkStyle}>Vehicle Maintenance</Link>
            <Link href="/#leroy" style={linkStyle}>Leroy</Link>
            <Link href="/#parts" style={linkStyle}>Parts</Link>
            <Link href="/#community" style={linkStyle}>Community</Link>
            <Link href="/#events" style={linkStyle}>Events</Link>
            <Link href="/roadmap" style={linkStyle}>Roadmap</Link>
          </div>
        </div>

        <div>
          <div style={columnHeadingStyle}>COMPANY</div>
          <div style={columnListStyle}>
            <Link href="/about" style={linkStyle}>About</Link>
            <Link href="/contact" style={linkStyle}>Contact</Link>
            <Link href="/resources" style={linkStyle}>Resources</Link>
          </div>
        </div>

        <div>
          <div style={columnHeadingStyle}>ACCOUNT</div>
          <div style={columnListStyle}>
            <a href={AUTH_URL} style={linkStyle}>Sign In</a>
            <a href={AUTH_URL} style={linkStyle}>Create Your Garage</a>
          </div>
        </div>

        <div>
          <div style={columnHeadingStyle}>COMMUNITY</div>
          <div style={columnListStyle}>
            <a href="#" style={linkStyle}>Discord</a>
          </div>
        </div>

        <div>
          <div style={columnHeadingStyle}>LEGAL</div>
          <div style={columnListStyle}>
            <Link href="/privacy" style={linkStyle}>Privacy</Link>
            <Link href="/terms" style={linkStyle}>Terms</Link>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "24px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(244,246,248,0.06)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 12, color: "#5C7188" }}>© 2026 DreamBuild. All rights reserved.</div>
        <div style={{ fontSize: 12, color: "#5C7188" }}>
          Concept UI shown for illustration. Fitment, availability, and 3D support vary by vehicle.
        </div>
      </div>
    </footer>
  );
}

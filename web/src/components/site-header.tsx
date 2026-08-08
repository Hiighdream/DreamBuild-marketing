import Link from "next/link";
import type { CSSProperties } from "react";
import { AUTH_URL } from "@/lib/site";

export type NavKey = "roadmap" | "resources" | "about" | "contact" | "";

const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "roadmap", label: "ROADMAP", href: "/roadmap" },
  { key: "resources", label: "RESOURCES", href: "/resources" },
  { key: "about", label: "ABOUT", href: "/about" },
  { key: "contact", label: "CONTACT", href: "/contact" },
];

const navLinkStyle = (active: boolean): CSSProperties => ({
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textDecoration: "none",
  color: active ? "#3DC9F7" : "#9BA9B8",
});

export function SiteHeader({ active = "" }: { active?: NavKey }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: "18px 32px 14px",
        background:
          "linear-gradient(180deg, rgba(6,13,24,0.92) 0%, rgba(6,13,24,0.55) 70%, rgba(6,13,24,0) 100%)",
        backdropFilter: "blur(6px)",
        fontFamily: "var(--font-body)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: "0.02em",
          color: "#F4F6F8",
          textDecoration: "none",
        }}
      >
        DREAM<span style={{ color: "#3DC9F7" }}>BUILD</span>
      </Link>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Link key={item.key} href={item.href} style={navLinkStyle(active === item.key)}>
            {item.label}
          </Link>
        ))}
        <a
          href={AUTH_URL}
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#9BA9B8",
            textDecoration: "none",
          }}
        >
          SIGN IN
        </a>
        <a
          href={AUTH_URL}
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "9px 18px",
            borderRadius: 3,
            background: "#3DC9F7",
            color: "#0A1A2F",
            textDecoration: "none",
          }}
        >
          CREATE YOUR GARAGE
        </a>
      </nav>
    </header>
  );
}

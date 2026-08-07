import type { CSSProperties } from "react";

export const eyebrowStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.12em",
  color: "#3DC9F7",
  marginBottom: 14,
};

export const h1Style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(32px, 4.6vw, 60px)",
  lineHeight: 1.06,
  margin: "0 0 18px",
  maxWidth: "14ch",
};

export const heroBodyStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  color: "#C7D1DB",
  maxWidth: "46ch",
  margin: "0 0 28px",
};

export function h2Style(maxWidthCh: number): CSSProperties {
  return {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(28px, 3.6vw, 44px)",
    margin: "0 0 16px",
    maxWidth: `${maxWidthCh}ch`,
  };
}

export const sectionBodyStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.65,
  color: "#C7D1DB",
  maxWidth: "60ch",
  margin: "0 0 36px",
};

export const ctaPrimaryStyle: CSSProperties = {
  padding: "13px 24px",
  background: "#3DC9F7",
  color: "#0A1A2F",
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 4,
  textDecoration: "none",
};

export const ctaSecondaryStyle: CSSProperties = {
  padding: "13px 24px",
  border: "1px solid rgba(244,246,248,0.3)",
  color: "#F4F6F8",
  fontWeight: 600,
  fontSize: 14,
  borderRadius: 4,
  textDecoration: "none",
};

export const ctaTertiaryStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#9BA9B8",
  padding: "13px 4px",
  textDecoration: "none",
};

export const ctaPrimaryLargeStyle: CSSProperties = {
  padding: "15px 28px",
  background: "#3DC9F7",
  color: "#0A1A2F",
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 4,
  textDecoration: "none",
};

export const ctaSecondaryLargeStyle: CSSProperties = {
  padding: "15px 28px",
  border: "1px solid rgba(244,246,248,0.3)",
  color: "#F4F6F8",
  fontWeight: 600,
  fontSize: 14,
  borderRadius: 4,
  textDecoration: "none",
};

export function statusBadgeStyle(color: string, bg: string, border: string): CSSProperties {
  return {
    padding: "5px 12px",
    borderRadius: 20,
    background: bg,
    border: `1px solid ${border}`,
    color,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.06em",
  };
}

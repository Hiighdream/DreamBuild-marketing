import type { CSSProperties } from "react";

export const eyebrowStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  color: "#3DC9F7",
  marginBottom: 10,
};

export const h1Style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(28px, 3.8vw, 52px)",
  lineHeight: 1.06,
  margin: "0 0 12px",
  maxWidth: "13ch",
};

export const heroBodyStyle: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.5,
  color: "#C7D1DB",
  maxWidth: "38ch",
  margin: "0 0 18px",
};

export function h2Style(maxWidthCh: number): CSSProperties {
  return {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(30px, 4.2vw, 54px)",
    margin: "0 0 18px",
    maxWidth: `${maxWidthCh}ch`,
  };
}

export const sectionBodyStyle: CSSProperties = {
  fontSize: 17,
  lineHeight: 1.65,
  color: "#C7D1DB",
  margin: 0,
};

export const sectionQualifierStyle: CSSProperties = {
  fontSize: 12,
  color: "#5C7188",
  maxWidth: "46ch",
  margin: 0,
};

export const ctaPrimaryStyle: CSSProperties = {
  padding: "11px 20px",
  background: "#3DC9F7",
  color: "#0A1A2F",
  fontWeight: 700,
  fontSize: 13,
  borderRadius: 4,
  textDecoration: "none",
};

export const ctaSecondaryStyle: CSSProperties = {
  padding: "11px 20px",
  border: "1px solid rgba(244,246,248,0.3)",
  color: "#F4F6F8",
  fontWeight: 600,
  fontSize: 13,
  borderRadius: 4,
  textDecoration: "none",
};

export const ctaTertiaryStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#9BA9B8",
  padding: "11px 4px",
  textDecoration: "none",
};

export const ctaPrimaryLargeStyle: CSSProperties = {
  padding: "16px 30px",
  background: "#3DC9F7",
  color: "#0A1A2F",
  fontWeight: 700,
  fontSize: 15,
  borderRadius: 4,
  textDecoration: "none",
};

export const ctaSecondaryLargeStyle: CSSProperties = {
  padding: "16px 30px",
  border: "1px solid rgba(244,246,248,0.3)",
  color: "#F4F6F8",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 4,
  textDecoration: "none",
};

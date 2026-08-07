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
  fontSize: "clamp(32px, 4.4vw, 58px)",
  lineHeight: 1.08,
  margin: "0 0 18px",
  maxWidth: "13ch",
};

export const heroBodyStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  color: "#C7D1DB",
  maxWidth: "46ch",
  margin: "0 0 28px",
};

export const h2Style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(26px, 3.2vw, 40px)",
  margin: "0 0 18px",
};

export const bodyPStyle: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.65,
  color: "#C7D1DB",
  margin: 0,
};

export const fragChipStyle: CSSProperties = {
  padding: "10px 14px",
  background: "rgba(19,38,63,0.85)",
  border: "1px solid rgba(244,246,248,0.15)",
  borderRadius: 4,
  fontSize: 12,
  color: "#C7D1DB",
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

export const ctaPrimaryLargeStyle: CSSProperties = {
  ...ctaPrimaryStyle,
  padding: "15px 28px",
};

export const ctaSecondaryLargeStyle: CSSProperties = {
  ...ctaSecondaryStyle,
  padding: "15px 28px",
};

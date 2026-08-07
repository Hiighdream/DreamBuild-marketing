import { ImageResponse } from "next/og";

export const alt = "DreamBuild — your vehicle's digital garage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A1A2F",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: 260,
            background: "rgba(61,201,247,0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -160,
            width: 460,
            height: 460,
            borderRadius: 230,
            background: "rgba(61,201,247,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 128,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#F4F6F8" }}>DREAM</span>
          <span style={{ color: "#3DC9F7" }}>BUILD</span>
        </div>
        <div style={{ display: "flex", width: 90, height: 5, borderRadius: 3, background: "#3DC9F7", marginTop: 28 }} />
        <div style={{ display: "flex", fontSize: 34, color: "#C7D1DB", marginTop: 28 }}>
          Your vehicle&apos;s digital garage.
        </div>
      </div>
    ),
    { ...size }
  );
}

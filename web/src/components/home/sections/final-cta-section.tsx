import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import { CreateGarageCta } from "@/components/waitlist-ctas";
import { ctaPrimaryLargeStyle } from "../styles";
import { WaitlistForm } from "./waitlist-form";

export function FinalCtaSection() {
  return (
    <section
      id="final"
      style={{ position: "relative", padding: "140px 8vw 100px", background: "#060D18", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.7 }}>
        <ImageSlot
          src="/images/home/final-cta-road.png"
          alt="Sedan at dusk on a coastal road, dashboard HUD overlay converging toward the vehicle"
          placeholder="Open road / clear sky, vehicle and Bay together"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(6,13,24,0.55), rgba(6,13,24,0.9))",
        }}
      />
      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            margin: "0 0 20px",
          }}
        >
          Bring your vehicles into one connected garage.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "#C7D1DB", margin: "0 0 36px" }}>
          Create a DreamBuild account to organize vehicle information, preserve service history,
          follow maintenance needs, explore automotive resources, and grow with the platform as new
          capabilities are introduced.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
          <CreateGarageCta style={ctaPrimaryLargeStyle}>Create Your Garage</CreateGarageCta>
        </div>
        <div style={{ marginTop: 18 }}>
          <Link href="/roadmap" style={{ fontSize: 13, color: "#5C7188" }}>
            Explore the Roadmap →
          </Link>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import { makeClouds } from "@/lib/clouds";
import { ease, lerp } from "@/lib/motion-math";
import { AUTH_URL } from "@/lib/site";
import { PinnedSection } from "../pinned-section";
import { ctaPrimaryStyle, ctaSecondaryStyle, ctaTertiaryStyle, eyebrowStyle, h1Style, heroBodyStyle } from "../styles";

type HeroSectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  act: number;
  transition: string;
  reducedMotion: boolean;
};

export function HeroSection({ sectionRef, act, transition, reducedMotion }: HeroSectionProps) {
  const heroFadeOut = ease(act, 0, 0.32);
  const cloudBuild = ease(act, 0.15, 0.85);

  const vehicleStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    transform: `translateY(${lerp(0, -30, act)}px) scale(${lerp(1.04, 1.14, act)})`,
    opacity: lerp(1, 0.15, ease(act, 0.3, 0.9)),
    transition,
  };

  const textWrapStyle: CSSProperties = {
    position: "absolute",
    left: "6%",
    top: "170px",
    maxWidth: "30%",
    minWidth: "360px",
    opacity: 1 - heroFadeOut,
    transform: `translateY(${lerp(0, -50, heroFadeOut)}px)`,
    transition,
  };

  const cloudsBg = makeClouds("hb", 4, {
    active: act,
    dir: 1,
    topMin: 0,
    topRange: 100,
    minSize: 500,
    sizeRange: 400,
    color: "radial-gradient(ellipse at center, rgba(120,150,180,0.5), rgba(90,120,150,0) 70%)",
    opacityCurve: () => lerp(0.15, 0.7, cloudBuild),
    blur: 50,
  });
  const cloudsMid = makeClouds("hm", 4, {
    active: act,
    dir: -1,
    topMin: 20,
    topRange: 60,
    minSize: 380,
    sizeRange: 300,
    opacityCurve: () => lerp(0.1, 0.8, cloudBuild),
    blur: 36,
  });
  const cloudsFg = makeClouds("hf", 5, {
    active: act,
    dir: 1,
    driftBase: 80,
    driftRange: 100,
    topMin: 40,
    topRange: 55,
    minSize: 300,
    sizeRange: 260,
    color: "radial-gradient(ellipse at center, rgba(200,215,230,0.65), rgba(160,180,200,0) 70%)",
    opacityCurve: () => lerp(0, 0.95, ease(act, 0.45, 1)),
    blur: 22,
  });

  return (
    <PinnedSection
      id="hero"
      sectionRef={sectionRef}
      heightVh={320}
      reducedMotion={reducedMotion}
      background={
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, #13263F 0%, #0A1A2F 55%, #060D18 100%)",
            }}
          />
          <div style={vehicleStyle}>
            <ImageSlot
              src="/assets/hero-coupe.png"
              alt="Modern performance coupe, 3/4 front, dark cinematic studio"
              placeholder="Hero: modern performance coupe, 3/4 front, dark cinematic studio/road, dramatic rim light"
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
          {cloudsBg.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
          {cloudsMid.map((c) => (
            <div key={c.id} style={c.style} />
          ))}
        </>
      }
    >
      <div style={textWrapStyle}>
        <div style={eyebrowStyle}>YOUR VEHICLES. ONE CONNECTED GARAGE.</div>
        <h1 style={h1Style}>Everything your vehicle needs, in one garage.</h1>
        <p style={heroBodyStyle}>
          DreamBuild brings vehicle information, service history, maintenance guidance, parts
          discovery, automotive events, local resources, and community into one connected platform.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href={AUTH_URL} style={ctaPrimaryStyle}>
            Create Your Garage
          </a>
          <Link href="#waitlist" style={ctaSecondaryStyle}>
            Join the Web Launch List
          </Link>
          <Link href="#reveal" style={ctaTertiaryStyle}>
            See How It Works ↓
          </Link>
        </div>
      </div>
      {cloudsFg.map((c) => (
        <div key={c.id} style={c.style} />
      ))}
    </PinnedSection>
  );
}

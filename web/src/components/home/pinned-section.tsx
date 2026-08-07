import type { CSSProperties, ReactNode } from "react";

const topFadeStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  height: "14vh",
  background: "linear-gradient(180deg, #060D18 0%, rgba(6,13,24,0) 100%)",
  zIndex: 6,
  pointerEvents: "none",
};

const bottomFadeStyle: CSSProperties = {
  ...topFadeStyle,
  top: "auto",
  bottom: 0,
  background: "linear-gradient(0deg, #060D18 0%, rgba(6,13,24,0) 100%)",
};

type PinnedSectionProps = {
  id: string;
  sectionRef: (el: HTMLElement | null) => void;
  /** Wrapper scroll-runway height in vh, e.g. 320 for the hero. Collapses to 100vh under reduced motion. */
  heightVh: number;
  reducedMotion: boolean;
  /** The section's background layer(s) — gradient washes, vehicle underlay, clouds. */
  background: ReactNode;
  /** Foreground content — text, cards, hotspots — layered above the background. */
  children: ReactNode;
};

/**
 * Shared shell for the homepage's pinned scroll-hijack sections: a tall
 * wrapper that a `position: sticky` viewport rides through, edge-faded so
 * adjacent sections blend instead of cutting hard. `useSectionMotion`
 * reads the wrapper's height/position to derive 0..1 scroll progress.
 */
export function PinnedSection({
  id,
  sectionRef,
  heightVh,
  reducedMotion,
  background,
  children,
}: PinnedSectionProps) {
  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ position: "relative", height: reducedMotion ? "100vh" : `${heightVh}vh` }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={topFadeStyle} />
        <div style={bottomFadeStyle} />
        {background}
        {children}
      </div>
    </section>
  );
}

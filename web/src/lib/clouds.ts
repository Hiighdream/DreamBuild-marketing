import type { CSSProperties } from "react";

export type Cloud = { id: string; style: CSSProperties };

export type CloudOpts = {
  topMin?: number;
  topRange?: number;
  minSize?: number;
  sizeRange?: number;
  color?: string;
  blur?: number;
  /** Static opacity. Ignored when `opacityCurve` is given. */
  opacity?: number;
  /**
   * Scroll-driven variant (used by pinned, high-motion sections like the
   * homepage): 0..1 progress through the section. Drives drift transform
   * and, via `opacityCurve`, dynamic opacity. Omit for a static cloud
   * layer (no transform, opacity from `opacity`).
   */
  active?: number;
  dir?: 1 | -1;
  spread?: number;
  driftBase?: number;
  driftRange?: number;
  opacityCurve?: (active: number) => number;
};

const DEFAULT_CLOUD_GRADIENT =
  "radial-gradient(ellipse at center, rgba(150,175,200,0.4), rgba(90,120,150,0) 70%)";

/** Deterministic string hash used to seed cloud placement per section — also used directly wherever a section needs its own stable pseudo-random layout (e.g. scattered part cards). */
export function seededRand(seed: string) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i) * (i + 1);
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Generates blurred, screen-blended cloud shapes scattered across a section. */
export function makeClouds(
  seedKey: string,
  count: number,
  opts: CloudOpts = {}
): Cloud[] {
  const rnd = seededRand(seedKey);
  const arr: Cloud[] = [];
  const active = opts.active ?? 0;
  const dir = opts.dir ?? 1;
  const spread = opts.spread ?? 1;
  const drifts = opts.driftBase != null || opts.driftRange != null || opts.active != null;

  for (let i = 0; i < count; i++) {
    const left = rnd() * 100;
    const top = (opts.topMin ?? 10) + rnd() * (opts.topRange ?? 70);
    const size = (opts.minSize ?? 360) + rnd() * (opts.sizeRange ?? 300);

    const style: CSSProperties = {
      position: "absolute",
      left: left + "%",
      top: top + "%",
      width: size + "px",
      height: size * 0.55 + "px",
      background: opts.color ?? DEFAULT_CLOUD_GRADIENT,
      filter: `blur(${opts.blur ?? 36}px)`,
      opacity: opts.opacityCurve ? opts.opacityCurve(active) : (opts.opacity ?? 0.3),
      mixBlendMode: "screen",
      pointerEvents: "none",
    };

    if (drifts) {
      const driftX = dir * ((opts.driftBase ?? 50) + rnd() * (opts.driftRange ?? 70)) * active * spread;
      const driftY = (rnd() - 0.5) * 26 * active;
      style.transform = `translate(${driftX}px, ${driftY}px)`;
      style.willChange = "transform";
    }

    arr.push({ id: seedKey + "-" + i, style });
  }
  return arr;
}

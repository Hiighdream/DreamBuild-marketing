export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Remaps `p` from the range [a,b] to 0..1, clamped. */
export function ease(p: number, a: number, b: number): number {
  if (b === a) return p >= b ? 1 : 0;
  return clamp01((p - a) / (b - a));
}

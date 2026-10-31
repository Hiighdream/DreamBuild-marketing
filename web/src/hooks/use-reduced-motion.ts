"use client";

import { useMediaQuery } from "./use-media-query";

/** Tracks prefers-reduced-motion, live-updating if the user's OS setting changes. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

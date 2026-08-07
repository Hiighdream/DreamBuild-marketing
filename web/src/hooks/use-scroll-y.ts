"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks window.scrollY, rAF-throttled. Frozen at 0 when reducedMotion is
 * true so callers don't need to branch on both scrollY and reducedMotion
 * to disable parallax.
 */
export function useScrollY(reducedMotion: boolean): number {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        setScrollY((prev) => {
          const y = window.scrollY;
          return Math.abs(y - prev) > 2 ? y : prev;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return reducedMotion ? 0 : scrollY;
}

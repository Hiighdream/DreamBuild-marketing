"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Drives the homepage-style pinned scroll sequence: each section is a tall
 * wrapper (`height: Nvh`) containing a `position: sticky` viewport, and this
 * hook tracks continuous 0..1 progress through that wrapper as the user
 * scrolls past it — no scroll-jacking, just CSS sticky + a rAF-throttled
 * `getBoundingClientRect` read.
 *
 * Under prefers-reduced-motion, continuous progress is replaced by a one-shot
 * IntersectionObserver "entered" flag (0 or 1, CSS-transitioned), matching
 * the reduced-motion crossfade fallback used elsewhere in the design.
 */
export function useSectionMotion(keys: string[]) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [entered, setEntered] = useState<Record<string, boolean>>({});
  const elsRef = useRef<Record<string, HTMLElement | null>>({});
  const keyForEl = useRef(new WeakMap<Element, string>());
  const ioRef = useRef<IntersectionObserver | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setEntered((prev) => {
          let changed = false;
          const next = { ...prev };
          entries.forEach((entry) => {
            const key = keyForEl.current.get(entry.target);
            if (entry.isIntersecting && key && !next[key]) {
              next[key] = true;
              changed = true;
            }
          });
          return changed ? next : prev;
        });
      },
      { threshold: 0.2 }
    );
    ioRef.current = io;
    Object.values(elsRef.current).forEach((el) => {
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
      ioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const vh = window.innerHeight;
        setProgress((prev) => {
          let changed = false;
          const next: Record<string, number> = { ...prev };
          keys.forEach((key) => {
            const el = elsRef.current[key];
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const range = rect.height - vh;
            const p = range > 0 ? -rect.top / range : 0;
            const clamped = Math.round(Math.max(0, Math.min(1, p)) * 100) / 100;
            if (clamped !== prev[key]) changed = true;
            next[key] = clamped;
          });
          return changed ? next : prev;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const refFor = useCallback(
    (key: string) => (el: HTMLElement | null) => {
      elsRef.current[key] = el;
      if (el) {
        keyForEl.current.set(el, key);
        ioRef.current?.observe(el);
      }
    },
    []
  );

  /** 0..1 motion progress for `key`: continuous scroll progress normally, entered-flag under reduced motion. */
  const act = useCallback(
    (key: string) => (reducedMotion ? (entered[key] ? 1 : 0) : progress[key] || 0),
    [reducedMotion, entered, progress]
  );

  return {
    reducedMotion,
    act,
    /** CSS transition value: crossfade under reduced motion, off during continuous scroll-driven animation. */
    transition: reducedMotion ? "opacity .8s ease, transform .8s ease" : "none",
    refFor,
  };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which sections have scrolled into view (IntersectionObserver,
 * threshold 0.2) so each can reveal once and stay revealed. Attach the
 * returned `refFor(key)` callback to a section's DOM node; `entered[key]`
 * flips to true the first time that node intersects.
 */
export function useSectionReveal() {
  const [entered, setEntered] = useState<Record<string, boolean>>({});
  const elsRef = useRef<Record<string, Element | null>>({});
  const keyForEl = useRef(new WeakMap<Element, string>());
  const ioRef = useRef<IntersectionObserver | null>(null);

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
    // Ref callbacks run during the commit that precedes this effect, so any
    // section already mounted by the time this runs needs to be observed
    // here explicitly — otherwise it's only ever picked up by a later
    // re-render (which pages with no other frequently-re-rendering hook,
    // e.g. Contact and Resources, may never get), leaving it permanently
    // stuck at opacity 0.
    Object.values(elsRef.current).forEach((el) => {
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
      ioRef.current = null;
    };
  }, []);

  const refFor = useCallback(
    (key: string) => (el: Element | null) => {
      elsRef.current[key] = el;
      if (el) {
        keyForEl.current.set(el, key);
        ioRef.current?.observe(el);
      }
    },
    []
  );

  return { entered, refFor };
}

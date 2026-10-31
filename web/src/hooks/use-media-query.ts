"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Tracks a CSS media query, live-updating as it starts or stops matching. False during SSR. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query);
      if (mq.addEventListener) mq.addEventListener("change", callback);
      else mq.addListener(callback);
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", callback);
        else mq.removeListener(callback);
      };
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

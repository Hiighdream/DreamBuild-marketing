"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  if (mq.addEventListener) mq.addEventListener("change", callback);
  else mq.addListener(callback);
  return () => {
    if (mq.removeEventListener) mq.removeEventListener("change", callback);
    else mq.removeListener(callback);
  };
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Tracks prefers-reduced-motion, live-updating if the user's OS setting changes. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

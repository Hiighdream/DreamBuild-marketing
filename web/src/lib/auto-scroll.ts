const SPEED_PX_PER_SEC = 260;

/** Any direct user input that should cancel an in-flight auto-scroll, mirroring how manual scrolling is interrupted. */
const INTERRUPT_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

/**
 * Smoothly, continuously scrolls the page down at a constant speed until it
 * reaches the bottom, or stops the moment the user scrolls, touches, presses
 * a key, or clicks/taps anywhere. Drives its own per-frame position via
 * `scrollTo({ behavior: "instant" })` — `behavior: "auto"` would defer to the
 * page's `scroll-behavior: smooth` CSS and fight this rAF loop's own easing.
 */
export function startAutoScroll(): void {
  if (typeof window === "undefined") return;

  let rafId = 0;
  let lastTime: number | null = null;

  const stop = () => {
    cancelAnimationFrame(rafId);
    INTERRUPT_EVENTS.forEach((type) => window.removeEventListener(type, stop));
  };

  const step = (time: number) => {
    lastTime ??= time;
    const deltaSeconds = (time - lastTime) / 1000;
    lastTime = time;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const next = Math.min(window.scrollY + SPEED_PX_PER_SEC * deltaSeconds, maxScroll);
    window.scrollTo({ top: next, behavior: "instant" });

    if (next >= maxScroll) {
      stop();
      return;
    }
    rafId = requestAnimationFrame(step);
  };

  INTERRUPT_EVENTS.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  rafId = requestAnimationFrame(step);
}

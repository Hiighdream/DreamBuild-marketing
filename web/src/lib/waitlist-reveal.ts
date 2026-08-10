import type { MouseEvent } from "react";

/** Stable id for the waitlist section — the one canonical deep-link anchor. */
export const WAITLIST_ANCHOR_ID = "waitlist";

/** Fired to ask the mounted WaitlistForm to expand and scroll itself into view. */
export const REVEAL_WAITLIST_EVENT = "dreambuild:reveal-waitlist";

/**
 * Shared click handler for every pre-launch "go to the waitlist" CTA
 * (CreateGarageCta, JoinWaitlistCta). On the home page it intercepts a plain
 * left-click and asks the already-mounted WaitlistForm to reveal itself —
 * no navigation, no duplicated scroll/expand logic per component. On any
 * other page (or a modified click — new tab, etc.) it does nothing and lets
 * the link's own `href="/#waitlist"` navigate normally; WaitlistForm checks
 * `location.hash` on mount and reveals itself there too.
 */
export function goToWaitlist(event: MouseEvent<HTMLAnchorElement>): void {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (typeof window === "undefined" || window.location.pathname !== "/") return;
  event.preventDefault();
  window.dispatchEvent(new Event(REVEAL_WAITLIST_EVENT));
}

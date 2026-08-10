"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AUTH_URL, IS_PUBLIC_LAUNCH } from "@/lib/site";
import { goToWaitlist, WAITLIST_ANCHOR_ID } from "@/lib/waitlist-reveal";

type CtaProps = { style?: CSSProperties; children: ReactNode };

/**
 * The "Create Your Garage" CTA — identical in the header, hero, and
 * final-cta sections. Centralizes the IS_PUBLIC_LAUNCH branch so restoring
 * launch behavior (→ AUTH_URL) is one flag flip instead of hunting through
 * every CTA site.
 */
export function CreateGarageCta({ style, children }: CtaProps) {
  if (IS_PUBLIC_LAUNCH) {
    return (
      <a href={AUTH_URL} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${WAITLIST_ANCHOR_ID}`} style={style} onClick={goToWaitlist}>
      {children}
    </Link>
  );
}

/**
 * The "Join the Web Launch List" CTA used outside the waitlist form itself
 * (hero, final-cta). Always points at the waitlist — unlike CreateGarageCta
 * this isn't gated by IS_PUBLIC_LAUNCH, since the waitlist's post-launch fate
 * (kept, repurposed, or removed) is a separate decision.
 */
export function JoinWaitlistCta({ style, children }: CtaProps) {
  return (
    <Link href={`/#${WAITLIST_ANCHOR_ID}`} style={style} onClick={goToWaitlist}>
      {children}
    </Link>
  );
}

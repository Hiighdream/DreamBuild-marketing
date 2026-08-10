"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { LAUNCHLIST_FORM_URL } from "@/lib/site";
import { REVEAL_WAITLIST_EVENT, WAITLIST_ANCHOR_ID } from "@/lib/waitlist-reveal";

const FIELDS_ID = "waitlist-fields";

const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 12,
  color: "#9BA9B8",
  textAlign: "left",
};

const inputStyle: CSSProperties = {
  padding: "12px 14px",
  background: "#0A1A2F",
  border: "1px solid rgba(244,246,248,0.15)",
  borderRadius: 4,
  color: "#F4F6F8",
  fontSize: 14,
  minWidth: 220,
};

const joinButtonStyle = (disabled: boolean): CSSProperties => ({
  padding: "13px 24px",
  background: "#3DC9F7",
  color: "#0A1A2F",
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 4,
  border: "none",
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.7 : 1,
});

/**
 * The one canonical DreamBuild web-launch waitlist form (LaunchList custom
 * integration). widget-diy.js only rewrites this form's `action` to forward
 * the page's query string for referral tracking — it doesn't intercept
 * submission or render success/error UI, so this is a real native POST that
 * navigates to LaunchList's own hosted confirmation. The "submitting" state
 * here is just pre-navigation feedback, not a fabricated success message.
 *
 * Pre-launch, the form starts collapsed behind a "Join the Web Launch List"
 * trigger — see waitlist-reveal.ts for how CreateGarageCta/JoinWaitlistCta
 * (header, hero, final-cta) and a same-page `#waitlist` hash both ask this
 * component to expand, scroll into view, and focus First Name.
 */
export function WaitlistForm() {
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const focusTimeoutRef = useRef<number | undefined>(undefined);

  const reveal = useCallback(() => {
    setExpanded(true);
    containerRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.clearTimeout(focusTimeoutRef.current);
    focusTimeoutRef.current = window.setTimeout(
      () => firstNameRef.current?.focus(),
      reducedMotion ? 0 : 500
    );
  }, [reducedMotion]);

  useEffect(() => {
    window.addEventListener(REVEAL_WAITLIST_EVENT, reveal);
    // Deferred (not called synchronously in the effect body) so this initial
    // hash check doesn't trigger the cascading-render lint rule — a mount-time
    // URL check is a legitimate one-off sync with the browser's location.
    let hashTimeoutId: number | undefined;
    if (window.location.hash === `#${WAITLIST_ANCHOR_ID}`) {
      hashTimeoutId = window.setTimeout(reveal, 0);
    }
    return () => {
      window.removeEventListener(REVEAL_WAITLIST_EVENT, reveal);
      window.clearTimeout(hashTimeoutId);
      window.clearTimeout(focusTimeoutRef.current);
    };
  }, [reveal]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event.currentTarget.checkValidity()) {
      setSubmitting(true);
    }
  };

  return (
    <div
      id={WAITLIST_ANCHOR_ID}
      ref={containerRef}
      style={{
        marginTop: 44,
        paddingTop: 36,
        borderTop: "1px solid rgba(244,246,248,0.15)",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 14, color: "#C7D1DB", margin: "0 0 18px" }}>
        Join the DreamBuild web launch list for launch updates and product announcements.
      </p>

      {!expanded && (
        <button
          type="button"
          onClick={reveal}
          aria-expanded={false}
          aria-controls={FIELDS_ID}
          style={joinButtonStyle(false)}
        >
          Join the Web Launch List
        </button>
      )}

      <div
        id={FIELDS_ID}
        aria-hidden={!expanded}
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          opacity: expanded ? 1 : 0,
          visibility: expanded ? "visible" : "hidden",
          transform: expanded ? "translateY(0)" : "translateY(-6px)",
          transition: reducedMotion
            ? "none"
            : "grid-template-rows 0.4s ease, opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <form
            action={LAUNCHLIST_FORM_URL}
            method="POST"
            className="launchlist-form"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingTop: 24,
            }}
          >
            <label htmlFor="waitlist-first-name" style={labelStyle}>
              First Name
              <input
                id="waitlist-first-name"
                name="name"
                type="text"
                required
                placeholder="First name"
                ref={firstNameRef}
                style={inputStyle}
              />
            </label>
            <label htmlFor="waitlist-email" style={labelStyle}>
              Email address
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={inputStyle}
              />
            </label>
            <button type="submit" disabled={submitting} style={joinButtonStyle(submitting)}>
              {submitting ? "Joining…" : "Join the Web Launch List"}
            </button>
          </form>
          <p role="status" aria-live="polite" style={{ minHeight: 16, margin: "10px 0 0", fontSize: 12, color: "#3DC9F7" }}>
            {submitting ? "Submitting…" : ""}
          </p>
          <p style={{ fontSize: 12, color: "#5C7188", maxWidth: 480, margin: "10px auto 0", lineHeight: 1.6 }}>
            By joining, you agree to receive DreamBuild launch and product emails. You can unsubscribe at
            any time. See our{" "}
            <Link href="/privacy" style={{ fontSize: 12 }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

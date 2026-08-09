"use client";

import Link from "next/link";
import { useState, type CSSProperties, type FormEvent } from "react";
import { LAUNCHLIST_FORM_URL } from "@/lib/site";

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

/**
 * The one canonical DreamBuild web-launch waitlist form (LaunchList custom
 * integration). widget-diy.js only rewrites this form's `action` to forward
 * the page's query string for referral tracking — it doesn't intercept
 * submission or render success/error UI, so this is a real native POST that
 * navigates to LaunchList's own hosted confirmation. The "submitting" state
 * here is just pre-navigation feedback, not a fabricated success message.
 */
export function WaitlistForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event.currentTarget.checkValidity()) {
      setSubmitting(true);
    }
  };

  return (
    <div
      id="waitlist"
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
      <form
        action={LAUNCHLIST_FORM_URL}
        method="POST"
        className="launchlist-form"
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end" }}
      >
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
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "13px 24px",
            background: "#3DC9F7",
            color: "#0A1A2F",
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 4,
            border: "none",
            cursor: submitting ? "default" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
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
  );
}

import type { NextConfig } from "next";

/** The only third-party origin the site talks to at runtime — the LaunchList
 * waitlist widget script and its form submission (see src/lib/site.ts). */
const LAUNCHLIST_ORIGIN = "https://getlaunchlist.com";

/**
 * 'unsafe-inline' on script-src is a deliberate, narrower trade-off, not an
 * oversight: Next.js injects same-origin inline scripts for RSC hydration,
 * and letting those run without it would require nonce-based CSP threaded
 * through middleware — which forces every route to render dynamically
 * per-request instead of statically (confirmed against this app; Next's own
 * docs note the same). That's a bad trade for a fully static marketing site
 * with no known injection point (see the security audit this PR follows up
 * on — no dangerouslySetInnerHTML beyond the already-escaped JSON-LD
 * component, no user-controlled content reaching the DOM). This policy still
 * blocks the more common real-world case: loading a script from any origin
 * other than this site or the LaunchList widget.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${LAUNCHLIST_ORIGIN}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self' ${LAUNCHLIST_ORIGIN}`,
  `form-action 'self' ${LAUNCHLIST_ORIGIN}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;

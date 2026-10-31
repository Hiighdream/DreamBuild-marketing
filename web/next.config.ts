import type { NextConfig } from "next";

/** The only third-party origin the site talks to at runtime — the LaunchList
 * waitlist widget script and its form submission (see src/lib/site.ts). */
const LAUNCHLIST_ORIGIN = "https://getlaunchlist.com";

/** Holo AI's blog embed (see HOLO_EMBED_SCRIPT_URL in src/lib/site.ts). Only
 * /blog's CSP allows it — the script gets full DOM access and inserts post
 * HTML unsanitized, so it's confined to the one page that needs it. */
const HOLO_EMBED_ORIGIN = "https://prod-api-holo-ai.fly.dev";

/** Vercel Speed Insights domains for analytics tracking. */
const VERCEL_SPEED_INSIGHTS_SCRIPT = "https://va.vercel-scripts.com";
const VERCEL_SPEED_INSIGHTS_VITALS = "https://vitals.vercel-insights.com";

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
const contentSecurityPolicy = ({ extraScriptSrc = "", extraImgSrc = "" } = {}) => [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${LAUNCHLIST_ORIGIN} ${VERCEL_SPEED_INSIGHTS_SCRIPT} ${extraScriptSrc}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${extraImgSrc}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${LAUNCHLIST_ORIGIN} ${VERCEL_SPEED_INSIGHTS_VITALS}`,
  `form-action 'self' ${LAUNCHLIST_ORIGIN}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy() },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: SECURITY_HEADERS },
      // Listed last so it overrides the site-wide CSP. Post images can come from any host Holo uses, hence https:.
      {
        source: "/blog",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy({ extraScriptSrc: HOLO_EMBED_ORIGIN, extraImgSrc: "https:" }),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

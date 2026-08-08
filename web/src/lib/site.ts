/** The future production marketing-site domain — not yet live. */
export const SITE_URL = "https://dreambuild.app";

/** The separate DreamBuild web application (sign-in, Bays, etc.), not part of this repo. */
export const APP_URL = "https://app.dreambuild.app";

/** Auth entry point for the DreamBuild web app. Use this — not APP_URL — for
 * "Sign In" / "Create Your Garage" style CTAs that should land a user directly
 * on the sign-up/login screen. APP_URL stays the bare app origin for
 * non-auth references (e.g. structured data). */
export const AUTH_URL = "https://app.dreambuild.app/sign-up-login-screen";

export const SITE_NAME = "DreamBuild";

const OG_IMAGE_ALT = "DreamBuild — your vehicle's digital garage";

/** Shared Open Graph fields every page's `openGraph` object should include, since
 * setting a page-level `openGraph` replaces the parent's object instead of merging it.
 * `images` is set explicitly (rather than relying on the opengraph-image.tsx file
 * convention to cascade) because that cascade doesn't reach routes that declare
 * their own `openGraph` object — verified empirically against the built output. */
export const OG_BASE = {
  type: "website" as const,
  siteName: SITE_NAME,
  locale: "en_US",
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: OG_IMAGE_ALT }],
};

/** Same reasoning as OG_BASE, for the `twitter` metadata field. */
export const TWITTER_IMAGES = [{ url: "/twitter-image", alt: OG_IMAGE_ALT }];

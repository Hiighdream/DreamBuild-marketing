"use client";

import { useEffect } from "react";
import { HOLO_EMBED_SCRIPT_URL } from "@/lib/site";

/**
 * Holo's embed is a run-once script that renders into #holo-blog. It's
 * injected from an effect because a <script> rendered by React on the client
 * never executes.
 *
 * /blog is kept as its own document in both directions: links in (fullLoad in
 * site-header.tsx) for its CSP, and links out (below) because the embed
 * registers a popstate listener it never removes. Left alive after a client
 * navigation, it rewrites the next page's title and JSON-LD on back/forward.
 */
export function BlogEmbed() {
  useEffect(() => {
    // Once per document: a second run (e.g. Strict Mode's double effect) would save the open post's title as the list title.
    if (!document.querySelector(`script[src="${HOLO_EMBED_SCRIPT_URL}"]`)) {
      const script = document.createElement("script");
      script.src = HOLO_EMBED_SCRIPT_URL;
      script.async = true;
      document.body.appendChild(script);
    }

    // Capture phase on document runs before React's root listener, so <Link> never sees the click.
    const leaveWithFullLoad = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download") || link.origin !== location.origin) return;
      // Same-path links are Holo's own ?post= cards and "All articles", which it handles in place.
      if (link.pathname === location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      location.assign(link.href);
    };
    document.addEventListener("click", leaveWithFullLoad, true);

    return () => document.removeEventListener("click", leaveWithFullLoad, true);
  }, []);

  return <div id="holo-blog" />;
}

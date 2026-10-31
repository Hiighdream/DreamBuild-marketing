import type { Metadata } from "next";
import { BlogPage } from "@/components/blog/blog-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Blog";
const description =
  "Articles from DreamBuild on vehicle ownership, maintenance, parts, and the automotive community.";

// No alternates.canonical here, unlike other pages: Holo's embed adds its own
// canonical per post (/blog?post=<slug>), and two canonicals make Google ignore both.
export const metadata: Metadata = {
  title,
  description,
  openGraph: { ...OG_BASE, title, description, url: "/blog" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

export default function Page() {
  return (
    <>
      <SiteHeader active="blog" />
      <BlogPage />
      <SiteFooter />
    </>
  );
}

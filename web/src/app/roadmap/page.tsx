import type { Metadata } from "next";
import { RoadmapPage } from "@/components/roadmap/roadmap-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Roadmap: What's Live and What's Next";
const description =
  "DreamBuild is launching with a focused foundation and will expand through real use, member feedback, supplier connections, and broader vehicle support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/roadmap" },
  openGraph: { ...OG_BASE, title, description, url: "/roadmap" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

export default function Page() {
  return (
    <>
      <SiteHeader active="roadmap" />
      <RoadmapPage />
      <SiteFooter />
    </>
  );
}

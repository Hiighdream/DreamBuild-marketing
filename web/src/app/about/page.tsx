import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Why DreamBuild Exists";
const description =
  "Vehicle records, maintenance, parts research, and community shouldn't live in separate tools. See why DreamBuild is building one connected garage instead.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { ...OG_BASE, title, description, url: "/about" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

export default function Page() {
  return (
    <>
      <SiteHeader active="about" />
      <AboutPage />
      <SiteFooter />
    </>
  );
}

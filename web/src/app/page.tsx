import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "@/components/home/home-page";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_URL, LAUNCHLIST_SCRIPT_URL, OG_BASE, SITE_URL, TWITTER_IMAGES } from "@/lib/site";

const title = "DreamBuild | Everything Your Vehicle Needs, In One Garage";
const description =
  "DreamBuild is a connected digital garage for vehicle records, maintenance guidance, parts discovery, automotive events, and community — all in one place.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { ...OG_BASE, title, description, url: "/" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "DreamBuild",
      url: SITE_URL,
      description,
    },
    {
      "@type": "WebSite",
      name: "DreamBuild",
      url: SITE_URL,
    },
    {
      "@type": "SoftwareApplication",
      name: "DreamBuild",
      url: APP_URL,
      description,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <SiteHeader />
      <HomePage />
      <SiteFooter />
      <Script src={LAUNCHLIST_SCRIPT_URL} strategy="afterInteractive" />
    </>
  );
}

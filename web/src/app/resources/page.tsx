import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ResourcesPage } from "@/components/resources/resources-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, SITE_URL, TWITTER_IMAGES } from "@/lib/site";

const title = "Resources: Vehicle Maintenance & Ownership Guides";
const description =
  "Explore practical guides covering vehicle maintenance, service records, ownership, dashboard indicators, parts and fitment, events, and DreamBuild features.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources" },
  openGraph: { ...OG_BASE, title, description, url: "/resources" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <SiteHeader active="resources" />
      <ResourcesPage />
      <SiteFooter />
    </>
  );
}

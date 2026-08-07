import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Contact & Support";
const description =
  "Questions about the platform, account access, automotive partnerships, events, inventory, or media can be routed to the right place.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { ...OG_BASE, title, description, url: "/contact" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

export default function Page() {
  return (
    <>
      <SiteHeader active="contact" />
      <ContactPage />
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "This policy explains what information DreamBuild collects, why it is used, how it is protected, and the choices available to users.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  // TODO(legal): this page still contains placeholder copy pending final legal
  // review. Once approved legal text replaces the placeholders, remove this
  // `robots` override (restoring the default index,follow) and add "/privacy"
  // back into src/app/sitemap.ts.
  robots: { index: false, follow: true },
  openGraph: { ...OG_BASE, title, description, url: "/privacy" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

const SECTIONS = [
  "Information collected",
  "How information is used",
  "Account information",
  "Vehicle information",
  "Analytics",
  "Cookies",
  "Service providers",
  "Data retention",
  "Security",
  "User choices",
  "State privacy rights",
  "Children's privacy",
  "Policy changes",
  "Contact information",
].map((label, i) => ({ label, id: "pv-s" + i }));

export default function Page() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        eyebrow="PRIVACY AT DREAMBUILD"
        title="How DreamBuild handles information."
        intro="This policy explains what information DreamBuild collects, why it is used, how it is protected, and the choices available to users."
        sections={SECTIONS}
        contactHref="/contact"
        contactLabel="Contact DreamBuild about a privacy request →"
      />
      <SiteFooter />
    </>
  );
}

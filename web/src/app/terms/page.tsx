import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Terms of Service";
const description =
  "These terms explain the rules, responsibilities, limitations, and conditions that apply when using DreamBuild.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  // TODO(legal): this page still contains placeholder copy pending final legal
  // review. Once approved legal text replaces the placeholders, remove this
  // `robots` override (restoring the default index,follow) and add "/terms"
  // back into src/app/sitemap.ts.
  robots: { index: false, follow: true },
  openGraph: { ...OG_BASE, title, description, url: "/terms" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

const SECTIONS = [
  "Acceptance of terms",
  "Eligibility",
  "Accounts",
  "Acceptable use",
  "User content",
  "Community conduct",
  "Automotive information",
  "Leroy limitations",
  "Part-fitment limitations",
  "Purchases and subscriptions",
  "Third-party services",
  "Intellectual property",
  "Disclaimers",
  "Limitation of liability",
  "Termination",
  "Dispute terms",
  "Changes",
].map((label, i) => ({ label, id: "tm-s" + i }));

export default function Page() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        eyebrow="DREAMBUILD TERMS"
        title="The terms for using DreamBuild."
        intro="These terms explain the rules, responsibilities, limitations, and conditions that apply when using DreamBuild."
        sections={SECTIONS}
        contactHref="/contact"
        contactLabel="Contact DreamBuild about these terms →"
        keyPoints="Key product-specific points these terms will cover: Leroy is informational and not a replacement for professional diagnosis; users must verify parts compatibility; DreamBuild does not guarantee supplier data; planned features are not guaranteed."
      />
      <SiteFooter />
    </>
  );
}

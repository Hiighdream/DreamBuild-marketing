import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { extractLegalToc } from "@/lib/legal/extract-toc";
import {
  TERMS_OF_SERVICE_EFFECTIVE_DATE,
  TERMS_OF_SERVICE_LAST_UPDATED,
  TERMS_OF_SERVICE_MARKDOWN,
  TERMS_OF_SERVICE_TITLE,
} from "@/lib/legal/terms-of-service";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Terms of Service";
const description =
  "These terms explain the rules, responsibilities, limitations, and conditions that apply when using DreamBuild.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { ...OG_BASE, title, description, url: "/terms" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

const SECTIONS = extractLegalToc(TERMS_OF_SERVICE_MARKDOWN);

export default function Page() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        eyebrow="DREAMBUILD TERMS"
        title={TERMS_OF_SERVICE_TITLE}
        intro="These terms explain the rules, responsibilities, limitations, and conditions that apply when using DreamBuild."
        sections={SECTIONS}
        contactHref="/contact"
        contactLabel="Contact DreamBuild about these terms →"
        effectiveDate={TERMS_OF_SERVICE_EFFECTIVE_DATE}
        lastUpdatedDate={TERMS_OF_SERVICE_LAST_UPDATED}
        bodyMarkdown={TERMS_OF_SERVICE_MARKDOWN}
      />
      <SiteFooter />
    </>
  );
}

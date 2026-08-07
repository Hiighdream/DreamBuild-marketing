import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { extractLegalToc } from "@/lib/legal/extract-toc";
import {
  PRIVACY_POLICY_EFFECTIVE_DATE,
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_MARKDOWN,
  PRIVACY_POLICY_TITLE,
} from "@/lib/legal/privacy-policy";
import { OG_BASE, TWITTER_IMAGES } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "This policy explains what information DreamBuild collects, why it is used, how it is protected, and the choices available to users.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { ...OG_BASE, title, description, url: "/privacy" },
  twitter: { card: "summary_large_image", title, description, images: TWITTER_IMAGES },
};

const SECTIONS = extractLegalToc(PRIVACY_POLICY_MARKDOWN);

export default function Page() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        eyebrow="PRIVACY AT DREAMBUILD"
        title={PRIVACY_POLICY_TITLE}
        intro="This policy explains what information DreamBuild collects, why it is used, how it is protected, and the choices available to users."
        sections={SECTIONS}
        contactHref="/contact"
        contactLabel="Contact DreamBuild about a privacy request →"
        effectiveDate={PRIVACY_POLICY_EFFECTIVE_DATE}
        lastUpdatedDate={PRIVACY_POLICY_LAST_UPDATED}
        bodyMarkdown={PRIVACY_POLICY_MARKDOWN}
      />
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DreamBuild Terms of Service",
  description:
    "These terms explain the rules, responsibilities, limitations, and conditions that apply when using DreamBuild.",
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

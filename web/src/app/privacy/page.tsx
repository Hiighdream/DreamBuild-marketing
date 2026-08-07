import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DreamBuild Privacy Policy",
  description:
    "This policy explains what information DreamBuild collects, why it is used, how it is protected, and the choices available to users.",
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

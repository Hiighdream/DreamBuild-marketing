import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact DreamBuild | Product, Support and Partnerships",
  description:
    "Questions about the platform, account access, automotive partnerships, events, inventory, or media can be routed to the right place.",
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

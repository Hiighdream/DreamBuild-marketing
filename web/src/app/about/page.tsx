import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About DreamBuild | Building the Connected Garage",
  description:
    "Service records, maintenance reminders, parts research, automotive resources, events, and community are scattered across separate tools. DreamBuild is being created to bring those experiences into one connected garage.",
};

export default function Page() {
  return (
    <>
      <SiteHeader active="about" />
      <AboutPage />
      <SiteFooter />
    </>
  );
}

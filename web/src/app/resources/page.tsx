import type { Metadata } from "next";
import { ResourcesPage } from "@/components/resources/resources-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DreamBuild Resources | Vehicle Maintenance and Ownership Guides",
  description:
    "Explore practical guides covering vehicle maintenance, service records, ownership, dashboard indicators, parts and fitment, events, and DreamBuild features.",
};

export default function Page() {
  return (
    <>
      <SiteHeader active="resources" />
      <ResourcesPage />
      <SiteFooter />
    </>
  );
}

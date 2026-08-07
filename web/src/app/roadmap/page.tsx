import type { Metadata } from "next";
import { RoadmapPage } from "@/components/roadmap/roadmap-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DreamBuild Roadmap | What's Available and What's Next",
  description:
    "DreamBuild is launching with a focused foundation and will expand through real use, member feedback, supplier connections, and broader vehicle support.",
};

export default function Page() {
  return (
    <>
      <SiteHeader active="roadmap" />
      <RoadmapPage />
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "DreamBuild | Everything Your Vehicle Needs, In One Garage",
  description:
    "DreamBuild brings vehicle information, service history, maintenance guidance, parts discovery, automotive events, local resources, and community into one connected platform.",
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
    </>
  );
}

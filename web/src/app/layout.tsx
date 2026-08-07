import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { OG_BASE, SITE_NAME, SITE_URL, TWITTER_IMAGES } from "@/lib/site";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const description = "Everything your vehicle needs, in one garage.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | DreamBuild",
  },
  description,
  openGraph: {
    ...OG_BASE,
    title: SITE_NAME,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description,
    images: TWITTER_IMAGES,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1A2F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

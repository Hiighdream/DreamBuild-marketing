import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/resources/article-page";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllArticleSlugs, getArticle } from "@/lib/articles";
import { OG_BASE, SITE_URL, TWITTER_IMAGES } from "@/lib/site";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const canonical = `/resources/${slug}`;
  const description =
    article.status === "published" ? article.summary : `${article.title} — full guide coming soon.`;

  return {
    title: article.title,
    description,
    alternates: { canonical },
    // Pending "Coming soon" stubs have no unique content yet — keep them out
    // of search results (but still crawlable/linkable) until they're written.
    ...(article.status === "pending" ? { robots: { index: false, follow: true } } : {}),
    openGraph: { ...OG_BASE, title: article.title, description, url: canonical },
    twitter: { card: "summary_large_image", title: article.title, description, images: TWITTER_IMAGES },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleUrl = `${SITE_URL}/resources/${slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE_URL}/resources` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  // Article schema only where there's real article content — not on
  // "Coming soon" stubs. Dates are omitted entirely: the data model only
  // has month/year strings ("Aug 2026"), not exact dates, and datePublished/
  // dateModified should not be approximated.
  const articleJsonLd =
    article.status === "published"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          articleSection: article.category,
          inLanguage: "en",
          author: { "@type": "Organization", name: article.author },
          ...(article.reviewer
            ? { contributor: { "@type": "Organization", name: article.reviewer } }
            : {}),
          publisher: { "@type": "Organization", name: "DreamBuild" },
          mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
          ...(article.heroImageSrc ? { image: [`${SITE_URL}${article.heroImageSrc}`] } : {}),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {articleJsonLd && <JsonLd data={articleJsonLd} />}
      <SiteHeader active="resources" />
      <ArticlePage article={article} />
      <SiteFooter />
    </>
  );
}

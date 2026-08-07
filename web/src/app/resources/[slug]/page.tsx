import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/resources/article-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllArticleSlugs, getArticle } from "@/lib/articles";

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
  return {
    title: `${article.title} | DreamBuild Guides`,
    description: article.status === "published" ? article.summary : `${article.title} — full guide coming soon.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <SiteHeader active="resources" />
      <ArticlePage article={article} />
      <SiteFooter />
    </>
  );
}

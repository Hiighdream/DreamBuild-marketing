import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

/**
 * Both /privacy and /terms were temporarily excluded while they contained
 * placeholder legal copy; both are back now that their approved policies
 * are implemented. Pending "Coming soon" article stubs are excluded the
 * same way they're excluded from indexing: only published articles are
 * listed here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/roadmap`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const publishedArticleRoutes: MetadataRoute.Sitemap = getAllArticles()
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: `${SITE_URL}/resources/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...publishedArticleRoutes];
}

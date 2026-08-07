import { getAllArticles } from "@/lib/articles";

export const CATEGORIES = [
  "Vehicle maintenance",
  "Service records",
  "Dashboard indicators",
  "Vehicle ownership",
  "Parts and fitment",
  "Automotive events",
  "DreamBuild guides",
  "Leroy guidance",
];

/** "Recently updated" grid = every approved guide title except the separately-featured one. */
export const GUIDES = getAllArticles()
  .filter((a) => a.slug !== "what-is-a-digital-garage")
  .map((a) => ({
    slug: a.slug,
    category: a.category,
    title: a.title,
    status: a.status,
    placeholder: a.category + " — article image",
  }));

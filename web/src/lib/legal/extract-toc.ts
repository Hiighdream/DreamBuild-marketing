import GithubSlugger from "github-slugger";

export type LegalTocEntry = { id: string; label: string };

/**
 * Extracts "## " (H2) headings from a legal-policy Markdown body and slugs
 * them with the same algorithm `rehype-slug` uses at render time (both rely
 * on github-slugger with default options), so the sidebar table of contents
 * always matches the ids actually rendered on the page.
 */
export function extractLegalToc(markdown: string): LegalTocEntry[] {
  const slugger = new GithubSlugger();
  const headingLines = markdown.match(/^## (.+)$/gm) ?? [];
  return headingLines.map((line) => {
    const label = line.replace(/^## /, "").trim();
    return { id: slugger.slug(label), label };
  });
}

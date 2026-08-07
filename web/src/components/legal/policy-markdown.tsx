import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";

const components: Components = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 22,
        color: "#F4F6F8",
        margin: "48px 0 14px",
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 17,
        color: "#F4F6F8",
        margin: "28px 0 10px",
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => <p style={{ margin: "0 0 16px" }}>{children}</p>,
  ul: ({ children }) => <ul style={{ margin: "0 0 20px", paddingLeft: 20 }}>{children}</ul>,
  li: ({ children }) => <li style={{ marginBottom: 6 }}>{children}</li>,
  strong: ({ children }) => <strong style={{ fontWeight: 700, color: "#F4F6F8" }}>{children}</strong>,
  // Section dividers are already expressed through heading spacing; a visual
  // <hr> on top of that would be redundant, so this suppresses rendering it
  // without touching the underlying "---" in the source content.
  hr: () => null,
};

/** Renders approved legal-policy Markdown with the site's existing legal-page typography. */
export function PolicyMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeSlug]} components={components}>
      {markdown}
    </ReactMarkdown>
  );
}

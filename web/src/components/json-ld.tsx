/**
 * Renders a JSON-LD <script> tag. `<` is escaped so a value containing a
 * literal "</script>" can't prematurely close the tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

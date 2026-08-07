import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import type { Article } from "@/lib/articles";
import { ArticleBlockView } from "./article-blocks";

const metaSpanStyle = { fontSize: 12, color: "#9BA9B8" };

function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 18 }}>
      <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0, fontSize: 12, color: "#5C7188" }}>
        <li>
          <Link href="/" style={{ color: "#5C7188", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/resources" style={{ color: "#5C7188", textDecoration: "none" }}>
            Resources
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" style={{ color: "#9BA9B8" }}>
          {title}
        </li>
      </ol>
    </nav>
  );
}

function FinalCta() {
  return (
    <section style={{ position: "relative", padding: "90px 8vw", background: "#060D18", textAlign: "center" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(24px, 3vw, 34px)",
          margin: "0 0 22px",
        }}
      >
        Keep your vehicle records together in a DreamBuild Bay.
      </h2>
      <Link
        href="/#final"
        style={{
          padding: "15px 28px",
          background: "#3DC9F7",
          color: "#0A1A2F",
          fontWeight: 700,
          fontSize: 14,
          borderRadius: 4,
          textDecoration: "none",
        }}
      >
        Create Your Garage
      </Link>
    </section>
  );
}

export function ArticlePage({ article }: { article: Article }) {
  if (article.status === "pending") {
    return (
      <div style={{ position: "relative", background: "#0A1A2F" }}>
        <section style={{ position: "relative", padding: "160px 8vw 60px", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
            <ImageSlot alt={article.heroImageAlt} placeholder={article.heroImageAlt} style={{ width: "100%", height: "100%" }} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10,26,47,0.85), rgba(10,26,47,0.97))",
            }}
          />
          <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
            <Breadcrumbs title={article.title} />
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#3DC9F7", marginBottom: 14 }}>
              {article.category}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(30px, 3.8vw, 46px)",
                margin: "0 0 16px",
                lineHeight: 1.1,
              }}
            >
              {article.title}
            </h1>
          </div>
        </section>

        <section style={{ padding: "0 8vw 100px" }}>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "20px 22px",
              background: "rgba(232,163,61,0.08)",
              border: "1px solid rgba(232,163,61,0.3)",
              borderRadius: 8,
              fontSize: 14,
              color: "#E8C89A",
            }}
          >
            <strong style={{ color: "#E8A33D" }}>Coming soon:</strong> this guide&rsquo;s full content has not
            been written yet. Author, review, publish date, and reading time will be added when it is.
          </div>
        </section>

        <FinalCta />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      {/* HEADER */}
      <section style={{ position: "relative", padding: "160px 8vw 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
          <ImageSlot
            src={article.heroImageSrc}
            alt={article.heroImageAlt}
            placeholder={article.heroImageAlt}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,26,47,0.85), rgba(10,26,47,0.97))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <Breadcrumbs title={article.title} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#3DC9F7", marginBottom: 14 }}>
            {article.category}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 3.8vw, 46px)",
              margin: "0 0 16px",
              lineHeight: 1.1,
            }}
          >
            {article.title}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#C7D1DB", margin: "0 0 20px" }}>{article.summary}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "#9BA9B8" }}>
            <span style={metaSpanStyle}>By {article.author}</span>
            {article.reviewer && (
              <>
                <span>·</span>
                <span style={metaSpanStyle}>Reviewed by {article.reviewer}</span>
              </>
            )}
            <span>·</span>
            <span style={metaSpanStyle}>Published {article.published}</span>
            <span>·</span>
            <span style={metaSpanStyle}>Updated {article.updated}</span>
            <span>·</span>
            <span style={metaSpanStyle}>{article.readingTime}</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section style={{ position: "relative", padding: "0 8vw 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,200px) minmax(0,1fr)", gap: 56 }}>
          <aside style={{ position: "sticky", top: 110, alignSelf: "start", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#9BA9B8", marginBottom: 4 }}>
              ON THIS PAGE
            </div>
            {article.toc.map((entry) => (
              <a key={entry.id} href={`#${entry.id}`} style={{ fontSize: 13, color: "#C7D1DB" }}>
                {entry.label}
              </a>
            ))}
            <div
              style={{
                marginTop: 16,
                padding: 14,
                background: "rgba(19,38,63,0.6)",
                border: "1px solid rgba(61,201,247,0.2)",
                borderRadius: 6,
                fontSize: 12,
                color: "#9BA9B8",
              }}
            >
              Related: <Link href="/#bays" style={{ fontSize: 12 }}>Garage Bays</Link>
            </div>
          </aside>
          <article style={{ maxWidth: 680, fontSize: 16, lineHeight: 1.75, color: "#DDE4EA" }}>
            {article.blocks.map((block, i) => (
              <ArticleBlockView key={i} block={block} first={i === 0} />
            ))}
            <div
              style={{
                marginTop: 36,
                padding: 16,
                background: "rgba(19,38,63,0.5)",
                borderRadius: 6,
                fontSize: 13,
                color: "#5C7188",
              }}
            >
              <strong style={{ color: "#9BA9B8" }}>Sources:</strong> {article.sources}{" "}
              <strong style={{ color: "#9BA9B8" }}>Last reviewed:</strong> {article.lastReviewed}.
            </div>
          </article>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ padding: "0 8vw 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, margin: "0 0 18px" }}>
            Related guides
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16 }}>
            {article.related.map((r) => (
              <Link
                key={r.title}
                href={`/resources/${r.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  padding: 16,
                  background: "rgba(19,38,63,0.5)",
                  border: "1px solid rgba(244,246,248,0.08)",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}

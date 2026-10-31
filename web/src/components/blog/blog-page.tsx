import { BlogEmbed } from "./blog-embed";

export function BlogPage() {
  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      <section style={{ padding: "180px 8vw 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#3DC9F7", marginBottom: 14 }}>
            DREAMBUILD BLOG
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 4vw, 52px)",
              margin: "0 0 18px",
            }}
          >
            Notes from the garage.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#C7D1DB", margin: 0 }}>
            Vehicle ownership, maintenance, parts, and the automotive community.
          </p>
        </div>
      </section>
      <section style={{ padding: "0 8vw 100px" }}>
        <BlogEmbed />
      </section>
    </div>
  );
}

import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/image-slot";
import type { ArticleBlock } from "@/lib/articles";

const h2Style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 24,
  margin: "32px 0 14px",
};

const h3Style: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 19,
  margin: "28px 0 12px",
};

export function ArticleBlockView({ block, first }: { block: ArticleBlock; first?: boolean }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 id={block.id} style={first ? { ...h2Style, margin: "0 0 14px" } : h2Style}>
          {block.text}
        </h2>
      ) : (
        <h3 id={block.id} style={h3Style}>
          {block.text}
        </h3>
      );

    case "paragraph":
      return <p>{block.text}</p>;

    case "list":
      return (
        <ul style={{ paddingLeft: 20, margin: "0 0 20px" }}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "definition":
      return (
        <div
          id={block.id}
          style={{
            padding: "20px 22px",
            background: "rgba(61,201,247,0.08)",
            border: "1px solid rgba(61,201,247,0.25)",
            borderRadius: 8,
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: "#3DC9F7", marginBottom: 8 }}>{block.question}</div>
          <p style={{ margin: 0, fontSize: 15, color: "#E8EEF3" }}>{block.answer}</p>
        </div>
      );

    case "warning":
      return (
        <div
          style={{
            padding: "16px 20px",
            background: "rgba(232,163,61,0.08)",
            border: "1px solid rgba(232,163,61,0.3)",
            borderRadius: 6,
            margin: "24px 0",
            fontSize: 14,
            color: "#E8C89A",
          }}
        >
          <strong style={{ color: "#E8A33D" }}>Note:</strong> {block.text}
        </div>
      );

    case "keyTakeaways":
      return (
        <div
          style={{
            padding: "18px 22px",
            background: "rgba(61,220,132,0.08)",
            border: "1px solid rgba(61,220,132,0.3)",
            borderRadius: 8,
            margin: "24px 0",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: "#3DDC84", marginBottom: 10 }}>
            KEY TAKEAWAYS
          </div>
          <ul style={{ paddingLeft: 20, margin: 0, fontSize: 15, color: "#E8EEF3" }}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "quote":
      return (
        <blockquote
          style={{
            margin: "28px 0",
            padding: "18px 22px",
            borderLeft: "3px solid #3DC9F7",
            background: "rgba(19,38,63,0.5)",
            fontStyle: "italic",
            color: "#C7D1DB",
          }}
        >
          &ldquo;{block.text}&rdquo;
        </blockquote>
      );

    case "table":
      return (
        <div style={{ margin: "24px 0" }}>
          <div style={{ overflowX: "auto", border: "1px solid rgba(244,246,248,0.1)", borderRadius: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        background: "rgba(19,38,63,0.8)",
                        color: "#9BA9B8",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid rgba(244,246,248,0.1)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "12px 16px",
                          color: "#DDE4EA",
                          borderBottom:
                            i === block.rows.length - 1 ? "none" : "1px solid rgba(244,246,248,0.06)",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <div style={{ fontSize: 12, color: "#5C7188", marginTop: 8 }}>{block.caption}</div>
          )}
        </div>
      );

    case "image":
      return (
        <figure style={{ margin: "28px 0" }}>
          <ImageSlot
            src={block.src}
            alt={block.alt}
            placeholder={block.alt}
            style={{ width: "100%", aspectRatio: "16/9" }}
            radius={8}
          />
          {block.caption && (
            <figcaption style={{ fontSize: 12, color: "#5C7188", marginTop: 8 }}>{block.caption}</figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

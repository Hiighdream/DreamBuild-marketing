import Link from "next/link";
import { ImageSlot } from "@/components/image-slot";
import { PolicyMarkdown } from "./policy-markdown";

export type LegalSection = { id: string; label: string };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  contactHref: string;
  contactLabel: string;
  keyPoints?: string;
  /** Real effective/last-updated dates. Omit while a policy is still placeholder
   * copy — the hero falls back to "pending legal review" and shows the
   * pending-review notice until both are supplied. */
  effectiveDate?: string;
  lastUpdatedDate?: string;
  /** Approved policy body as Markdown. When supplied, this replaces the
   * per-section placeholder text entirely; `sections` still drives the
   * sidebar table of contents. */
  bodyMarkdown?: string;
};

/**
 * Shared shell for the two legal pages (Privacy, Terms) — both are
 * structurally identical in the design (restrained, no scroll motion,
 * sticky section nav) and differ only in copy, section list, and whether
 * their body content has been approved yet (`bodyMarkdown`/dates supplied)
 * or is still placeholder copy pending legal review.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  contactHref,
  contactLabel,
  keyPoints,
  effectiveDate,
  lastUpdatedDate,
  bodyMarkdown,
}: LegalPageProps) {
  const isPending = !effectiveDate;
  return (
    <div style={{ position: "relative", background: "#0A1A2F" }}>
      <section style={{ position: "relative", padding: "160px 8vw 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
          <ImageSlot
            src="/images/legal/hero-silhouette.png"
            alt=""
            placeholder="Restrained vehicle silhouette / garage interior"
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,26,47,0.9), rgba(10,26,47,0.98))",
          }}
        />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#3DC9F7", marginBottom: 14 }}>
            {eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.6vw, 42px)",
              margin: "0 0 16px",
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#C7D1DB", margin: "0 0 16px" }}>{intro}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#5C7188" }}>
            <span>Effective date: {effectiveDate ?? "pending legal review"}</span>
            <span>·</span>
            <span>Last updated: {lastUpdatedDate ?? "pending legal review"}</span>
          </div>
          {isPending && (
            <div
              style={{
                marginTop: 18,
                padding: "12px 16px",
                background: "rgba(232,163,61,0.08)",
                border: "1px solid rgba(232,163,61,0.3)",
                borderRadius: 6,
                fontSize: 12,
                color: "#E8C89A",
              }}
            >
              This page shows placeholder structure and copy for design purposes. Final wording must
              be reviewed and approved against the actual policy before publication.
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: "0 8vw 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,220px) minmax(0,1fr)", gap: 56 }}>
          <aside style={{ position: "sticky", top: 110, alignSelf: "start", display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#9BA9B8", marginBottom: 4 }}>
              SECTIONS
            </div>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={{ fontSize: 13, color: "#C7D1DB" }}>
                {s.label}
              </a>
            ))}
          </aside>
          <article style={{ maxWidth: 680, fontSize: 15, lineHeight: 1.75, color: "#DDE4EA" }}>
            {keyPoints && (
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(61,201,247,0.08)",
                  border: "1px solid rgba(61,201,247,0.25)",
                  borderRadius: 6,
                  marginBottom: 28,
                  fontSize: 14,
                  color: "#C7D1DB",
                }}
              >
                {keyPoints}
              </div>
            )}
            {bodyMarkdown ? (
              <PolicyMarkdown markdown={bodyMarkdown} />
            ) : (
              sections.map((s) => (
                <div key={s.id} id={s.id} style={{ marginBottom: 36 }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 20,
                      margin: "0 0 10px",
                      color: "#F4F6F8",
                    }}
                  >
                    {s.label}
                  </h2>
                  <p style={{ margin: 0, color: "#9BA9B8" }}>Placeholder — pending final legal language for this section.</p>
                </div>
              ))
            )}
          </article>
        </div>
      </section>

      <section style={{ padding: "0 8vw 100px", textAlign: "center" }}>
        <Link href={contactHref} style={{ fontSize: 14 }}>
          {contactLabel}
        </Link>
      </section>
    </div>
  );
}

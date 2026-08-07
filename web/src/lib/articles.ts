export type ArticleBlock =
  | { type: "heading"; level: 2 | 3; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "definition"; id: string; question: string; answer: string }
  | { type: "warning"; text: string }
  | { type: "keyTakeaways"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "image"; src?: string; alt: string; caption?: string };

export type ArticleTocEntry = { id: string; label: string };

export type RelatedArticle = { title: string; slug: string };

type ArticleBase = {
  slug: string;
  category: string;
  title: string;
};

export type PublishedArticle = ArticleBase & {
  status: "published";
  summary: string;
  author: string;
  reviewer?: string;
  published: string;
  updated: string;
  readingTime: string;
  heroImageAlt: string;
  heroImageSrc?: string;
  toc: ArticleTocEntry[];
  blocks: ArticleBlock[];
  sources: string;
  lastReviewed: string;
  related: RelatedArticle[];
};

/**
 * A title from the brief's approved initial guide list that has a real page
 * (so hub cards link somewhere real and correctly titled) but no written
 * body yet. Every field that would require inventing content stays an
 * explicit "Pending" rather than a guess.
 */
export type PendingArticle = ArticleBase & {
  status: "pending";
  heroImageAlt: string;
};

export type Article = PublishedArticle | PendingArticle;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Only one real, editorially-written guide exists in the design handoff
 * ("What Is a Digital Garage?", the ResourceArticle.dc.html worked example).
 * The other 11 titles are the brief's approved "suggested initial guide
 * titles" — real titles and categories, each with its own page, but the
 * brief explicitly deferred writing their bodies ("Do not write the
 * complete articles during this design task"), so they render as clearly
 * marked pending pages rather than invented copy.
 */
const PUBLISHED: PublishedArticle[] = [
  {
    slug: "what-is-a-digital-garage",
    status: "published",
    category: "DREAMBUILD GUIDES",
    title: "What Is a Digital Garage?",
    summary:
      "An introduction to organizing vehicle information, records, and maintenance in one connected space.",
    author: "DreamBuild Editorial",
    reviewer: "DreamBuild Product",
    published: "Jul 2026",
    updated: "Aug 2026",
    readingTime: "6 min read",
    heroImageAlt: "Editorial hero: organized garage records / digital garage concept",
    toc: [
      { id: "definition", label: "A quick definition" },
      { id: "why-it-matters", label: "Why it matters" },
      { id: "what-it-includes", label: "What it typically includes" },
      { id: "getting-started", label: "Getting started" },
    ],
    blocks: [
      {
        type: "definition",
        id: "definition",
        question: "What is a digital garage?",
        answer:
          "A digital garage is an online space used to organize information about vehicles a person owns or manages. It can include specifications, service records, maintenance history, notes, saved products, and other ownership information.",
      },
      { type: "heading", level: 2, id: "why-it-matters", text: "Why it matters" },
      {
        type: "paragraph",
        text: "Most vehicle information ends up scattered — a receipt in a glove box, a reminder in a separate app, a parts search across browser tabs. A digital garage brings that information into one place, tied to the vehicle it belongs to.",
      },
      { type: "quote", text: "The most useful record is the one you can actually find when you need it." },
      { type: "heading", level: 2, id: "what-it-includes", text: "What it typically includes" },
      {
        type: "list",
        items: [
          "Vehicle specifications and identifying information",
          "Service and maintenance records",
          "Upcoming maintenance guidance",
          "Notes and saved parts or products",
          "Relevant local resources and events",
        ],
      },
      {
        type: "warning",
        text: "Guidance tools like Leroy provide informational context and do not replace professional inspection, diagnosis, or repair.",
      },
      { type: "heading", level: 2, id: "getting-started", text: "Getting started" },
      {
        type: "paragraph",
        text: "Most owners start by adding a vehicle, then filling in what they already know — recent services, mileage, and any existing records. From there, maintenance guidance and relevant resources build around that vehicle automatically.",
      },
    ],
    sources: "DreamBuild product documentation.",
    lastReviewed: "August 2026",
    related: [
      { title: "How to Keep Complete Vehicle Service Records", slug: "how-to-keep-complete-vehicle-service-records" },
      { title: "What to Record in a Vehicle Maintenance Log", slug: "what-to-record-in-a-vehicle-maintenance-log" },
      { title: "How DreamBuild's Digital Garage Works", slug: "how-dreambuilds-digital-garage-works" },
    ],
  },
];

/** [category, title][] — verbatim from the brief's "Suggested initial guide titles" and Resources.dc.html's guideMeta. */
const PENDING_META: [string, string][] = [
  ["Maintenance", "How to Keep Complete Vehicle Service Records"],
  ["Maintenance", "What to Record in a Vehicle Maintenance Log"],
  ["Maintenance", "How Vehicle Maintenance Schedules Work"],
  ["Parts & Fitment", "How to Find Parts Compatible With Your Vehicle"],
  ["Parts & Fitment", "Why VIN, Trim, and Drivetrain Matter for Fitment"],
  ["Leroy", "What an AI Automotive Assistant Can and Cannot Do"],
  ["Dashboard Indicators", "How to Understand Dashboard Warning Lights"],
  ["Ownership", "How to Organize Vehicle Receipts"],
  ["Ownership", "How to Prepare a Vehicle for a Road Trip"],
  ["Events", "How Automotive Event RSVP Platforms Work"],
  ["DreamBuild Guides", "How DreamBuild's Digital Garage Works"],
];

const PENDING: PendingArticle[] = PENDING_META.map(([category, title]) => ({
  slug: slugify(title),
  status: "pending",
  category,
  title,
  heroImageAlt: category + " — article image",
}));

const ARTICLES: Record<string, Article> = Object.fromEntries(
  [...PUBLISHED, ...PENDING].map((a) => [a.slug, a])
);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES[slug];
}

export function getAllArticleSlugs(): string[] {
  return Object.keys(ARTICLES);
}

export function getAllArticles(): Article[] {
  return [...PUBLISHED, ...PENDING];
}

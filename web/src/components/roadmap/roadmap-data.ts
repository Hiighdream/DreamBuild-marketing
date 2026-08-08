export type RoadmapMilestone = {
  id: string;
  number: string;
  statusLabel: string;
  title: string;
  items: string[];
};

/**
 * Transcribed verbatim from the approved Canva export
 * (public/images/roadmap/product-roadmap-overview.png) — this is the text
 * equivalent of that graphic's four milestone cards, kept as real DOM
 * content so the facts aren't accessible/indexable only as pixels.
 */
export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: "in-the-garage",
    number: "01",
    statusLabel: "AVAILABLE NOW",
    title: "In the Garage",
    items: [
      "Garage Bays",
      "Service Records",
      "Basic VIN Decoding",
      "Community",
      "Events + RSVP",
      "Basic 3D Vehicle Viewer",
      "Leroy Assistant v1",
    ],
  },
  {
    id: "ready-for-launch",
    number: "02",
    statusLabel: "8/2026",
    title: "Ready for Launch - Web",
    items: [
      "Wishlists",
      "Purchase History",
      "Shop Finder",
      "Expanded Events",
      "Maintenance Guides",
      "Service Reminders",
      "Regional 3D Hotspots",
      "Expanded 3D Vehicle Viewerr",
    ],
  },
  {
    id: "the-next-mile",
    number: "03",
    statusLabel: "NEXT",
    title: "The Next Mile",
    items: [
      "Parts Marketplace Supplier Partnerships",
      "Compatible Part Discovery",
      "Deeper Leroy Assistance",
      "Recalls + Vehicle Notes",
      "Mobile Experience",
    ],
  },
  {
    id: "beyond-the-horizon",
    number: "04",
    statusLabel: "FUTURE",
    title: "Beyond the Horizon",
    items: [
      "OBD Integration",
      "Vehicle Analytics",
      "Smarter Garage Intelligence",
      "Expanded Automotive Ecosystem",
    ],
  },
];

export const PRIORITY_INPUTS = [
  "Member feedback",
  "Product usage",
  "Vehicle coverage",
  "Supplier availability",
  "Technical readiness",
];

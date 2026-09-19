const rawProductId = import.meta.env.VITE_PAYHIP_PRODUCT_ID?.trim() ?? "";
const rawCheckoutUrl = import.meta.env.VITE_GUIDE_CHECKOUT_URL?.trim() ?? "";
const rawFreeProductId =
  import.meta.env.VITE_PAYHIP_FREE_PRODUCT_ID?.trim() ?? "";

export const GUIDE_PRICE_USD = 26;

export const GUIDE_TITLE = "The Rosacea Blueprint";

export const GUIDE_FACTS = [
  { key: "36", val: "pages, in three parts — understand, care, live" },
  { key: "3", val: "printable worksheets — triggers, tracker, derm checklist" },
  { key: "PDF", val: "instant download, yours to keep and print" },
] as const;

export const GUIDE_PREVIEW_PAGES = [
  {
    src: "/guide/preview-contents.png",
    label: "What's inside",
    num: "02",
  },
  {
    src: "/guide/preview-roseprint.png",
    label: "This is the roseprint",
    num: "03",
  },
  {
    src: "/guide/preview-types.png",
    label: "The four faces of rosacea",
    num: "08",
  },
  {
    src: "/guide/preview-myths.png",
    label: "Myths, and what's actually true",
    num: "09",
  },
] as const;

export type GuidePreviewPage = (typeof GUIDE_PREVIEW_PAGES)[number];

export const PAYHIP_PRODUCT_ID = rawProductId || undefined;

export const GUIDE_PRODUCT_URL = PAYHIP_PRODUCT_ID
  ? `https://payhip.com/b/${encodeURIComponent(PAYHIP_PRODUCT_ID)}`
  : undefined;

export const GUIDE_CHECKOUT_URL =
  rawCheckoutUrl ||
  (PAYHIP_PRODUCT_ID
    ? `https://payhip.com/buy?link=${encodeURIComponent(PAYHIP_PRODUCT_ID)}`
    : undefined);

export const isGuideCheckoutReady = Boolean(GUIDE_CHECKOUT_URL);

export function guidePurchaseUrl(source: GuideCtaSource): string | undefined {
  if (source === "hero") return GUIDE_PRODUCT_URL ?? GUIDE_CHECKOUT_URL;
  return GUIDE_CHECKOUT_URL;
}

export type GuideCtaSource =
  | "hero"
  | "nav"
  | "section"
  | "app"
  | "faq"
  | "footer"
  | "final-cta"
  | "free-section";

/* ── Free starter guide ─────────────────────────────────────────
   A $0 Payhip product: Payhip collects the email and delivers the PDF,
   so the site only has to link out to it. */

export const FREE_GUIDE_PRODUCT_ID = rawFreeProductId || "LzXQf";

export const FREE_GUIDE_TITLE = "The Calm Kit";

export const FREE_GUIDE_URL = `https://payhip.com/b/${encodeURIComponent(
  FREE_GUIDE_PRODUCT_ID,
)}`;

export const FREE_GUIDE_FACTS = [
  "Six gentle rituals for a calmer face — and not one of them goes on your skin",
  "8 pages of things you can do tonight, with what you already have at home",
  "One honest page on home remedies",
  "A tear-out checklist for tonight",
] as const;

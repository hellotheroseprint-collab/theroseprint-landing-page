const rawProductId = import.meta.env.VITE_PAYHIP_PRODUCT_ID?.trim() ?? "";
const rawCheckoutUrl = import.meta.env.VITE_GUIDE_CHECKOUT_URL?.trim() ?? "";

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

export const GUIDE_CHECKOUT_URL =
  rawCheckoutUrl ||
  (PAYHIP_PRODUCT_ID
    ? `https://payhip.com/buy?link=${encodeURIComponent(PAYHIP_PRODUCT_ID)}`
    : undefined);

export const isGuideCheckoutReady = Boolean(GUIDE_CHECKOUT_URL);

export type GuideCtaSource =
  | "hero"
  | "nav"
  | "section"
  | "app"
  | "faq"
  | "footer"
  | "final-cta";

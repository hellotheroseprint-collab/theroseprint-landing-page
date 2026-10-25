import {
  FREE_GUIDE_TITLE,
  GUIDE_PREVIEW_PAGES,
  GUIDE_PRICE_USD,
  GUIDE_TITLE,
} from "./guide";

export const NAV_LINKS = [
  { href: "#inside", label: "Look inside" },
  { href: "#parts", label: "The three parts" },
  { href: "#letter", label: "The author" },
  { href: "#start", label: "Free or full" },
] as const;

export const HERO_EYEBROW = "The Rosacea Blueprint";
export const HERO_EDITION = "Edition one";
export const HERO_LEDE =
  "A 36-page guide to understanding your rosacea — from someone who has lived with it for ten years, and been calm for four.";
export const HERO_PRICE_NOTE = "one-time · instant PDF";

export const MARQUEE_ITEMS = [
  "36 pages",
  "Three printable worksheets",
  "Instant PDF",
  "Written by someone who lives with it",
  "No subscription",
  "The science in plain language",
] as const;

export const STATS = [
  { n: "10", label: "years living with rosacea, tracked flare by flare" },
  { n: "4+", label: "years calm — and the routine that kept it there" },
  { n: "36", label: "pages, written down properly, in plain language" },
] as const;

export const PREVIEW_PAGES = GUIDE_PREVIEW_PAGES;

export const LOOK_INSIDE_EYEBROW = "Look inside";
export const LOOK_INSIDE_MORE_EYEBROW = "And 32 more";
export const LOOK_INSIDE_MORE_BODY =
  "The routine, the triggers, the printables.";

export const PARTS_EYEBROW = "Three parts · 36 pages";
export const PARTS_HELPER =
  "Read it start to finish, or go straight to what you need today.";

export const PARTS = [
  {
    id: "understand",
    num: "01",
    pre: "Underst",
    italic: "a",
    post: "nd",
    range: "03–13",
    blurb:
      "What rosacea actually is, its four faces, the myths worth dropping — and how to find your own triggers.",
    chapters: [
      { title: "What's rosacea, in simple terms", page: "07" },
      { title: "The four faces of rosacea", page: "08" },
      { title: "Myths, and what's actually true", page: "09" },
      { title: "The three layers that matter", page: "10" },
      { title: "Beyond the surface: nerves and gut", page: "11" },
      { title: "Trigger shortlist · worksheet", page: "13" },
    ],
  },
  {
    id: "care",
    num: "02",
    pre: "C",
    italic: "a",
    post: "re",
    range: "15–24",
    blurb:
      "The AM and PM routine that held, the ingredients to seek and skip, and the route I took without antibiotics.",
    chapters: [
      { title: "Your AM and PM routine", page: "15" },
      { title: "Ingredients to seek and skip", page: "16" },
      { title: "Your best allies · product picks", page: "17" },
      { title: "Makeup that has never turned on me", page: "19" },
      { title: "The route I took, without antibiotics", page: "21" },
      { title: "When rosacea reaches your eyes", page: "23" },
    ],
  },
  {
    id: "live",
    num: "03",
    pre: "L",
    italic: "i",
    post: "ve",
    range: "26–36",
    blurb:
      "Food, movement, stress and sleep — plus the tests worth asking for and what to bring to your dermatologist.",
    chapters: [
      { title: "Stress, food and sun", page: "26" },
      { title: "How I handle it: food, movement, sleep", page: "27" },
      { title: "Tests worth asking for", page: "31" },
      { title: "When the flare feels louder than you", page: "32" },
      { title: "Dermatologist checklist · printable", page: "33" },
      { title: "Flare-up tracker · printable", page: "34" },
    ],
  },
] as const;

export const LETTER_EYEBROW = "A letter to start · page 03";
export const LETTER_QUOTE_BEFORE =
  "I walked in expecting a regular Tuesday appointment. I walked out with a chronic skin condition — ";
export const LETTER_QUOTE_EMPHASIS = "for life.";
export const LETTER_BODY =
  "I won't promise your rosacea will be cured, and I won't claim to have your exact recipe — every skin is different. What I will share is everything I've learned in ten years: the science, the routine, and the practices that got my skin calm and kept it there.";
export const LETTER_SIGN = "— the roseprint";
export const LETTER_ROLE = "Founder";

export const START_EYEBROW = "Two ways to start";
export const START_FOOTNOTE =
  "Both are delivered by Payhip — neither requires the other.";
export const START_PAYHIP_NOTE = "Secure checkout via Payhip";

export const CALM_KICKER = "Free starter";
export const CALM_LEDE =
  "For the evenings when your skin is hot and you need it to stop. Six gentle rituals, with what you already have at home.";
export const CALM_PRICE = "Free";

export const BLUEPRINT_KICKER = "The full guide";
export const BLUEPRINT_LEDE =
  "The whole map — what rosacea is, the routine that held, the triggers worth testing first, and what to ask your dermatologist.";

export const COMPARE_ROWS = [
  { label: "Length", free: "8 pages", paid: "36 pages" },
  { label: "Calming rituals for tonight", free: "Included", paid: "Included" },
  { label: "AM / PM routine and ingredients", free: "—", paid: "Included" },
  { label: "Triggers, food, stress and sleep", free: "—", paid: "Included" },
  { label: "Product and makeup picks", free: "—", paid: "Included" },
  { label: "Printable worksheets", free: "1 checklist", paid: "3 worksheets" },
] as const;

export const APP_EYEBROW = "Coming soon · the app";
export const APP_LEDE =
  "The Roseprint app is a personal space to understand your rosacea over time. Join the waitlist to hear first.";
export const APP_NOTE = "Free to join. No spam, ever.";
export const APP_SCREEN_ALT = "Roseprint app home screen";

export const WAITLIST_SUCCESS_TITLE = "You're in!";
export const WAITLIST_SUCCESS_TEXT =
  "Check your inbox to confirm your spot on the waitlist.";
export const WAITLIST_ERROR = "Something went wrong. Please try again.";

export const FAQ_INTRO = "Something else? Write to";
export const FAQ_MAIL = "hello@theroseprint.com";

export const FAQS = [
  {
    q: `What exactly do I get for $${GUIDE_PRICE_USD}?`,
    a: "A 36-page PDF in three parts — understand, care, live — plus three printable worksheets. One-time payment, yours to keep and print.",
  },
  {
    q: "How do I get it after I pay?",
    a: "Checkout is handled by Payhip. You get an instant download after payment, and an email with the PDF.",
  },
  {
    q: "Is this a medical guide?",
    a: "No. It's one person's ten years with rosacea and the research behind it. It doesn't replace a dermatologist — the checklist helps you get more from your appointment.",
  },
  {
    q: "Can I get a refund?",
    a: "Because it's an instant digital download, all sales are final. Read the sample pages first, or start with the free Calm Kit.",
  },
  {
    q: "Is the app included?",
    a: "The app is still in development. Joining the waitlist is free and separate from the guide.",
  },
] as const;

export const CLOSING_LEDE =
  "Read it tonight. Print the worksheets tomorrow. Take the checklist to your next appointment.";
export const FOOTER_WORDMARK = "the roseprint.";
export const FOOTER_LINKS = [
  { href: "#top", label: GUIDE_TITLE },
  { href: "#start", label: FREE_GUIDE_TITLE },
  { href: `mailto:${FAQ_MAIL}`, label: FAQ_MAIL },
] as const;
export const FOOTER_LEGAL =
  "© 2026 The Roseprint. Not medical advice — always see a dermatologist for diagnosis and treatment.";

export const DOCK_NOTE = `$${GUIDE_PRICE_USD} · instant PDF`;
export const COVER_ALT = "The Rosacea Blueprint cover";
export const PRICE_LABEL = `$${GUIDE_PRICE_USD}`;
export const NAV_CTA = `$${GUIDE_PRICE_USD} · Get it`;
export const HERO_CTA = "Get the Blueprint →";
export const PAGES_CTA = `Get it — $${GUIDE_PRICE_USD}`;
export const BLUEPRINT_CTA = `Get the Blueprint — $${GUIDE_PRICE_USD}`;
export const CALM_CTA = "Get the free Calm Kit";

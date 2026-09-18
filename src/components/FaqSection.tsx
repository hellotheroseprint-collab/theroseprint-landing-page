import type { ReactNode } from "react";
import { track } from "../analytics/track";
import { GUIDE_PRICE_USD, GUIDE_TITLE } from "../config/guide";
import GuideBuyButton from "./GuideBuyButton";

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "What's the difference between the guide and the app?",
    a: "Two different products. The guide is a PDF playbook you can use on your own, today. The app is a tracking companion in early access — log flares, see patterns, and shape a routine over time.",
  },
  {
    q: "Can I get both?",
    a: "Yes. They work well together, and neither requires the other. Buy the guide, join the waitlist, or do both.",
  },
  {
    q: "What's in the guide?",
    a: (
      <>
        {GUIDE_TITLE} is 36 pages in three parts — understand, care, live —
        plus three printable worksheets (triggers, tracker, derm checklist).{" "}
        <a
          href="#guide"
          onClick={() => track("rp_guide_cta_click", { source: "faq" })}
        >
          See what&apos;s inside
        </a>
        .
      </>
    ),
  },
  {
    q: "How do I get the guide after I pay?",
    a: (
      <>
        Checkout opens on this page. After payment you get an instant download
        and an email with the PDF.{" "}
        <GuideBuyButton source="faq" variant="text">
          Get the guide — ${GUIDE_PRICE_USD}
        </GuideBuyButton>
      </>
    ),
  },
  {
    q: "What do I get if I join the waitlist?",
    a: "Early access invitations to the app, launch updates, and the chance to shape the product with feedback. Joining is free and separate from buying the guide.",
  },
  {
    q: "How will you use my email?",
    a: "Only for waitlist and launch-related messages. You can unsubscribe any time. Buying the guide does not sign you up for the waitlist.",
  },
  {
    q: "Is Roseprint a medical diagnosis?",
    a: "No. The guide and the app help you track and understand patterns; they don't replace a dermatologist. Always seek professional advice for diagnosis and treatment.",
  },
  {
    q: "Who is this for?",
    a: "Adults managing rosacea who want clearer patterns, fewer guesses, and a routine that fits their real life.",
  },
  {
    q: "Will there be a cost?",
    a: `The guide is $${GUIDE_PRICE_USD}, one-time. Joining the app waitlist is free. We'll share app pricing clearly before you commit to anything.`,
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="section section--faq">
      <div className="section__inner content-block">
        <h2 className="section__heading">Questions</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-item__summary">{item.q}</summary>
              <p className="faq-item__body">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

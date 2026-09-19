import GuideBuyButton from "./GuideBuyButton";
import { FREE_GUIDE_FACTS, FREE_GUIDE_TITLE } from "../config/guide";

export default function FreeGuideSection() {
  return (
    <section id="free-guide" className="section section--free-guide">
      <div className="section__inner free-guide-layout">
        <div className="free-guide-copy">
          <p className="guide-eyebrow">Free download</p>
          <h2 className="section__heading free-guide-heading">
            Not ready for the full guide? Start here.
          </h2>
          <p className="free-guide-lede">
            {FREE_GUIDE_TITLE} is for the evenings when your skin is hot and
            angry and you need it to stop. Six gentle rituals you can do
            tonight, with what you already have at home. Enter your email at
            checkout and the PDF arrives straight away.
          </p>

          <ul className="free-guide-list">
            {FREE_GUIDE_FACTS.map((fact) => (
              <li key={fact} className="free-guide-list__item">
                {fact}
              </li>
            ))}
          </ul>

          <div className="free-guide-buyrow">
            <GuideBuyButton source="free-section" product="free">
              Get the free guide &rarr;
            </GuideBuyButton>
            <p className="guide-price">
              <span className="guide-price__amount">Free</span>
              <span className="guide-price__meta">PDF, no payment needed</span>
            </p>
          </div>
          <p className="guide-microcopy">
            Delivered by Payhip &mdash; all you need is an email address.
          </p>
        </div>

        <div className="free-guide-visual">
          <div className="fkit">
            <div className="fkit__sheet fkit__sheet--back" aria-hidden="true" />
            <div className="fkit__sheet fkit__sheet--mid" aria-hidden="true" />
            <img
              src="/guide/calm-kit-cover.jpg"
              alt={`${FREE_GUIDE_TITLE} cover`}
              className="fkit__cover"
              width={792}
              height={1024}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

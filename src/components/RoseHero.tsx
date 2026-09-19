import GuideBuyButton from "./GuideBuyButton";
import { track } from "../analytics/track";
import { GUIDE_PRICE_USD } from "../config/guide";

export default function RoseHero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-roses" aria-hidden="true">
        <div className="hero-rose hero-rose--a">
          <img src="/rose-solid.svg" alt="" className="hero-rose__img" />
        </div>
        <div className="hero-rose hero-rose--b">
          <img src="/rose-outline.svg" alt="" className="hero-rose__img" />
        </div>
      </div>

      <div className="hero-main">
        <div className="hero-intro">
          <p className="hero-eyebrow">The Roseprint</p>
          <h1 className="hero-title">Rosacea is more than redness.</h1>
          <p className="hero-subtitle">
            Understand your skin. Track what affects it. Find a more informed
            way forward.
          </p>
          <p className="hero-lede">
            The Roseprint is building practical, evidence-informed resources
            and tools for people living with rosacea.
          </p>

          <div className="hero-actions">
            <GuideBuyButton source="hero">
              Get the Rosacea Guide &rarr;
            </GuideBuyButton>
            <p className="hero-price">
              <span className="hero-price__amount">${GUIDE_PRICE_USD}</span>
              <span className="hero-price__meta">one-time · instant PDF</span>
            </p>
          </div>

          <p className="hero-alt">
            <span className="hero-alt__lead">Not ready yet?</span>{" "}
            <a
              href="#free-guide"
              onClick={() => track("rp_free_guide_cta_click", { source: "hero" })}
            >
              Start with the free guide &rarr;
            </a>
          </p>

          <p className="hero-microcopy">
            Free resources &middot; Practical tools &middot; App coming soon
          </p>
        </div>
      </div>
      <a
        href="#guide"
        className="scroll-indicator scroll-indicator--visible"
        aria-label="Scroll to learn more"
        onClick={() => track("rp_hero_scroll_click")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}

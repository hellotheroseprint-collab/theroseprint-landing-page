import KitEmbed from "./KitEmbed";
import GuideBuyButton from "./GuideBuyButton";
import { track } from "../analytics/track";
import { GUIDE_PRICE_USD, GUIDE_TITLE } from "../config/guide";

export default function RoseHero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-main hero-main--products">
        <div className="hero-intro">
          <h1 className="hero-title">
            Tired of guessing what triggers your flares?
          </h1>
          <p className="hero-subtitle">
            Roseprint makes two things for people with rosacea: a guide you can
            use tonight, and an app that tracks your skin over time. You can
            get both.
          </p>
        </div>

        <div id="products" className="product-cards">
          <article
            className="product-card product-card--guide"
            aria-labelledby="product-guide-title"
          >
            <p className="product-card__eyebrow">
              <span className="product-card__dot" aria-hidden />
              Available now
            </p>
            <h2 id="product-guide-title" className="product-card__title">
              The guide
            </h2>
            <p className="product-card__body">
              {GUIDE_TITLE} &mdash; a practical playbook you keep forever.
              Instant PDF, yours whether or not you join the app.
            </p>
            <div className="product-card__action">
              <p className="product-card__price">
                <span className="product-card__price-amount">
                  ${GUIDE_PRICE_USD}
                </span>
                <span className="product-card__price-meta">one-time</span>
              </p>
              <GuideBuyButton source="hero" />
            </div>
            <div className="product-card__foot">
              <p className="product-card__micro">
                Secure checkout. Instant download.
              </p>
              <a
                href="#guide"
                className="product-card__more"
                onClick={() => track("rp_guide_cta_click", { source: "hero" })}
              >
                See what&apos;s inside
              </a>
            </div>
          </article>

          <article
            id="waitlist"
            className="product-card product-card--app"
            aria-labelledby="product-app-title"
          >
            <p className="product-card__eyebrow">Early access</p>
            <h2 id="product-app-title" className="product-card__title">
              The app
            </h2>
            <p className="product-card__body">
              Log flares, spot patterns, and build a routine that fits your
              real life. Join the waitlist &mdash; free.
            </p>
            <div className="product-card__action">
              <KitEmbed />
            </div>
            <div className="product-card__foot">
              <p className="product-card__micro">
                Free to join. No spam, ever.
              </p>
              <a href="#app" className="product-card__more">
                See how the app works
              </a>
            </div>
          </article>
        </div>
      </div>
      <a
        href="#empathy"
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

import KitEmbed from "./KitEmbed";
import { track } from "../analytics/track";

export default function RoseHero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-main">
        <div className="hero-content">
          <h1 className="hero-title">
            Tired of guessing what triggers your flares?
          </h1>
          <p className="hero-subtitle">
            Roseprint helps you uncover patterns and feel in control of your
            skin&nbsp;&mdash; finally.
          </p>
          <div className="hero-form-wrap">
            <KitEmbed />
          </div>
          <p className="hero-microcopy">Free to join. No spam, ever.</p>
        </div>
        <div className="hero-visual">
          <div className="phone-frame">
            <div className="phone-frame__screen">
              <img
                src="/app-preview.png"
                alt="Roseprint app home screen showing daily tips and skin log"
                className="phone-frame__screenshot"
              />
            </div>
          </div>
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

import { useState, useCallback, useEffect } from "react";
import RoseHero from "./components/RoseHero";
import RoseIcon from "./components/RoseIcon";
import PhonePreview from "./components/PhonePreview";
import GuideSection from "./components/GuideSection";
import FreeGuideSection from "./components/FreeGuideSection";
import GuideBuyButton from "./components/GuideBuyButton";
import KitEmbed from "./components/KitEmbed";
import FaqSection from "./components/FaqSection";
import KitModal, { useKitModalTimer } from "./components/KitModal";
import { useLandingAnalytics } from "./hooks/useLandingAnalytics";
import { track } from "./analytics/track";
import { FREE_GUIDE_TITLE, GUIDE_PRICE_USD } from "./config/guide";

export default function App() {
  useLandingAnalytics();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const { start, triggerFromClick } = useKitModalTimer();

  useEffect(() => {
    return start(openModal);
  }, [start, openModal]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__inner">
          <div className="navbar__left">
            <a href="#hero" className="navbar__brand" aria-label="Go to top">
              <RoseIcon variant="pink" size={24} />
              <span className="navbar__text">the roseprint.</span>
            </a>
          </div>
          <div className="navbar__center" aria-label="Primary navigation">
            <a
              href="#guide"
              className="navbar__link navbar__link--primary"
              onClick={() => track("rp_guide_cta_click", { source: "nav" })}
            >
              The guide
            </a>
            <a
              href="#free-guide"
              className="navbar__link"
              onClick={() =>
                track("rp_free_guide_cta_click", { source: "nav" })
              }
            >
              Free guide
            </a>
            <a href="#app" className="navbar__link">
              The app
            </a>
            <a href="#faq" className="navbar__link">
              FAQ
            </a>
          </div>
          <div className="navbar__right">
            <GuideBuyButton source="nav" variant="text" className="navbar__cta">
              Get the guide
            </GuideBuyButton>
          </div>
        </div>
      </nav>

      <RoseHero />

      <GuideSection />

      <FreeGuideSection />

      <section id="app" className="section section--how">
        <div className="section__inner app-layout">
          <div className="app-copy">
            <p className="guide-eyebrow">Coming soon</p>
            <h2 className="section__heading">Something bigger is coming.</h2>
            <p className="app-lede">
              The Roseprint app is a personal space to help you understand your
              rosacea over time &mdash; from tracking symptoms and potential
              triggers to making sense of your patterns.
            </p>
            <ol className="how-steps">
              <li className="how-step">
                <h3 className="how-step__title">
                  See your full skin story in one place
                </h3>
                <p className="how-step__body">
                  Stop scattered notes and blurry camera-roll photos. Log
                  flare-ups, products, stress, and sleep in seconds &mdash; so
                  nothing gets lost.
                </p>
              </li>
              <li className="how-step">
                <h3 className="how-step__title">Finally connect the dots</h3>
                <p className="how-step__body">
                  The Roseprint surfaces trends between your daily life and
                  your skin, so you stop guessing and start understanding what
                  actually matters.
                </p>
              </li>
              <li className="how-step">
                <h3 className="how-step__title">
                  Know what to do next &mdash; not just what to avoid
                </h3>
                <p className="how-step__body">
                  Turn real insights into a simple routine you can actually
                  follow &mdash; and adjust as your skin changes.
                </p>
              </li>
            </ol>

            <div id="waitlist" className="app-waitlist">
              <h3 className="app-waitlist__title">Join the waitlist</h3>
              <p className="app-waitlist__sub">
                Be the first to know when the app launches, and get occasional
                research-informed resources and updates from The Roseprint.
              </p>
              <KitEmbed />
              <p className="app-waitlist-note">
                Free to join. Unsubscribe any time. This is separate from the
                guides &mdash; you can{" "}
                <a
                  href="#guide"
                  onClick={() => track("rp_guide_cta_click", { source: "app" })}
                >
                  get the guide
                </a>{" "}
                without joining.
              </p>
            </div>
          </div>
          <div className="app-visual">
            <PhonePreview />
          </div>
        </div>
      </section>

      <section id="mission" className="section section--mission">
        <div className="section__inner content-block">
          <h2 className="section__heading">
            Rosacea can feel confusing. It shouldn&apos;t have to.
          </h2>
          <div className="section__body">
            <p>
              You don&apos;t need another endless list of skincare products or
              conflicting advice. Most people spend years piecing together
              forums, friends, and trial-and-error &mdash; never quite sure
              what&apos;s helping and what&apos;s making things worse.
            </p>
            <p>
              The Roseprint is being built to bring together practical
              information, personal tracking, and tools that make living with
              rosacea a little easier.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />

      <section id="final-cta" className="section section--final-cta">
        <div className="section__inner final-cta-inner">
          <h2 className="final-cta__heading">Start where you are</h2>
          <p className="final-cta__sub">
            Get the full guide tonight, or start free &mdash; neither requires
            the other.
          </p>
          <div className="final-cta-actions">
            <GuideBuyButton source="final-cta" variant="on-dark">
              Get the guide — ${GUIDE_PRICE_USD}
            </GuideBuyButton>
          </div>
          <p className="final-cta__alt">
            <GuideBuyButton
              source="final-cta"
              product="free"
              variant="text"
            >
              Or get {FREE_GUIDE_TITLE} — free &rarr;
            </GuideBuyButton>
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">the roseprint.</div>
          <div className="footer__columns">
            <div className="footer__column">
              <h4>Guides</h4>
              <ul>
                <li>
                  <GuideBuyButton source="footer" variant="text">
                    The Rosacea Blueprint — ${GUIDE_PRICE_USD}
                  </GuideBuyButton>
                </li>
                <li>
                  <GuideBuyButton source="footer" product="free" variant="text">
                    {FREE_GUIDE_TITLE} — free
                  </GuideBuyButton>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>The app</h4>
              <ul>
                <li>
                  <a href="#app">How it works</a>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer__link-btn"
                    onClick={() => triggerFromClick(openModal)}
                  >
                    Join the waitlist
                  </button>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:hello@theroseprint.com">
                    hello@theroseprint.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="footer__divider" />
          <p className="footer__copyright">
            &copy; 2026 The Roseprint. All rights reserved.
          </p>
        </div>
      </footer>

      <KitModal open={modalOpen} onClose={closeModal} />
    </>
  );
}

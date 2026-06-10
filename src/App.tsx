import { useState, useCallback, useEffect } from "react";
import RoseHero from "./components/RoseHero";
import RoseIcon from "./components/RoseIcon";
import FaqSection from "./components/FaqSection";
import KitModal, { useKitModalTimer } from "./components/KitModal";
import { useLandingAnalytics } from "./hooks/useLandingAnalytics";

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
            <a href="#how-it-works" className="navbar__link navbar__link--primary">
              How it works
            </a>
            <a href="#faq" className="navbar__link">
              FAQ
            </a>
          </div>
          <div className="navbar__right">
            <button
              type="button"
              className="navbar__cta"
              onClick={() => triggerFromClick(openModal)}
            >
              Get early access
            </button>
          </div>
        </div>
      </nav>

      <RoseHero />
      <section id="empathy" className="section section--empathy">
        <div className="section__inner content-block">
          <h2 className="section__heading">
            You&apos;re not imagining it &mdash; rosacea is exhausting
          </h2>
          <div className="section__body">
            <p>
              It shows up on your face, but it affects your confidence, your
              plans, and how you move through the world. Most people spend years
              piecing together advice from forums, friends, and trial-and-error
              &mdash; never quite sure what&apos;s helping and what&apos;s making
              things worse.
            </p>
            <p>
              We&apos;re building Roseprint alongside people who live with
              rosacea &mdash; not as another generic skincare app, but as a calm,
              clear way to finally understand your skin over time.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section--how">
        <div className="section__inner">
          <h2 className="section__heading">How it works</h2>
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
              <h3 className="how-step__title">
                Finally connect the dots
              </h3>
              <p className="how-step__body">
                Roseprint surfaces trends between your daily life and your skin,
                so you stop guessing and start understanding what actually
                matters.
              </p>
            </li>
            <li className="how-step">
              <h3 className="how-step__title">
                Know what to do next &mdash; not just what to avoid
              </h3>
              <p className="how-step__body">
                Turn real insights into a simple routine you can actually follow
                &mdash; and adjust as your skin changes.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <FaqSection />

      <section id="final-cta" className="section section--final-cta">
        <div className="section__inner final-cta-inner">
          <h2 className="final-cta__heading">Ready for calmer, clearer skin?</h2>
          <p className="final-cta__sub">
            Join the waitlist and be first in line when we open early access.
          </p>
          <button
            type="button"
            className="final-cta__button"
            onClick={() => triggerFromClick(openModal)}
          >
            Get early access
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">the roseprint.</div>
          <div className="footer__columns">
            <div className="footer__column">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a href="#how-it-works">How it works</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>Get started</h4>
              <ul>
                <li>
                  <button
                    type="button"
                    className="footer__link-btn"
                    onClick={() => triggerFromClick(openModal)}
                  >
                    Get early access
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:hello@theroseprint.com">hello@theroseprint.com</a>
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

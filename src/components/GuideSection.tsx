import { useCallback, useState } from "react";
import GuideBuyButton from "./GuideBuyButton";
import GuideLightbox from "./GuideLightbox";
import { track } from "../analytics/track";
import {
  GUIDE_FACTS,
  GUIDE_PREVIEW_PAGES,
  GUIDE_PRICE_USD,
  GUIDE_TITLE,
} from "../config/guide";

function GuideBookMockup() {
  return (
    <div className="rbook" aria-hidden="true">
      <div className="rbook__vol">
        <div className="rbook__shadow" />
        <div className="rbook__back" />

        <div className="rbook__spine">
          <div className="rbook__joint rbook__joint--front" />
          <div className="rbook__joint rbook__joint--back" />
          <div className="rbook__crease rbook__crease--front" />
          <div className="rbook__crease rbook__crease--back" />
          <div className="rbook__spineInner">
            <p className="rbook__spineTitle">The Rosacea Blueprint</p>
            <div className="rbook__spineFoot">
              <p className="rbook__spineMark">the roseprint.</p>
              <img src="/guide/rose-mark-white.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="rbook__edge rbook__edge--fore" />
        <div className="rbook__edge rbook__edge--top" />
        <div className="rbook__edge rbook__edge--bottom" />

        <div className="rbook__front">
          <div className="rbook__cover">
            <div className="rbook__top">
              <div className="rbook__lockup">
                <img src="/guide/rose-mark-deep-rose.svg" alt="" />
                <span className="rbook__wordmark">the roseprint.</span>
              </div>
              <span className="rbook__edition">Edition one</span>
            </div>
            <div>
              <h2 className="rbook__title">
                The
                <br />
                Rosacea
                <br />
                Blueprint
              </h2>
              <p className="rbook__sub">A guide to getting to know your skin</p>
              <div className="rbook__note">
                <div className="rbook__noteRule" />
                <p>
                  Ten years of flare-tracking, the routine that held, and the
                  science in plain language.
                </p>
              </div>
            </div>
          </div>
          <div className="rbook__hinge" />
          <div className="rbook__hingeline" />
          <div className="rbook__sheen" />
          <div className="rbook__inset" />
        </div>
      </div>
    </div>
  );
}

export default function GuideSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const stepLightbox = useCallback((delta: number) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      const len = GUIDE_PREVIEW_PAGES.length;
      return (current + delta + len) % len;
    });
  }, []);

  return (
    <>
      <section id="guide" className="section section--guide">
        <div className="section__inner guide-layout">
          <div className="guide-copy">
            <p className="guide-eyebrow">The guide</p>
            <h2 className="section__heading guide-heading">{GUIDE_TITLE}</h2>
            <p className="guide-lede">
              Ten years of living with rosacea, written down properly — the
              science in plain language, the routine that held, the triggers
              worth testing first, and the printables you can take to your
              dermatologist.
            </p>
            <p className="guide-lede guide-lede--last">
              It&apos;s the guide I wanted in year one — not a cure, just a map
              you can follow on your own skin.
            </p>

            <div className="guide-facts">
              {GUIDE_FACTS.map((fact) => (
                <div key={fact.key} className="guide-facts__row">
                  <span className="guide-facts__key">{fact.key}</span>
                  <span className="guide-facts__val">{fact.val}</span>
                </div>
              ))}
            </div>

            <div className="guide-buyrow">
              <GuideBuyButton source="section">Get the guide</GuideBuyButton>
              <p className="guide-price">
                <span className="guide-price__amount">${GUIDE_PRICE_USD}</span>
                <span className="guide-price__meta">one-time</span>
              </p>
            </div>
            <p className="guide-microcopy">
              Secure checkout. Download link arrives straight away — no
              subscription.
            </p>
          </div>
          <div className="guide-visual">
            <GuideBookMockup />
          </div>
        </div>
      </section>

      <section
        id="look-inside"
        className="guide-inside"
        aria-label="Look inside the guide"
      >
        <div className="section__inner">
          <div className="guide-inside__head">
            <p className="guide-inside__eyebrow">Look inside</p>
            <p className="guide-inside__hint">
              Four pages from the guide — tap any page to read it larger
            </p>
          </div>
          <div className="guide-inside__grid">
            {GUIDE_PREVIEW_PAGES.map((page, index) => (
              <button
                key={page.src}
                type="button"
                className="guide-page"
                onClick={(event) => {
                  setReturnFocusTo(event.currentTarget);
                  setActiveIndex(index);
                  track("rp_guide_preview_open", {
                    label: page.label,
                    page: page.num,
                  });
                }}
              >
                <div className="guide-page__frame">
                  <img src={page.src} alt={page.label} loading="lazy" />
                </div>
                <p className="guide-page__label">{page.label}</p>
                <p className="guide-page__num">Page {page.num}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <GuideLightbox
          pages={GUIDE_PREVIEW_PAGES}
          index={activeIndex}
          onClose={closeLightbox}
          onStep={stepLightbox}
          returnFocusTo={returnFocusTo}
        />
      )}
    </>
  );
}

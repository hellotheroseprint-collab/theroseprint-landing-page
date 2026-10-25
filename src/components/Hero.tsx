import type { RefObject } from "react";
import Accent from "./Accent";
import BookCover from "./BookCover";
import GuideBuyButton from "./GuideBuyButton";
import {
  COVER_ALT,
  HERO_CTA,
  HERO_EDITION,
  HERO_EYEBROW,
  HERO_LEDE,
  HERO_PRICE_NOTE,
  PRICE_LABEL,
} from "../config/landing";

type HeroProps = {
  slotRef: RefObject<HTMLDivElement | null>;
  imgRef: RefObject<HTMLDivElement | null>;
};

export default function Hero({ slotRef, imgRef }: HeroProps) {
  return (
    <section id="top" className="hero">
      <div className="hero__grain" aria-hidden="true" />
      <div className="wrap hero__top hero__fade">
        <span>{HERO_EYEBROW}</span>
        <span>{HERO_EDITION}</span>
      </div>
      <div className="wrap hero__mid">
        <h1 className="hero__title hero__fade">
          <span className="hero__line">Know your</span>
          <span className="hero__line hero__line--end">
            sk<Accent>i</Accent>n.
          </span>
        </h1>
        <div ref={slotRef} className="hero__slot">
          <div
            ref={imgRef}
            className="hero__still"
            role="img"
            aria-label={COVER_ALT}
          >
            <BookCover />
          </div>
        </div>
      </div>
      <div className="wrap hero__bottom hero__fade">
        <p className="hero__lede">{HERO_LEDE}</p>
        <div className="hero__offer">
          <div className="hero__price">
            <span className="hero__amount">{PRICE_LABEL}</span>
            <span className="hero__note">{HERO_PRICE_NOTE}</span>
          </div>
          <GuideBuyButton source="hero" size="lg">
            {HERO_CTA}
          </GuideBuyButton>
        </div>
      </div>
    </section>
  );
}

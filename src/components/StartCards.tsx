import type { RefObject } from "react";
import BookCover from "./BookCover";
import GuideBuyButton from "./GuideBuyButton";
import Accent from "./Accent";
import { FREE_GUIDE_TITLE, GUIDE_TITLE } from "../config/guide";
import {
  BLUEPRINT_CTA,
  BLUEPRINT_KICKER,
  BLUEPRINT_LEDE,
  CALM_CTA,
  CALM_KICKER,
  CALM_LEDE,
  CALM_PRICE,
  COMPARE_ROWS,
  PRICE_LABEL,
  START_EYEBROW,
  START_FOOTNOTE,
  START_PAYHIP_NOTE,
} from "../config/landing";

type StartCardsProps = {
  cardRef: RefObject<HTMLDivElement | null>;
};

export default function StartCards({ cardRef }: StartCardsProps) {
  return (
    <section id="start" className="start">
      <div className="wrap">
        <span className="eyebrow">{START_EYEBROW}</span>
        <h2 className="start__title">
          Calm t<Accent>o</Accent>night,
          <br />
          or understand it for good.
        </h2>
        <div className="start__grid">
          <article id="free-guide" className="start__card start__card--free">
            <div className="start__head">
              <img
                className="start__calm"
                src="/guide/calm-kit-cover.jpg"
                alt=""
              />
              <div className="start__name">
                <span className="eyebrow eyebrow--muted">{CALM_KICKER}</span>
                <h3>{FREE_GUIDE_TITLE}</h3>
              </div>
              <span className="start__price">{CALM_PRICE}</span>
            </div>
            <p className="start__lede">{CALM_LEDE}</p>
            <ul className="start__compare">
              {COMPARE_ROWS.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span className="start__value start__value--muted">{row.free}</span>
                </li>
              ))}
            </ul>
            <div className="start__cta">
              <GuideBuyButton
                source="free-section"
                product="free"
                variant="secondary"
                size="lg"
              >
                {CALM_CTA}
              </GuideBuyButton>
            </div>
          </article>

          <article id="guide" className="start__card start__card--paid">
            <div className="start__head">
              <div ref={cardRef} className="start__book">
                <BookCover shadow="card" />
              </div>
              <div className="start__name">
                <span className="eyebrow">{BLUEPRINT_KICKER}</span>
                <h3>{GUIDE_TITLE}</h3>
              </div>
              <span className="start__price">{PRICE_LABEL}</span>
            </div>
            <p className="start__lede">{BLUEPRINT_LEDE}</p>
            <ul className="start__compare">
              {COMPARE_ROWS.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span className="start__value">{row.paid}</span>
                </li>
              ))}
            </ul>
            <div className="start__cta start__cta--paid">
              <GuideBuyButton source="compare" size="lg">
                {BLUEPRINT_CTA}
              </GuideBuyButton>
              <span className="start__secure">{START_PAYHIP_NOTE}</span>
            </div>
          </article>
        </div>
        <p className="start__note">{START_FOOTNOTE}</p>
      </div>
    </section>
  );
}

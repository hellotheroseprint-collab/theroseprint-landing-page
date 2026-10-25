import Accent from "./Accent";
import GuideBuyButton from "./GuideBuyButton";
import {
  BLUEPRINT_CTA,
  CLOSING_LEDE,
  FOOTER_LEGAL,
  FOOTER_LINKS,
  FOOTER_WORDMARK,
} from "../config/landing";

export default function Closing() {
  return (
    <section className="close">
      <div className="wrap">
        <h2 className="close__title">
          Start where
          <br />
          y<Accent tone="blush">o</Accent>u are.
        </h2>
        <div className="close__row">
          <p>{CLOSING_LEDE}</p>
          <GuideBuyButton source="final-cta" variant="on-dark" size="lg">
            {BLUEPRINT_CTA}
          </GuideBuyButton>
        </div>
        <footer className="footer">
          <span className="footer__brand">{FOOTER_WORDMARK}</span>
          <div className="footer__links">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <p className="footer__legal">{FOOTER_LEGAL}</p>
        </footer>
      </div>
    </section>
  );
}

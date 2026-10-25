import {
  LETTER_BODY,
  LETTER_EYEBROW,
  LETTER_QUOTE_BEFORE,
  LETTER_QUOTE_EMPHASIS,
  LETTER_ROLE,
  LETTER_SIGN,
} from "../config/landing";

export default function FounderLetter() {
  return (
    <section id="letter" className="letter">
      <img className="letter__rose" src="/rose-outline.svg" alt="" />
      <div className="letter__inner">
        <span className="eyebrow eyebrow--ink">{LETTER_EYEBROW}</span>
        <p className="letter__quote">
          &quot;{LETTER_QUOTE_BEFORE}
          <em>{LETTER_QUOTE_EMPHASIS}</em>&quot;
        </p>
        <div className="letter__row">
          <p className="letter__body">{LETTER_BODY}</p>
          <div className="letter__sign">
            <p>{LETTER_SIGN}</p>
            <p className="eyebrow eyebrow--ink">{LETTER_ROLE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

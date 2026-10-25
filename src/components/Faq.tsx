import Accent from "./Accent";
import { FAQ_INTRO, FAQ_MAIL, FAQS } from "../config/landing";

export default function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="wrap faq__grid">
        <div className="faq__intro">
          <h2>
            Questi<Accent>o</Accent>ns
          </h2>
          <p>
            {FAQ_INTRO} <a href={`mailto:${FAQ_MAIL}`}>{FAQ_MAIL}</a>
          </p>
        </div>
        <div className="faq__list">
          {FAQS.map((item) => (
            <details key={item.q} className="faq__item">
              <summary>
                <span>{item.q}</span>
                <span className="faq__sign" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

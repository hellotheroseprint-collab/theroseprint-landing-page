import Accent from "./Accent";
import GuideBuyButton from "./GuideBuyButton";
import { useLookInside } from "../hooks/useLookInside";
import {
  LOOK_INSIDE_EYEBROW,
  LOOK_INSIDE_MORE_BODY,
  LOOK_INSIDE_MORE_EYEBROW,
  PAGES_CTA,
  PREVIEW_PAGES,
} from "../config/landing";

export default function LookInside() {
  const { pinRef, trackRef, counterRef } = useLookInside();

  return (
    <section id="inside" ref={pinRef} className="inside">
      <div className="inside__sticky">
        <div className="wrap inside__head">
          <h2 className="inside__title">
            Turn a few
            <br />
            p<Accent tone="blush">a</Accent>ges first.
          </h2>
          <div className="inside__meta">
            <span className="eyebrow eyebrow--blush">{LOOK_INSIDE_EYEBROW}</span>
            <span ref={counterRef} className="inside__counter">
              01 / 04
            </span>
          </div>
        </div>
        <div ref={trackRef} className="inside__track">
          {PREVIEW_PAGES.map((page) => (
            <figure className="inside__page" key={page.src}>
              <img src={page.src} alt={page.label} />
              <figcaption>
                <span>{page.label}</span>
                <span>p. {page.num}</span>
              </figcaption>
            </figure>
          ))}
          <div className="inside__more">
            <span className="eyebrow eyebrow--blush">{LOOK_INSIDE_MORE_EYEBROW}</span>
            <div>
              <p>{LOOK_INSIDE_MORE_BODY}</p>
              <GuideBuyButton source="pages" variant="on-dark" size="md">
                {PAGES_CTA}
              </GuideBuyButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

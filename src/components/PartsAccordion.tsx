import { useState } from "react";
import Accent from "./Accent";
import { PARTS, PARTS_EYEBROW, PARTS_HELPER } from "../config/landing";

export default function PartsAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section id="parts" className="parts">
      <div className="wrap">
        <div className="parts__head">
          <span className="eyebrow">{PARTS_EYEBROW}</span>
          <span className="parts__helper">{PARTS_HELPER}</span>
        </div>
        <div className="parts__list">
          {PARTS.map((part, index) => {
            const expanded = open === index;
            const panelId = `part-${part.id}`;
            return (
              <div className="parts__row" key={part.id}>
                <button
                  type="button"
                  className="parts__toggle"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span className="parts__num">{part.num}</span>
                  <span className="parts__word">
                    {part.pre}
                    <Accent>{part.italic}</Accent>
                    {part.post}
                  </span>
                  <span className="parts__aside">
                    <span className="parts__range">pp. {part.range}</span>
                    <span className="parts__sign" aria-hidden="true">
                      {expanded ? "−" : "+"}
                    </span>
                  </span>
                </button>
                <div
                  id={panelId}
                  className="parts__panel"
                  role="region"
                  hidden={!expanded}
                >
                  <p>{part.blurb}</p>
                  <ul>
                    {part.chapters.map((chapter) => (
                      <li key={chapter.page + chapter.title}>
                        <span>{chapter.title}</span>
                        <span>{chapter.page}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

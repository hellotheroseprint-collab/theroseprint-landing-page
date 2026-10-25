import { MARQUEE_ITEMS } from "../config/landing";

export default function Marquee() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <p className="sr-only">{MARQUEE_ITEMS.join(". ")}.</p>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {loop.map((item, index) => (
            <span className="marquee__item" key={`${item}-${index}`}>
              <span>{item}</span>
              <img src="/rose-solid.svg" alt="" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

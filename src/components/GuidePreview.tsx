import { useCallback, useEffect, useRef, useState } from "react";
import type { GuidePreviewPage } from "../config/guide";

type GuidePreviewProps = {
  pages: readonly GuidePreviewPage[];
  onOpen: (index: number, trigger: HTMLElement) => void;
};

/* Native pixel size of the preview PNGs — declared so the track reserves
   its height before the lazy images land. */
const PAGE_W = 1632;
const PAGE_H = 2112;

export default function GuidePreview({ pages, onOpen }: GuidePreviewProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(pages.length - 1, index));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      slideRefs.current[clamped]?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    },
    [pages.length],
  );

  /* The active slide is the one nearest the centre of the track, which is
     also where snapping lands it. Intersection ratios can't tell them apart
     on desktop, where several slides are fully visible at once. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDistance = Infinity;
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;
        const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pages.length]);

  return (
    <div
      className="gprev"
      role="group"
      aria-roledescription="carousel"
      aria-label="Pages from the guide"
    >
      <div
        ref={trackRef}
        className="gprev__track"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollTo(active + 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollTo(active - 1);
          }
        }}
      >
        {pages.map((page, index) => (
          <div
            key={page.src}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className={`gprev__slide${index === active ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${pages.length}: ${page.label}, page ${page.num}`}
          >
            <button
              type="button"
              className="guide-page"
              onClick={(event) => onOpen(index, event.currentTarget)}
            >
              <div className="guide-page__frame">
                <img
                  src={page.src}
                  alt={page.label}
                  width={PAGE_W}
                  height={PAGE_H}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="guide-page__label">{page.label}</p>
              <p className="guide-page__num">Page {page.num}</p>
            </button>
          </div>
        ))}
      </div>

      <div className="gprev__controls">
        <button
          type="button"
          className="gprev__arrow"
          aria-label="Previous page"
          disabled={active === 0}
          onClick={() => scrollTo(active - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 4 L7 12 L15 20" />
          </svg>
        </button>

        <p className="gprev__counter" aria-live="polite">
          {active + 1} / {pages.length}
        </p>

        <button
          type="button"
          className="gprev__arrow"
          aria-label="Next page"
          disabled={active === pages.length - 1}
          onClick={() => scrollTo(active + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 4 L17 12 L9 20" />
          </svg>
        </button>
      </div>
    </div>
  );
}

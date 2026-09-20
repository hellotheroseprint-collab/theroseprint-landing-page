import { useEffect, useRef } from "react";
import type { GuidePreviewPage } from "../config/guide";

type GuideLightboxProps = {
  pages: readonly GuidePreviewPage[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  returnFocusTo: HTMLElement | null;
};

export default function GuideLightbox({
  pages,
  index,
  onClose,
  onStep,
  returnFocusTo,
}: GuideLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const page = pages[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    const focusables = () => {
      const root = overlayRef.current;
      if (!root) return [] as HTMLElement[];
      return Array.from(
        root.querySelectorAll<HTMLElement>("button:not([disabled])"),
      );
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [onClose, onStep, returnFocusTo]);

  if (!page) return null;

  return (
    <div
      ref={overlayRef}
      className="guide-lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${page.label}, page ${page.num}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="guide-lb__panel">
        <div className="guide-lb__frame">
          <img src={page.src} alt={page.label} />
        </div>
        <div className="guide-lb__bar">
          <p className="guide-lb__caption">
            {page.label} · page {page.num}
          </p>
          <div className="guide-lb__nav">
            <button
              type="button"
              className="guide-lb__btn"
              aria-label="Previous page"
              onClick={() => onStep(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15 4 L7 12 L15 20" />
              </svg>
            </button>
            <button
              type="button"
              className="guide-lb__btn"
              aria-label="Next page"
              onClick={() => onStep(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M9 4 L17 12 L9 20" />
              </svg>
            </button>
            <button
              ref={closeRef}
              type="button"
              className="guide-lb__close"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

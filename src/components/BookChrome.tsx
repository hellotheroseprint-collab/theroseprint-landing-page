import type { RefObject } from "react";
import BookCover from "./BookCover";
import GuideBuyButton from "./GuideBuyButton";
import { GUIDE_TITLE } from "../config/guide";
import { DOCK_NOTE } from "../config/landing";

type FlyingBookProps = {
  flyRef: RefObject<HTMLDivElement | null>;
};

export function FlyingBook({ flyRef }: FlyingBookProps) {
  return (
    <div ref={flyRef} className="fly" aria-hidden="true">
      <BookCover />
    </div>
  );
}

type BookDockProps = {
  dockRef: RefObject<HTMLDivElement | null>;
  slotRef: RefObject<HTMLDivElement | null>;
  imgRef: RefObject<HTMLDivElement | null>;
};

export function BookDock({ dockRef, slotRef, imgRef }: BookDockProps) {
  return (
    <div ref={dockRef} className="dock" aria-hidden="true" inert>
      <div className="dock__pill">
        <div ref={slotRef} className="dock__slot">
          <div ref={imgRef} className="dock__img" aria-hidden="true">
            <BookCover shadow="thumb" />
          </div>
        </div>
        <div className="dock__copy">
          <span className="dock__title">{GUIDE_TITLE}</span>
          <span className="dock__note">{DOCK_NOTE}</span>
        </div>
        <GuideBuyButton source="dock" size="sm">
          Get it
        </GuideBuyButton>
      </div>
    </div>
  );
}

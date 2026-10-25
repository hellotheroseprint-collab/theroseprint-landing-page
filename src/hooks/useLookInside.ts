import { useEffect, useRef } from "react";

const MOBILE = "(max-width: 767px)";

function counterLabel(progress: number) {
  const n = Math.min(4, Math.floor(progress * 4.2) + 1);
  return `0${n} / 04`;
}

export function useLookInside() {
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    let raf = 0;

    const setCounter = (progress: number) => {
      if (counterRef.current) {
        counterRef.current.textContent = counterLabel(progress);
      }
    };

    const updateDesktop = () => {
      const section = pinRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const progress = clamp(-rect.top / (rect.height - vh));
      const max = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translateX(${-progress * max}px)`;
      setCounter(progress);
    };

    const updateMobile = () => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transform = "";
      const max = track.scrollWidth - track.clientWidth;
      const progress = max <= 0 ? 0 : track.scrollLeft / max;
      setCounter(progress);
    };

    const onScroll = () => {
      if (mq.matches) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateDesktop();
      });
    };

    const onTrackScroll = () => {
      if (!mq.matches) return;
      updateMobile();
    };

    const onChange = () => {
      const track = trackRef.current;
      if (!track) return;
      if (mq.matches) {
        updateMobile();
      } else {
        track.scrollLeft = 0;
        updateDesktop();
      }
    };

    const track = trackRef.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onChange);
    track?.addEventListener("scroll", onTrackScroll, { passive: true });
    mq.addEventListener("change", onChange);
    onChange();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onChange);
      track?.removeEventListener("scroll", onTrackScroll);
      mq.removeEventListener("change", onChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { pinRef, trackRef, counterRef };
}

function clamp(v: number) {
  if (!Number.isFinite(v)) return 0;
  return Math.min(1, Math.max(0, v));
}

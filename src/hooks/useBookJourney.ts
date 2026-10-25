import { useEffect, useRef } from "react";

const TILT = 22;

function clamp(v: number) {
  return Math.min(1, Math.max(0, v));
}

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function useBookJourney() {
  const flyRef = useRef<HTMLDivElement>(null);
  const heroSlotRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const dockSlotRef = useRef<HTMLDivElement>(null);
  const dockImgRef = useRef<HTMLDivElement>(null);
  const cardImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches;
    let mx = 0;
    let my = 0;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        const y = window.scrollY;
        const fly = flyRef.current;
        const hs = heroSlotRef.current;
        const ds = dockSlotRef.current;
        const ci = cardImgRef.current;
        const heroImg = heroImgRef.current;
        const dockImg = dockImgRef.current;
        const dock = dockRef.current;
        if (!fly || !hs || !ds || !ci || !heroImg || !dockImg || !dock) return;

        const W = fly.offsetWidth;
        const H = fly.offsetHeight || W * 1.294;
        const hr = hs.getBoundingClientRect();
        const start = {
          x: hr.left + hr.width / 2,
          y: hr.top + y + hr.height / 2,
          w: hr.width,
        };
        const dr = ds.getBoundingClientRect();
        const dw = 46;
        const dockP = {
          x: dr.left + dw / 2,
          y: dr.bottom - 6 - (dw * (H / W)) / 2,
          w: dw,
        };
        const cr = ci.getBoundingClientRect();
        const card = {
          x: cr.left + cr.width / 2,
          y: cr.top + cr.height / 2,
          w: cr.width,
        };
        const t = clamp((y - vh * 0.08) / (vh * 0.8));
        const et = ease(t);
        const q = clamp((vh * 0.95 - cr.top) / (vh * 0.55));
        const eq = ease(q);

        let x: number;
        let cy: number;
        let w: number;
        let rot: number;
        let ry: number;
        let rx = 0;

        if (q <= 0) {
          x = lerp(start.x, dockP.x, et);
          cy = lerp(start.y, dockP.y, et) - Math.sin(Math.PI * t) * vh * 0.1;
          w = lerp(start.w, dockP.w, et);
          rot = lerp(-6, -4, et) + Math.sin(Math.PI * t) * 10;
          ry = Math.sin(Math.PI * t) * TILT;
          if (t === 0) {
            ry += mx * 10;
            rx = -my * 8;
          }
        } else {
          x = lerp(dockP.x, card.x, eq);
          cy = lerp(dockP.y, card.y, eq) - Math.sin(Math.PI * q) * vh * 0.12;
          w = lerp(dockP.w, card.w, eq);
          rot = lerp(-4, -3, eq) - Math.sin(Math.PI * q) * 8;
          ry = -Math.sin(Math.PI * q) * TILT;
        }

        const s = W > 0 ? w / W : 1;
        const landed = q >= 1;
        const docked = t >= 0.92 && q <= 0.04;
        const journey = !reduced;

        if (journey) {
          fly.style.transform = `translate3d(${x - W / 2}px,${cy - H / 2}px,0) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(${rot}deg) scale(${s})`;
          fly.style.opacity = landed ? "0" : "1";
          heroImg.style.opacity = "0";
          dockImg.style.opacity = "0";
          ci.style.opacity = landed ? "1" : "0";
        } else {
          fly.style.opacity = "0";
          heroImg.style.opacity = "1";
          dockImg.style.opacity = "1";
          ci.style.opacity = "1";
        }

        dock.style.opacity = docked ? "1" : "0";
        dock.style.pointerEvents = docked ? "auto" : "none";
        if (docked) {
          dock.removeAttribute("aria-hidden");
          dock.removeAttribute("inert");
          const gap = Number.parseFloat(getComputedStyle(dock).bottom) || 16;
          document.documentElement.style.setProperty(
            "--dock-pad",
            `${dock.offsetHeight + gap + 8}px`,
          );
        } else {
          dock.setAttribute("aria-hidden", "true");
          dock.setAttribute("inert", "");
          document.documentElement.style.setProperty("--dock-pad", "0px");
        }
      });
    };

    const onMove = (event: PointerEvent) => {
      if (window.scrollY > 4) return;
      mx = event.clientX / window.innerWidth - 0.5;
      my = event.clientY / window.innerHeight - 0.5;
      onScroll();
    };

    const onMotion = () => {
      reduced = motion.matches;
      onScroll();
    };

    const images = [
      flyRef.current,
      heroSlotRef.current,
      cardImgRef.current,
      dockImgRef.current,
    ].flatMap((node) =>
      node ? [...node.querySelectorAll("img")] : [],
    );
    const onLoad = () => onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    motion.addEventListener("change", onMotion);
    for (const image of images) {
      if (!image.complete) image.addEventListener("load", onLoad);
    }
    onScroll();
    const timeout = window.setTimeout(onScroll, 300);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onMotion);
      for (const image of images) image.removeEventListener("load", onLoad);
      window.clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--dock-pad");
    };
  }, []);

  return {
    flyRef,
    heroSlotRef,
    heroImgRef,
    dockRef,
    dockSlotRef,
    dockImgRef,
    cardImgRef,
  };
}

import { useEffect, useRef } from "react";
import { track } from "../analytics/track";

export function useLandingAnalytics() {
  const waitlistViewed = useRef(false);
  const guideViewed = useRef(false);
  const freeGuideViewed = useRef(false);
  const appViewed = useRef(false);

  useEffect(() => {
    track("rp_page_view", { path: window.location.pathname });

    const depthsFired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct =
        scrollable <= 0
          ? 100
          : Math.round((window.scrollY / scrollable) * 100);

      for (const mark of [25, 50, 75, 100] as const) {
        if (pct >= mark && !depthsFired.has(mark)) {
          depthsFired.add(mark);
          track("rp_scroll_depth", { depth_percent: mark });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observers: IntersectionObserver[] = [];

    const observeOnce = (
      id: string,
      viewed: { current: boolean },
      event: string,
    ) => {
      const el = document.getElementById(id);
      if (!el || typeof IntersectionObserver === "undefined") return;

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !viewed.current) {
              viewed.current = true;
              track(event);
              io.disconnect();
              break;
            }
          }
        },
        { threshold: 0.2 },
      );

      io.observe(el);
      observers.push(io);
    };

    observeOnce("waitlist", waitlistViewed, "rp_waitlist_section_view");
    observeOnce("guide", guideViewed, "rp_guide_section_view");
    observeOnce("free-guide", freeGuideViewed, "rp_free_guide_section_view");
    observeOnce("app", appViewed, "rp_app_section_view");

    return () => {
      window.removeEventListener("scroll", onScroll);
      for (const io of observers) io.disconnect();
    };
  }, []);
}

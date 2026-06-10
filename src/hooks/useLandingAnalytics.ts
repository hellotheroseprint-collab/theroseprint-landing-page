import { useEffect, useRef } from "react";
import { track } from "../analytics/track";

export function useLandingAnalytics() {
  const waitlistViewed = useRef(false);

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

    const waitlistEl = document.getElementById("waitlist");
    if (!waitlistEl || typeof IntersectionObserver === "undefined") {
      return () => window.removeEventListener("scroll", onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !waitlistViewed.current) {
            waitlistViewed.current = true;
            track("rp_waitlist_section_view");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );

    io.observe(waitlistEl);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
}

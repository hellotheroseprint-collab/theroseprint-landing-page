import { useCallback, useRef } from "react";
import { track } from "../analytics/track";

const SHOW_ONCE_KEY = "rp_modal_last_shown";
const SHOW_ONCE_DAYS = 15;
const TIMER_SECONDS = 20;

function shouldShowModal(): boolean {
  try {
    const lastShown = localStorage.getItem(SHOW_ONCE_KEY);
    if (!lastShown) return true;
    const daysSince = (Date.now() - Number(lastShown)) / (1000 * 60 * 60 * 24);
    return daysSince >= SHOW_ONCE_DAYS;
  } catch {
    return true;
  }
}

function markShown() {
  try {
    localStorage.setItem(SHOW_ONCE_KEY, String(Date.now()));
  } catch {
    /* localStorage unavailable */
  }
}

export function useKitModalTimer() {
  const timerFired = useRef(false);

  const start = useCallback((openModal: () => void) => {
    if (timerFired.current) return;
    if (!shouldShowModal()) return;

    const id = setTimeout(() => {
      timerFired.current = true;
      markShown();
      track("rp_modal_timer_open");
      openModal();
    }, TIMER_SECONDS * 1000);

    return () => clearTimeout(id);
  }, []);

  const triggerFromClick = useCallback((openModal: () => void) => {
    markShown();
    track("rp_modal_cta_open");
    openModal();
  }, []);

  return { start, triggerFromClick };
}

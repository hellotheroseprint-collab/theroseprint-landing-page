/** Stable Roseprint analytics events — forward to gtag/dataLayer if present. */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.info("[rp_track]", event, props ?? {});
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, props ?? {});
    return;
  }

  window.dataLayer ??= [];
  window.dataLayer.push({
    event,
    ...(props ?? {}),
  });
}

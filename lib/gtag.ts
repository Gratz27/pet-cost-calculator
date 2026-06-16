// Lightweight, type-safe wrapper around the GA4 `gtag` instance that is
// loaded globally in app/layout.tsx. Safe to call anywhere on the client —
// it no-ops during SSR or if GA hasn't loaded / is blocked by the browser.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventNameOrConfig: string, params?: GtagParams) => void;
  }
}

/** Send a GA4 event. No-ops if gtag is unavailable. */
export function trackEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

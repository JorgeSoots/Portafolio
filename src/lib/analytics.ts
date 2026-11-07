type AnalyticsPrimitive = string | number | boolean;
type AnalyticsPayload = Record<string, AnalyticsPrimitive>;
type GtagFunction = (...args: unknown[]) => void;

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const CONSENT_KEY = "jorge-portfolio-analytics-consent";

let initialized = false;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: GtagFunction;
  }
}

export function isAnalyticsConfigured(): boolean {
  return Boolean(measurementId);
}

export function initializeAnalytics(): void {
  if (!measurementId || typeof window === "undefined" || initialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[data-jorge-analytics="${measurementId}"]`,
  );
  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.jorgeAnalytics = measurementId;
    document.head.appendChild(script);
  }

  initialized = true;
}

export function getAnalyticsConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(consent: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Analytics remains disabled if the browser blocks local storage.
  }
  if (consent === "granted") initializeAnalytics();
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}): void {
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, payload);
}

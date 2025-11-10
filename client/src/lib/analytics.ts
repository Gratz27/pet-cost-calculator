/**
 * Google Analytics 4 (GA4) tracking utilities
 * Tracks user behavior, calculator usage, and breed popularity
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Initialize Google Analytics
 * Call this once when the app loads
 */
export function initGA(measurementId: string) {
  if (typeof window === 'undefined' || !measurementId) return;

  // Create script tag for gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
  });
}

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * Track calculator step completion
 */
export function trackCalculatorStep(stepNumber: number, stepName: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'calculator_step', {
    event_category: 'Calculator',
    event_label: stepName,
    step_number: stepNumber,
    step_name: stepName,
  });
}

/**
 * Track breed selection - KEY METRIC for popularity
 */
export function trackBreedSelection(
  petType: 'dog' | 'cat',
  breedName: string
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'breed_selected', {
    event_category: 'Breed Selection',
    event_label: `${petType}: ${breedName}`,
    pet_type: petType,
    breed_name: breedName,
  });

  // Also track as a custom dimension for easier reporting
  window.gtag('set', 'user_properties', {
    last_selected_pet_type: petType,
    last_selected_breed: breedName,
  });
}

/**
 * Track cost calculation completion
 */
export function trackCostCalculation(data: {
  petType: 'dog' | 'cat';
  breed: string;
  firstYearCost: number;
  annualCost: number;
  lifetimeCost: number;
  lifespan: number;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'cost_calculated', {
    event_category: 'Calculator',
    event_label: `${data.petType}: ${data.breed}`,
    pet_type: data.petType,
    breed: data.breed,
    first_year_cost: Math.round(data.firstYearCost),
    annual_cost: Math.round(data.annualCost),
    lifetime_cost: Math.round(data.lifetimeCost),
    lifespan: data.lifespan,
    value: Math.round(data.lifetimeCost), // For conversion value tracking
  });
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'button_click', {
    event_category: 'Engagement',
    event_label: buttonName,
    button_name: buttonName,
    button_location: location || 'unknown',
  });
}

/**
 * Track form interactions
 */
export function trackFormInteraction(
  action: 'start' | 'complete' | 'abandon',
  formName: string
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', `form_${action}`, {
    event_category: 'Form',
    event_label: formName,
    form_name: formName,
  });
}

/**
 * Track social share
 */
export function trackSocialShare(platform: string, content: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'share', {
    event_category: 'Social',
    event_label: platform,
    method: platform,
    content_type: content,
  });
}

/**
 * Track PDF export
 */
export function trackPDFExport(breed: string, petType: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'pdf_export', {
    event_category: 'Export',
    event_label: `${petType}: ${breed}`,
    pet_type: petType,
    breed: breed,
  });
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, linkText: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'click', {
    event_category: 'Outbound Link',
    event_label: url,
    link_url: url,
    link_text: linkText,
  });
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, params);
}


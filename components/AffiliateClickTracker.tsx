"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

/**
 * Global, zero-maintenance affiliate-click tracker.
 *
 * Mounted once in the root layout. It listens for clicks anywhere in the
 * document and, when the click lands on (or inside) an <a> whose href points
 * at a known affiliate/partner host, fires a GA4 `affiliate_click` event with
 * the merchant name and destination. This covers every affiliate link on the
 * site — current and future — without having to edit each link individually.
 *
 * To track a new merchant, just add a host fragment → label below.
 */

// host fragment (lowercased) → merchant label reported to GA4
const MERCHANTS: Array<[string, string]> = [
  ["amazon.", "amazon"],
  ["amzn.to", "amazon"],
  ["barkbox.pxf.io", "barkbox"],
  ["barkbox.com", "barkbox"],
  ["chewy.com", "chewy"],
  ["partnerize.com", "chewy"],
  ["healthypaws", "healthy_paws"],
  ["embracepetinsurance", "embrace"],
  ["aspcapetinsurance", "aspca"],
  ["petplan.co.uk", "petplan_uk"],
  ["tesco-bank.com", "tesco_uk"],
  ["realinsurance.com.au", "real_insurance_au"],
  ["petsure.com.au", "petsure_au"],
  ["impact.com", "impact"],
];

function merchantFor(href: string): string | null {
  let host: string;
  try {
    host = new URL(href, window.location.origin).hostname.toLowerCase();
  } catch {
    return null;
  }
  // Ignore our own domain (internal links / CTAs)
  if (host.endsWith("petcost-calculator.com") || host === window.location.hostname) {
    // still allow tagged Amazon links that might be relative? No — internal only.
    if (!MERCHANTS.some(([frag]) => host.includes(frag))) return null;
  }
  for (const [frag, label] of MERCHANTS) {
    if (host.includes(frag)) return label;
  }
  return null;
}

export default function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;
      const merchant = merchantFor(anchor.href);
      if (!merchant) return;
      trackEvent("affiliate_click", {
        merchant,
        url: anchor.href,
        location: window.location.pathname,
      });
    }
    // capture phase so it still fires if the handler opens a new tab
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

/**
 * Normalized list of featured affiliate partner brands for the Pet Essentials
 * page. Unifies the AWIN merchants with the two direct programmes (BarkBox,
 * YumWoof) into a single shape the UI can render and sort.
 *
 * EPC is parsed to a number purely for revenue-priority ordering within each
 * category (higher = featured first). Region drives the local-first filtering.
 */

import { awinLinks, productLinks } from "@/lib/affiliateLinks";

export type PartnerCategory =
  | "food"
  | "treats"
  | "supplements"
  | "insurance"
  | "lifestyle";

export type Partner = {
  key: string;
  name: string;
  url: string;
  /** Bare domain, used to fetch a brand logo (logo.clearbit.com/<domain>). */
  domain: string;
  region: "uk" | "us" | "global";
  category: PartnerCategory;
  tagline: string;
  coupon?: string;
  /** Parsed EPC value (in its native currency) for sort priority; 0 if unknown. */
  epcValue: number;
  /** Original EPC label for display (e.g. "£0.64 EPC"), if available. */
  epcLabel?: string;
};

const UTM = "utm_source=petcost-calculator&utm_medium=referral";
const withUtm = (u: string) => `${u}${u.includes("?") ? "&" : "?"}${UTM}`;

/** "GBP 0.64" / "USD 1.91" → { value: 0.64, label: "£0.64 EPC" } */
function parseEpc(epc?: string): { value: number; label?: string } {
  if (!epc) return { value: 0 };
  const m = epc.match(/([A-Z]{3})\s*([\d.]+)/);
  if (!m) return { value: 0 };
  const value = parseFloat(m[2]);
  const sym = m[1] === "GBP" ? "£" : m[1] === "USD" ? "$" : "";
  return { value, label: `${sym}${value.toFixed(2)} EPC` };
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export const CATEGORY_META: Record<
  PartnerCategory,
  { label: string; blurb: string; icon: string }
> = {
  food: { label: "Food & Fresh Meals", blurb: "Premium, fresh and raw diets from brands that obsess over ingredients.", icon: "Utensils" },
  treats: { label: "Treats & Chews", blurb: "Natural treats, chews and subscription boxes your pet will love.", icon: "Bone" },
  supplements: { label: "Health & Supplements", blurb: "Vet-formulated supplements and pharmacy essentials for everyday wellbeing.", icon: "HeartPulse" },
  insurance: { label: "Pet Insurance", blurb: "Cover that protects your pet — and your budget — from surprise vet bills.", icon: "ShieldCheck" },
  lifestyle: { label: "Lifestyle & Gear", blurb: "Beds, trackers, furniture and personalised pieces for life with a pet.", icon: "Sparkles" },
};

export const CATEGORY_ORDER: PartnerCategory[] = [
  "food",
  "treats",
  "supplements",
  "lifestyle",
  "insurance",
];

// Build the unified partner list ------------------------------------------------

const awinPartners: Partner[] = Object.entries(awinLinks).map(([key, e]) => {
  const { value, label } = parseEpc(e.epc);
  return {
    key,
    name: e.name,
    url: withUtm(e.affiliateUrl),
    domain: domainOf(e.directUrl),
    region: e.region === "global" ? "global" : e.region,
    category: e.category,
    tagline: e.tagline,
    coupon: e.couponCode,
    epcValue: value,
    epcLabel: label,
  };
});

const directPartners: Partner[] = [
  {
    key: "barkBox",
    name: productLinks.barkBox.name,
    url: withUtm(productLinks.barkBox.affiliateUrl ?? productLinks.barkBox.directUrl),
    domain: "barkbox.com",
    region: "us",
    category: "treats",
    tagline: "A monthly box of themed toys and treats, delivered to your door.",
    epcValue: 0,
  },
  {
    key: "yumWoof",
    name: productLinks.yumWoof.name,
    url: withUtm(productLinks.yumWoof.affiliateUrl ?? productLinks.yumWoof.directUrl),
    domain: "yumwoof.com",
    region: "us",
    category: "food",
    tagline: "Air-dried, superfood dog meals and toppers — vet-developed recipes.",
    coupon: productLinks.yumWoof.couponCode,
    epcValue: 0,
  },
];

/** All featured brand partners, already merged. */
export const partners: Partner[] = [...awinPartners, ...directPartners];

/** Partners for a category, sorted by EPC (revenue priority) then name. */
export function partnersByCategory(cat: PartnerCategory): Partner[] {
  return partners
    .filter((p) => p.category === cat)
    .sort((a, b) => b.epcValue - a.epcValue || a.name.localeCompare(b.name));
}

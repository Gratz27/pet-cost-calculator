/**
 * Central registry of outbound partner / affiliate links.
 *
 * HOW TO ACTIVATE AN AFFILIATE LINK
 * ----------------------------------
 * 1. Apply to the program (see AFFILIATE_SIGNUP_GUIDE.md in the repo root).
 * 2. Once approved, you'll get either a tracking ID/sub-ID, or a full
 *    "deep link" URL from the affiliate network.
 * 3. Paste it into the matching entry below as `affiliateUrl`.
 * 4. Leave `affiliateUrl` as `null` to fall back to the plain `directUrl`
 *    (no tracking) — this keeps links live while you wait on approvals.
 *
 * All outbound links also get `utm_source=petcost-calculator&utm_medium=referral`
 * appended automatically so you can track click-throughs in each provider's
 * own dashboard even before an affiliate ID is wired up.
 */

type LinkEntry = {
  name: string;
  /** Plain, working URL to the provider (no tracking). Always kept up to date. */
  directUrl: string;
  /** Full affiliate/tracking deep-link once approved. Null = not yet set up. */
  affiliateUrl: string | null;
};

const UTM = "utm_source=petcost-calculator&utm_medium=referral";

function withUtm(url: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${UTM}`;
}

/** Returns the best available URL for a link entry (affiliate if set, else direct). */
export function resolveLink(entry: LinkEntry): string {
  return withUtm(entry.affiliateUrl ?? entry.directUrl);
}

// ---------------------------------------------------------------------------
// Pet insurance providers
// ---------------------------------------------------------------------------

export const insuranceLinks: Record<string, LinkEntry> = {
  healthyPaws: {
    name: "Healthy Paws",
    directUrl: "https://www.healthypaws.com",
    // Program: contact partners.healthypawspetinsurance.com (direct affiliate program)
    affiliateUrl: null,
  },
  embrace: {
    name: "Embrace",
    directUrl: "https://www.embracepetinsurance.com",
    // Program: Impact (app.impact.com/campaign-promo-signup/Embrace-Pet-Insurance.brand)
    affiliateUrl: null,
  },
  aspca: {
    name: "ASPCA Pet Insurance",
    directUrl: "https://www.aspcapetinsurance.com",
    // Program: aspcapetinsurance.com/for-affiliates/
    affiliateUrl: null,
  },
  petplanUK: {
    name: "Petplan (UK)",
    directUrl: "https://www.petplan.co.uk",
    // Program: Awin, merchant "Petplan" (search Awin dashboard once approved)
    affiliateUrl: null,
  },
  tescoUK: {
    name: "Tesco Pet Insurance (UK)",
    // Old /zones/ URL was dead — corrected to current Tesco Bank pet insurance page
    directUrl: "https://www.tesco-bank.com/insurance/pet-insurance/",
    // Program: Tesco Bank affiliate programs run via Optimise (Affiliate Window/Awin
    // does NOT cover Tesco Bank financial products)
    affiliateUrl: null,
  },
  realInsuranceAU: {
    name: "Real Insurance (AU)",
    directUrl: "https://www.realinsurance.com.au/pet-insurance",
    // No public self-serve affiliate program found — contact Real Insurance / PetSure directly
    affiliateUrl: null,
  },
  petSureAU: {
    name: "PetSure (AU)",
    directUrl: "https://www.petsure.com.au",
    // Program: Commission Factory (AU network) — apply via petsure.com.au/partners/
    affiliateUrl: null,
  },
};

// ---------------------------------------------------------------------------
// Pet products
// ---------------------------------------------------------------------------

export const productLinks: Record<string, LinkEntry> = {
  chewy: {
    name: "Chewy",
    directUrl: "https://www.chewy.com/s?query=dog+food",
    // Program: Partnerize (join.partnerize.com/chewy/en_us) — 4% commission + $15/new customer
    affiliateUrl: null,
  },
  amazonPetSupplies: {
    name: "Amazon Pet Supplies",
    directUrl: "https://www.amazon.com/pet-supplies/b?node=2619533011",
    // Program: Amazon Associates — Store ID: petcost0e-20
    affiliateUrl: "https://www.amazon.com/pet-supplies/b?node=2619533011&tag=petcost0e-20",
  },
};

// ---------------------------------------------------------------------------
// Amazon search links — context-specific (pet type, breed size, topic)
// ---------------------------------------------------------------------------

export const AMAZON_TAG = "petcost0e-20";

/** Builds an Amazon search results URL with the Associates tag pre-applied. */
export function amazonSearchLink(query: string): string {
  const params = new URLSearchParams({ k: query, tag: AMAZON_TAG });
  return `https://www.amazon.com/s?${params.toString()}`;
}

/**
 * Returns a relevant Amazon search query for a given pet type + size.
 * Used to make "Recommended products" feel tailored rather than generic.
 */
export function recommendedSuppliesQuery(petType: "dog" | "cat", size?: "small" | "medium" | "large"): string {
  if (petType === "cat") {
    return "cat starter kit litter box scratching post";
  }
  switch (size) {
    case "large":
      return "large dog crate and bed";
    case "small":
      return "small dog carrier and bed";
    default:
      return "dog starter kit crate bed bowls";
  }
}

/**
 * Returns a breed-specific Amazon search query, tailored to size/type, for
 * "Recommended gear" boxes on breed pages.
 */
export function breedGearQuery(breedName: string, petType: "dog" | "cat", size?: "small" | "medium" | "large"): string {
  if (petType === "cat") {
    return `${breedName} cat supplies grooming`;
  }
  const sizeLabel = size === "large" ? "large breed" : size === "small" ? "small breed" : "";
  return `${sizeLabel} ${breedName} dog food and supplies`.replace(/\s+/g, " ").trim();
}

// ---------------------------------------------------------------------------
// Generic "compare insurance" CTA used in calculator results
// (was previously a dead petplan.com/?ref=petcost link — now points internal)
// ---------------------------------------------------------------------------

export const insuranceCompareCta = "/tools/insurance-compare";

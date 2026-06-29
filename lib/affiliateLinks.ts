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
  /** Optional discount/coupon code to display in the UI near this link. */
  couponCode?: string;
};

// ---------------------------------------------------------------------------
// AWIN — publisher ID and deep-link builder
// ---------------------------------------------------------------------------

export const AWIN_PUBLISHER_ID = "2632402";

/**
 * Generates a tracked AWIN deep-link for a given merchant and destination URL.
 * Format: https://www.awin1.com/cread.php?awinmid={mid}&awinaffid={pid}&ued={url}
 */
export function awinLink(merchantId: number, destinationUrl: string): string {
  return `https://www.awin1.com/cread.php?awinmid=${merchantId}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(destinationUrl)}`;
}

type AwinEntry = {
  name: string;
  merchantId: number;
  directUrl: string;
  affiliateUrl: string;
  region: "uk" | "us" | "global";
  category: "food" | "treats" | "supplements" | "insurance" | "lifestyle";
  tagline: string;
  /** EPC from AWIN dashboard — useful for prioritising placement */
  epc?: string;
  couponCode?: string;
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
  odie: {
    name: "Odie Pet Insurance",
    directUrl: "https://getodie.com/",
    // AWIN merchant 68990 — approved June 2026
    affiliateUrl: awinLink(68990, "https://getodie.com/"),
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
  barkBox: {
    name: "BarkBox",
    directUrl: "https://www.barkbox.com",
    // Program: Impact.com — approved June 2026
    affiliateUrl: "https://barkbox.pxf.io/c/6642111/2911264/34203",
  },
  yumWoof: {
    name: "YumWoof",
    // Referral: ref=rjdfquwx  |  Discount URL auto-applies PETCOST (5% off) at checkout
    directUrl: "https://yumwoof.com/?ref=rjdfquwx",
    affiliateUrl: "https://yumwoof.com/discount/PETCOST?ref=rjdfquwx",
    couponCode: "PETCOST",
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

// ---------------------------------------------------------------------------
// AWIN partner programmes
// Publisher ID: 2632402  |  All approved June 2026
// ---------------------------------------------------------------------------

export const awinLinks: Record<string, AwinEntry> = {
  barkingHeads: {
    name: "Barking Heads",
    merchantId: 15852,
    directUrl: "https://barkingheads.co.uk/",
    affiliateUrl: awinLink(15852, "https://barkingheads.co.uk/"),
    region: "uk",
    category: "food",
    tagline: "Natural dry & wet dog food — no nasty bits, just real ingredients",
    epc: "GBP 0.33",
  },
  aatu: {
    name: "AATU",
    merchantId: 17135,
    directUrl: "https://aatu.co.uk/",
    affiliateUrl: awinLink(17135, "https://aatu.co.uk/"),
    region: "uk",
    category: "food",
    tagline: "80% meat super-premium dog & cat food — single protein, no fillers",
    epc: "GBP 0.63",
  },
  purrAndMutt: {
    name: "Purr & Mutt",
    merchantId: 30883,
    directUrl: "https://purrandmutt.com/",
    affiliateUrl: awinLink(30883, "https://purrandmutt.com/"),
    region: "uk",
    category: "supplements",
    tagline: "Science-backed supplements and treats for dogs and cats",
    epc: "GBP 0.64",
  },
  regalMutt: {
    name: "The Regal Mutt",
    merchantId: 38436,
    directUrl: "https://www.regalmutt.com/",
    affiliateUrl: awinLink(38436, "https://www.regalmutt.com/"),
    region: "uk",
    category: "treats",
    tagline: "Natural dog chews, treats & supplements — 10% of profits to rescue",
    epc: "GBP 0.33",
  },
  rawWild: {
    name: "Raw Wild",
    merchantId: 89689,
    directUrl: "https://rawwild.com/",
    affiliateUrl: awinLink(89689, "https://rawwild.com/"),
    region: "us",
    category: "food",
    tagline: "Wild-harvested raw dog food — elk, venison & bison with no additives",
    epc: "USD 1.78",
  },
  aniwell: {
    name: "Aniwell",
    merchantId: 123892,
    directUrl: "https://getaniwell.com/",
    affiliateUrl: awinLink(123892, "https://getaniwell.com/"),
    region: "us",
    category: "supplements",
    tagline: "Vet-formulated supplements to support dog joint, gut & skin health",
    epc: "USD 0.14",
  },
  odie: {
    name: "Odie Pet Insurance",
    merchantId: 68990,
    directUrl: "https://getodie.com/",
    affiliateUrl: awinLink(68990, "https://getodie.com/"),
    region: "us",
    category: "insurance",
    tagline: "Comprehensive accident, illness & wellness cover — US dogs & cats",
    epc: "USD 0.19",
  },
  petLifestyleAndYou: {
    name: "Pet Lifestyle and You",
    merchantId: 46441,
    directUrl: "https://www.petplay.com/",
    affiliateUrl: awinLink(46441, "https://www.petplay.com/"),
    region: "us",
    category: "lifestyle",
    tagline: "Handpicked pet products and lifestyle gear for dogs and cats",
    epc: "USD 0.12",
  },
  pharmPetCo: {
    name: "The Pharm Pet Co.",
    merchantId: 109526,
    directUrl: "https://thepharmpetco.co.uk/",
    affiliateUrl: awinLink(109526, "https://thepharmpetco.co.uk/"),
    region: "uk",
    category: "supplements",
    tagline: "UK online pet pharmacy — prescription medicines, supplements and health products",
    epc: "GBP 0.10",
  },
  bonneEtFilou: {
    name: "Bonne et Filou",
    merchantId: 59397,
    directUrl: "https://bonnetfilou.com/",
    affiliateUrl: awinLink(59397, "https://bonnetfilou.com/"),
    region: "us",
    category: "treats",
    tagline: "Artisan dog macarons and gourmet treats — indulgent gifts for dogs",
    epc: "USD 0.20",
  },
  bigAssDog: {
    name: "Big Ass Dog Company",
    merchantId: 121682,
    directUrl: "https://www.bigassdog.co/",
    affiliateUrl: awinLink(121682, "https://www.bigassdog.co/"),
    region: "us",
    category: "lifestyle",
    tagline: "Gear designed specifically for large and giant breed dogs",
    epc: "USD 0.08",
  },
  happyAndPolly: {
    name: "Happy and Polly",
    merchantId: 75878,
    directUrl: "https://happyandpolly.com/",
    affiliateUrl: awinLink(75878, "https://happyandpolly.com/"),
    region: "us",
    category: "lifestyle",
    tagline: "Modern pet furniture and accessories — stylish beds, feeders and storage",
    epc: "USD 0.62",
  },
  crownAndPaw: {
    name: "Crown and Paw",
    merchantId: 57823,
    directUrl: "https://www.crownandpaw.com/",
    affiliateUrl: awinLink(57823, "https://www.crownandpaw.com/"),
    region: "us",
    category: "lifestyle",
    tagline: "Custom pet portraits and personalised gifts — your pet as royalty",
    epc: "USD 0.82",
  },
  ecoKind: {
    name: "EcoKind Pet Treats",
    merchantId: 91103,
    directUrl: "https://www.ecokindpettreats.com/",
    affiliateUrl: awinLink(91103, "https://www.ecokindpettreats.com/"),
    region: "us",
    category: "treats",
    tagline: "Natural, eco-friendly dog treats — single-ingredient chews with no nasties",
  },
  chefPaw: {
    name: "Chef Paw",
    merchantId: 63546,
    directUrl: "https://www.chefpaw.com/",
    affiliateUrl: awinLink(63546, "https://www.chefpaw.com/"),
    region: "us",
    category: "food",
    tagline: "Home dog food maker — fresh, vet-designed meals cooked in minutes",
    epc: "USD 1.91",
  },
  pajGps: {
    name: "PAJ GPS",
    merchantId: 109920,
    directUrl: "https://www.paj-gps.co.uk/",
    affiliateUrl: awinLink(109920, "https://www.paj-gps.co.uk/"),
    region: "uk",
    category: "lifestyle",
    tagline: "GPS pet trackers — real-time location for dogs and cats, UK & Europe",
    epc: "GBP 0.56",
  },
};

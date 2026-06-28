// Single source of truth for which breed pages Google is allowed to index.
//
// Why this exists: the site generates ~299 breed pages and ~750 compare pages
// from templates. Google AdSense rejected the site for "low value content"
// because the crawlable surface was dominated by thin, templated pages.
// To fix the content-quality ratio we keep only a curated set of high-demand /
// well-supported breed pages indexable, and noindex the long thin tail plus
// ALL compare pages (see app/breeds/[slug]/page.tsx and app/compare/[slug]/page.tsx).
//
// Pages NOT in this set stay live for users (and keep `follow` so internal link
// equity still flows) — they are only removed from Google's index. As individual
// breed pages get genuinely enriched (unique, non-templated content), add their
// IDs here and request indexing.

// Breeds that have a full hand-written companion blog guide (richest content).
const BREEDS_WITH_GUIDES = [
  "golden-retriever",
  "labrador-retriever",
  "french-bulldog",
  "german-shepherd-dog",
  "poodle-standard",
  "dachshund",
  "siberian-husky",
  "goldendoodle",
  "maine-coon",
  "ragdoll",
  "persian",
];

// Highest search-demand breeds (mirror of the TOP_* lists used for compare pairs
// and the sitemap). These get the most cost-related search traffic.
const TOP_DEMAND_DOGS = [
  "golden-retriever", "labrador-retriever", "french-bulldog", "german-shepherd-dog",
  "poodle-standard", "bulldog", "beagle", "rottweiler", "german-shorthaired-pointer",
  "dachshund", "pembroke-welsh-corgi", "yorkshire-terrier", "australian-shepherd",
  "boxer", "border-collie", "siberian-husky", "great-dane", "doberman-pinscher",
  "cavalier-king-charles-spaniel", "shih-tzu", "boston-terrier", "bernese-mountain-dog",
  "pomeranian", "miniature-schnauzer", "english-cocker-spaniel", "bichon-frise",
  "maltese", "weimaraner", "brittany", "english-setter",
];

const TOP_DEMAND_CATS = [
  "persian", "maine-coon", "ragdoll", "bengal", "siamese", "british-shorthair",
  "abyssinian", "russian-blue", "scottish-fold", "sphynx", "norwegian-forest",
  "devon-rex", "american-shorthair", "birman", "burmese",
];

// Breeds already earning Google impressions per the June 2026 GSC analysis —
// keep these indexed so we don't lose pages that are already ranking.
const PROVEN_IN_SEARCH = [
  "fox-terrier-smooth",
  "whippet",
  "tibetan-mastiff",
  "japanese-akita",
  "nova-scotia-duck-tolling-retriever",
];

export const INDEXABLE_BREED_IDS: ReadonlySet<string> = new Set([
  ...BREEDS_WITH_GUIDES,
  ...TOP_DEMAND_DOGS,
  ...TOP_DEMAND_CATS,
  ...PROVEN_IN_SEARCH,
]);

export function isBreedIndexable(breedId: string): boolean {
  return INDEXABLE_BREED_IDS.has(breedId);
}

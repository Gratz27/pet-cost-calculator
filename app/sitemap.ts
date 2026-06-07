import { MetadataRoute } from "next";
import { getAllBreeds } from "@/lib/calculator";
import { getAllGuideSlugs } from "@/data/guides";

const BASE = "https://petcost-calculator.com";

// Mirror of the REGIONS map in /costs/[country]/[region]/page.tsx
const COST_REGIONS: { country: string; region: string }[] = [
  { country: "us", region: "national-average" },
  { country: "us", region: "new-york" },
  { country: "us", region: "los-angeles" },
  { country: "us", region: "chicago" },
  { country: "us", region: "austin" },
  { country: "uk", region: "national-average" },
  { country: "uk", region: "london" },
  { country: "uk", region: "manchester" },
  { country: "au", region: "national-average" },
  { country: "au", region: "sydney" },
  { country: "au", region: "melbourne" },
];

// Mirror of TOP_DOG_BREEDS + TOP_CAT_BREEDS in compare/[slug]/page.tsx
const TOP_DOG_BREEDS = [
  "golden-retriever", "labrador-retriever", "french-bulldog", "german-shepherd-dog",
  "poodle-standard", "bulldog", "beagle", "rottweiler", "german-shorthaired-pointer",
  "dachshund", "pembroke-welsh-corgi", "yorkshire-terrier", "australian-shepherd",
  "boxer", "border-collie", "siberian-husky", "great-dane", "doberman-pinscher",
  "cavalier-king-charles-spaniel", "shih-tzu", "boston-terrier", "bernese-mountain-dog",
  "pomeranian", "miniature-schnauzer", "english-cocker-spaniel", "bichon-frise",
  "maltese", "weimaraner", "brittany", "english-setter",
];

const TOP_CAT_BREEDS = [
  "persian", "maine-coon", "ragdoll", "bengal", "siamese", "british-shorthair",
  "abyssinian", "russian-blue", "scottish-fold", "sphynx", "norwegian-forest",
  "devon-rex", "american-shorthair", "birman", "burmese",
];

function buildComparePairs(): string[] {
  const pairs: string[] = [];
  const seen = new Set<string>();

  function addPair(a: string, b: string) {
    if (a === b) return;
    const key = [a, b].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push(`${a}-vs-${b}`);
  }

  for (let i = 0; i < TOP_DOG_BREEDS.length; i++)
    for (let j = i + 1; j < TOP_DOG_BREEDS.length; j++)
      addPair(TOP_DOG_BREEDS[i], TOP_DOG_BREEDS[j]);

  for (let i = 0; i < TOP_CAT_BREEDS.length; i++)
    for (let j = i + 1; j < TOP_CAT_BREEDS.length; j++)
      addPair(TOP_CAT_BREEDS[i], TOP_CAT_BREEDS[j]);

  // Neighbour pairs across lists
  const allBreeds = [...TOP_DOG_BREEDS, ...TOP_CAT_BREEDS];
  for (let i = 0; i < allBreeds.length - 1; i++)
    addPair(allBreeds[i], allBreeds[i + 1]);

  return pairs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");
  const guideSlugs = getAllGuideSlugs();
  const comparePairs = buildComparePairs();

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/calculator`,              lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/breeds`,                  lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/compare`,                 lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/guides`,                  lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/blog`,                    lastModified: now, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE}/report`,                  lastModified: now, priority: 0.7, changeFrequency: "yearly" },
    { url: `${BASE}/methodology`,             lastModified: now, priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE}/tools`,                   lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/tools/insurance-compare`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/tools/budget-tracker`,    lastModified: now, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE}/about`,                   lastModified: now, priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE}/how-it-works`,            lastModified: now, priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE}/contact`,                 lastModified: now, priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/privacy-policy`,          lastModified: now, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/terms`,                   lastModified: now, priority: 0.3, changeFrequency: "yearly" },
  ];

  const breedPages: MetadataRoute.Sitemap = [...dogs, ...cats].map((b) => ({
    url: `${BASE}/breeds/${b.id}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const comparePages: MetadataRoute.Sitemap = comparePairs.map((slug) => ({
    url: `${BASE}/compare/${slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const costPages: MetadataRoute.Sitemap = COST_REGIONS.map(({ country, region }) => ({
    url: `${BASE}/costs/${country}/${region}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...breedPages, ...guidePages, ...comparePages, ...costPages];
}

import { MetadataRoute } from "next";
import { getAllBreeds } from "@/lib/calculator";
import { getAllGuideSlugs } from "@/data/guides";
import { allBlogArticles } from "@/data/blogArticles";
import { isBreedIndexable } from "@/lib/indexableBreeds";

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

// NOTE: compare pages and the thin breed-page long tail are intentionally
// EXCLUDED from the sitemap. They are noindex,follow (see lib/indexableBreeds.ts,
// app/breeds/[slug]/page.tsx, app/compare/[slug]/page.tsx) to fix the AdSense
// "low value content" ratio. Only curated, substantial pages are submitted to
// Google. Re-add a breed here once its page has genuinely unique content.

export default function sitemap(): MetadataRoute.Sitemap {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");
  const guideSlugs = getAllGuideSlugs();

  const now = new Date();
  const launched = new Date("2026-06-07"); // site launch date
  const stable   = new Date("2026-01-01"); // rarely-changing pages

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                              lastModified: now,      priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/calculator`,              lastModified: now,      priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/breeds`,                  lastModified: now,      priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/compare`,                 lastModified: launched, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/guides`,                  lastModified: now,      priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/blog`,                    lastModified: now,      priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE}/report`,                  lastModified: launched, priority: 0.7, changeFrequency: "yearly" },
    { url: `${BASE}/methodology`,             lastModified: stable,   priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE}/tools`,                   lastModified: launched, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/tools/insurance-compare`, lastModified: launched, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/tools/budget-tracker`,    lastModified: launched, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BASE}/tools/gear`,              lastModified: launched, priority: 0.5, changeFrequency: "weekly" },
    { url: `${BASE}/about`,                   lastModified: stable,   priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE}/how-it-works`,            lastModified: stable,   priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE}/contact`,                 lastModified: stable,   priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE}/privacy-policy`,          lastModified: stable,   priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/terms`,                   lastModified: stable,   priority: 0.3, changeFrequency: "yearly" },
  ];

  const breedPages: MetadataRoute.Sitemap = [...dogs, ...cats]
    .filter((b) => isBreedIndexable(b.id))
    .map((b) => ({
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

  const costPages: MetadataRoute.Sitemap = COST_REGIONS.map(({ country, region }) => ({
    url: `${BASE}/costs/${country}/${region}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const blogPages: MetadataRoute.Sitemap = allBlogArticles.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: a.publishDate ? new Date(a.publishDate) : now,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...breedPages, ...guidePages, ...costPages, ...blogPages];
}

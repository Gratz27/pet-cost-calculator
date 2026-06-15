# PetCost Calculator — Project Context for Claude

## What This Project Is
A Next.js 14 web app at **petcost-calculator.com** that calculates the cost of owning dogs and cats. Users select a breed, answer questions about their lifestyle/location, and get a breakdown of first-year, annual, and lifetime costs.

## Deployment
- **Hosting:** Netlify (NOT Vercel — Vercel project was deleted)
- **Repo:** GitHub → auto-deploys to Netlify on every push to main
- **Domain:** petcost-calculator.com (DNS → Netlify)
- **Plugin:** `@netlify/plugin-nextjs` v5 (in devDependencies + netlify.toml)
- **Node version:** 20

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (custom green palette — see globals.css for CSS variables)
- Lucide React (icons)
- Recharts (charts in calculator results)
- Radix UI (accordion, dialog, select, slider, tooltip, tabs, progress)

## Environment Variables
Set in Netlify dashboard → Site settings → Environment variables:
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (e.g. G-XXXXXXXXXX)

## Analytics & Search
- **Google Analytics 4:** wired up in app/layout.tsx via NEXT_PUBLIC_GA_ID
- **Google Search Console:** sitemap submitted as `sitemap.xml` (relative path only)
- **Sitemap:** /app/sitemap.ts — covers 1,100+ URLs (breeds, compare, guides, blog, costs, static pages)

## Colour Scheme
Light green palette — never use navy/dark theme. Key colours:
- Primary green: #2E7D32
- Light green: #4CAF50
- Pale green bg: #E8F5E9
- Section bg: #F1F8F1
- Border: #C8E6C9
- Text dark: #1B2B1B
- Text muted: #5a7a5a

## Key Directories
```
app/                     Next.js App Router pages
  layout.tsx             Root layout — fonts, GA4, metadata
  page.tsx               Homepage (calculator-first hero, breed cards, FAQ schema)
  globals.css            Tailwind + custom component classes
  calculator/            Interactive cost calculator
  breeds/[slug]/         300+ breed detail pages (dog + cat)
  compare/[slug]/        750+ programmatic breed comparison pages
  guides/[slug]/         Pet ownership guide articles
  blog/[slug]/           Blog articles
  costs/[country]/[region]/  Regional cost pages (US, UK, AU)
  tools/                 Insurance compare + budget tracker
  report/                Annual Pet Cost Report 2026
  methodology/           How costs are calculated
  sitemap.ts             Dynamic sitemap covering all routes

components/
  Header.tsx             Nav with breeds dropdown, regional costs link
  Footer.tsx             Full footer with all links
  BreedImage.tsx         Loads /breeds/[slug].png (local mascot); falls back to branded placeholder

data/
  breeds.ts              All breed data (costs, metadata)
  blogArticles.ts        Blog content
  guides.ts              Guide content

lib/
  calculator.ts          Core cost calculation logic + getAllBreeds()

public/
  og-image.png           1200×630 Open Graph image
  favicon.ico / favicon-16x16.png / favicon-32x32.png / apple-touch-icon.png
```

## SEO — What's Been Implemented
- Canonical URLs on all dynamic routes (breeds, compare, guides, blog, costs)
- Compare pages use alphabetically sorted canonical to prevent duplicates
- FAQ schema (JSON-LD) on homepage and all breed pages
- WebSite schema with SearchAction on homepage
- Article schema on blog posts
- Open Graph + Twitter card metadata on all pages
- Font loading via `<link rel="stylesheet">` (non-blocking, NOT @import)
- All Next.js `<Image>` components have `unoptimized` removed (WebP optimisation enabled)
- First 4 breed cards on homepage have `priority` prop (LCP optimisation)
- Sitemap lastModified dates reflect page update frequency

## Images — Real Photo Strategy

### Brand direction (updated June 2026)
The site is moving from mascot illustrations to **real animal photos**. Real photos take priority
over mascot PNGs wherever available, with mascot illustrations remaining as the fallback for
breeds that don't have a real photo yet (and the branded paw placeholder as the final fallback).

### Where images live
- **Real photos:** `lib/breedImages.ts` exports `realBreedPhotoMap` (breed ID → Unsplash photo URL,
  via a `UNSPLASH(id)` helper that appends `?w=1200&q=80`) and `realBreedPhotoPosition` (breed ID →
  CSS `object-position` override, e.g. `"center 30%"`, for photos that need custom cropping).
- **Mascot illustrations (fallback):** `/public/breeds/[slug].png` — e.g. `/public/breeds/golden-retriever.png`,
  served at `/breeds/[slug].png` in the browser.

### BreedImage component behaviour
1. Looks up `breedId` in `realBreedPhotoMap`. If present, loads that Unsplash photo with
   `object-cover` and `objectPosition` from `realBreedPhotoPosition[breedId]` (default `"center"`).
2. If no real photo exists, falls back to `/breeds/[slug].png` (local mascot) with
   `object-contain object-bottom` so the full mascot is visible.
3. If the image 404s → shows the branded green/cream paw placeholder with breed name.
4. Do NOT fall back to the Dog CEO API or TheCatAPI directly — those are deprecated for breed images;
   `images.unsplash.com` is the approved source for real photos.

### Adding/updating a real photo for a breed
1. Find a commercially-free photo (Unsplash License — no attribution required).
2. Add an entry to `realBreedPhotoMap` in `lib/breedImages.ts`: `"breed-id": UNSPLASH("photo-id")`.
3. If the default centered crop doesn't frame the animal well, add an entry to
   `realBreedPhotoPosition` with a CSS `object-position` value (e.g. `"center 30%"`).
4. Breeds not yet in `realBreedPhotoMap` keep using their existing mascot PNG automatically —
   no extra work needed.

### Mascot illustrations (still used as fallback)
For breeds without a real photo yet, mascot PNGs follow the existing style: modern mascot,
slight Pixar influence, flat vector colouring — "friendly veterinary clinic meets Pixar."

DALL-E / ChatGPT prompt template for generating a new mascot, replace `[BREED NAME]` and `[TYPE]`:

```
A friendly cartoon mascot illustration of a [BREED NAME] [TYPE] in a modern mascot style.
Slightly oversized expressive eyes, friendly smile, rounded features, clean outlines, soft shading,
breed-specific details. Flat vector colouring, bright but professional. White/transparent background.
Style: friendly veterinary clinic meets Pixar — clean, warm, not childish. Square format, PNG.
No text, no background scenery. The [TYPE] is sitting, facing slightly forward, happy expression.
```

### Naming convention (mascot PNGs)
- File name = breed slug (same as URL slug) + `.png`
- e.g. `golden-retriever.png`, `french-bulldog.png`, `domestic-shorthair.png`
- All lowercase, hyphens only, no spaces

### External image domains (whitelisted in next.config.mjs)
- images.unsplash.com — approved source for real breed photos
- upload.wikimedia.org
- images.dog.ceo (deprecated for breed images — can be removed once unused)
- cdn2.thecatapi.com (deprecated for breed images — can be removed once unused)

## Breeds
- ~300+ total (dogs + cats)
- Data lives in data/breeds.ts
- getAllBreeds("dog") and getAllBreeds("cat") used throughout
- Breed IDs are kebab-case slugs (e.g. "golden-retriever", "persian")

## Compare Pages
- Top 30 dog breeds × top 15 cat breeds generate ~750 compare pairs
- Defined in app/sitemap.ts (TOP_DOG_BREEDS, TOP_CAT_BREEDS)
- Mirrored in app/compare/[slug]/page.tsx
- URLs always alphabetically sorted to avoid duplicate content

## Calculator
- Multi-step form: pet type → breed → lifestyle questions → results
- Results include: cost breakdown table, 10-year projection chart, insurance CTA, cheaper alternatives
- Breed pages have "Calculate costs for [breed]" button that pre-populates calculator via URL params
- Recharts used for projection chart (SSR-safe — wrapped in dynamic import)

## Known Issues / Watch Out For
- `.git/index.lock` can appear in sandbox after crashes — user must run `rm .git/index.lock` in Terminal before git commands
- Never share GitHub tokens in chat
- Google Search Console sitemap must be submitted as `sitemap.xml` (relative), NOT the full URL

## What Still Could Be Done (Future Ideas)
- Google AdSense integration (ADSENSE_APPROVAL_PLAN.md has the plan)
- Email capture / newsletter (forms exist on report page, homepage)
- More blog articles
- User accounts / saved calculations
- More regional cost data

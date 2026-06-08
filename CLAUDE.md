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

## Images — Mascot Illustration Strategy

### Brand direction (decided June 2026)
All breed images on the site use a **consistent modern mascot illustration style** — NOT stock photos or API images.
Style: Modern mascot + slight Pixar influence + flat vector colouring. Friendly, professional, breed-specific.
Think: "friendly veterinary clinic meets Pixar" — clean vector, bright but not childish.

### Where images live
`/public/breeds/[slug].png` — e.g. `/public/breeds/golden-retriever.png`
Images are served at `/breeds/[slug].png` in the browser.

Future poses (when generated): `/public/breeds/[slug]-playful.png`, `/public/breeds/[slug]-eating.png`, etc.

### BreedImage component behaviour
1. Tries to load `/breeds/[slug].png` (local mascot)
2. If not found (404) → shows a branded green/cream paw placeholder with breed name
3. Do NOT fall back to Dog CEO API or TheCatAPI — those are deprecated for breed images

### DALL-E / ChatGPT image prompt template
Use this prompt to generate each breed mascot. Replace `[BREED NAME]` and `[TYPE]`:

```
A friendly cartoon mascot illustration of a [BREED NAME] [TYPE] in a modern mascot style.
Slightly oversized expressive eyes, friendly smile, rounded features, clean outlines, soft shading,
breed-specific details. Flat vector colouring, bright but professional. White/transparent background.
Style: friendly veterinary clinic meets Pixar — clean, warm, not childish. Square format, PNG.
No text, no background scenery. The [TYPE] is sitting, facing slightly forward, happy expression.
```

Example for Golden Retriever:
```
A friendly cartoon mascot illustration of a Golden Retriever dog in a modern mascot style.
Slightly oversized expressive eyes, friendly smile, rounded features, clean outlines, soft shading,
breed-specific fur colour and details. Flat vector colouring, bright but professional.
Transparent background. Style: friendly veterinary clinic meets Pixar — clean, warm, not childish.
Square format, PNG. No text, no background scenery. The dog is sitting, facing slightly forward,
happy expression, wearing a simple blue collar.
```

### Priority breeds to generate first (most traffic)
Dogs: golden-retriever, labrador-retriever, french-bulldog, german-shepherd, poodle, beagle,
      border-collie, chihuahua, siberian-husky, cavoodle, dachshund, shih-tzu
Cats: domestic-shorthair, persian, maine-coon, ragdoll, siamese, british-shorthair, bengal, sphynx

### Naming convention
- File name = breed slug (same as URL slug) + `.png`
- e.g. `golden-retriever.png`, `french-bulldog.png`, `domestic-shorthair.png`
- All lowercase, hyphens only, no spaces

### External image domains (still whitelisted in next.config.mjs — can be removed once all breeds have local images)
- images.dog.ceo (deprecated for breed images)
- cdn2.thecatapi.com (deprecated for breed images)
- upload.wikimedia.org
- images.unsplash.com

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

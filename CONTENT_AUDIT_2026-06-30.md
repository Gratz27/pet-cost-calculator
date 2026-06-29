# Thin-Content Audit — AdSense Readiness (30 June 2026)

Audited the crawler-facing / indexable surface with `seo-content-audit`'s word-count
script (handles prose embedded in JS/JSON data, unlike a naive regex). Word counts are
a **relative heuristic**, not certified counts — used here to rank pages and spot thin ones.

## Headline finding
The thin-content problem driving the AdSense "low value content" rejection is **systemic**,
not a few pages. Three things stand out:

1. **~24 of 41 blog articles are under ~420 words** — the bulk of indexable blog content is thin.
2. **The 33 "indexable" breed pages are templated**: each shares ~1,124 words of *identical*
   template prose with only ~64 words of unique text (the `description` field) per breed. To
   Google that reads as duplicate/templated, even though the pages were curated by search demand.
   They were selected for demand, **not enriched** — which is the bar `indexableBreeds.ts` itself sets.
3. **Several standalone pages are thin**, including the flagship `/calculator` (~514 words).

Noindexing the compare pages and thin breed tail (commit `cc56c0b`) hid part of the problem,
but left ~24 thin blog articles and the templated breed pages indexed. Deepening — not just
noindexing — is what actually fixes AdSense readiness.

## Wave 1 — Thin articles that already earn impressions (best ROI)
Deepen these next. Cross-referenced against the 30 Jun GSC export (impressions).

| Article | Words | GSC impressions | Priority |
|---|---|---|---|
| pet-costs-by-location | 208 | 913 | 1 |
| purebred-vs-mixed-breed-costs | 206 | 721 | 2 |
| puppy-vs-adult-dog-costs | 222 | 615 | 3 |
| senior-pet-care-costs | 225 | 477 | 4 |
| french-bulldog-complete-cost-guide | 367 | 446 | 5 |
| first-year-puppy-costs | 255 | 349 | 6 |

These are page-1 to page-2 positions with real impression volume — depth lifts both AdSense
eligibility and clicks at the same time.

## Wave 2 — Thin standalone pages (AdSense-critical, low impressions but always crawled)
| Page | Words | Target |
|---|---|---|
| /calculator | ~514 | 1,500–2,000 (add how-it-works, what's included, FAQ around the tool) |
| /about | ~414 | 1,000+ |
| /how-it-works | ~525 | 1,000+ |
| /methodology | ~735 | 1,000+ |
| /tools/insurance-compare | ~148 | 800+ surrounding explanatory content |
| /tools/budget-tracker | ~123 | 800+ surrounding explanatory content |
| /tools (hub) | ~267 | 600+ |

A reviewer lands on `/calculator` and the tool hubs; thin tool pages are a classic flag.

## Wave 3 — The 33 indexable breed pages (strategic decision)
Each indexable breed page currently has only ~64 words of unique content. Options:
- **A (recommended for AdSense):** enrich the ~10 breed pages that actually get impressions
  (the `PROVEN_IN_SEARCH` set + top-demand breeds) with 600–900 unique words each, and keep the
  rest noindexed until enriched. Targeted, manageable effort.
- **B:** accept breed pages as templated, noindex all of them, and rely on blog + guides as the
  AdSense content base. Faster, but throws away the breed-page ranking breakthrough.

## Healthy pages (no action)
homepage (~1,732), /tools/gear (~2,161), /report (~766), and the 5 just-deepened articles
(golden-retriever 1,333 · emergency-vet 1,267 · dog-vs-cat 940 · german-shepherd 753 · labrador 745).

## Note / decision flag
The 4 compare pages I re-indexed for traffic are still *templated*. For a clean AdSense review
window, consider keeping them noindexed until after approval, then re-enable for traffic. Small
call, worth making deliberately.

## Recommended sequence
1. Ship the 5 already-deepened pages (commit + push).
2. Wave 1 (6 thin high-impression articles) — biggest combined AdSense + traffic win.
3. Wave 2 (/calculator + marketing/tool pages) — required before resubmitting to AdSense.
4. Wave 3 decision on breed pages.
5. Resubmit to AdSense once Waves 1–2 are live and re-indexed.

# Weekly SEO Check — 2026-06-16

## GA4 Traffic (May 19 – Jun 15, 2026)

- **Active users:** 354
- **Total views:** 1,087 across 53 pages
- **Avg engagement:** 1m 18s

**Top pages (views / active users):**
1. `/` — 667 / 193
2. `/blog/golden-retriever-lifetime-costs` — 63 / 50
3. `/blog` — 61 / 9
4. `/blog/dog-vs-cat-costs` — 45 / 37
5. `/calculator` — 24 / 10

**Anomaly (Jun 9):** Homepage spiked to 125 views in a single day (expected ~4), driven by 101 New Zealand visitors. Likely a bot sweep or one-time viral share — not sustainable organic growth. No action needed unless it recurs.

---

## GSC Indexing (last updated 6/12/26)

- **Indexed:** 21 ✓ (same as baseline)
- **Not indexed:** 14 ⚠️ (up from ~10 baseline)

| Reason | Pages | vs baseline |
|---|---|---|
| Redirect error | 11 | ↑ NEW/increased |
| Duplicate without user-selected canonical | 1 | stable |
| Page with redirect | 1 | stable |
| Crawled – currently not indexed | 1 | stable |
| Soft 404 | 0 | ✓ Passed |

### ⚠️ Action needed: Redirect errors on key pages

The "Redirect error" bucket now contains 11 pages. Most are legacy blog URLs, but **three are critical pages**:

- `/calculator` — key AdSense page, last crawled Jun 12
- `/tools/gear` — key AdSense page, last crawled Jun 13
- `/breeds` — main breed listing, last crawled Jun 8

Full list of redirect-error pages:
`/tools/gear`, `/blog/golden-retriever-cost-us`, `/calculator`, `/blog/diy-pet-care`, `/blog/small-vs-large-dogs`, `/blog/purebred-vs-mixed-breed`, `/blog/adoption-vs-breeder`, `/blog/budget-friendly-pet-care`, `/blog/city-vs-rural-pet-costs`, `/blog/labrador-retriever-costs`, `/breeds`

**Why this matters:** AdSense resubmission is 2 days away (Jun 18). If Google sees `/calculator` and `/tools/gear` as inaccessible due to redirect errors, it undermines the content quality argument. These pages do receive real user traffic (users reach them fine), so the redirect error is likely a Googlebot-specific issue — possibly a Netlify/Next.js routing conflict, a redirect loop in the app config, or an issue with `next.config.mjs` redirect rules.

**Recommended investigation:**
1. Use GSC URL Inspection on `/calculator` and `/tools/gear` to see the exact redirect chain Googlebot follows
2. Check `netlify.toml` and `next.config.mjs` for any redirect rules affecting these paths
3. If there's a redirect rule (e.g. `/calculator` → `/calculator/`) causing a loop, remove or fix it

### Crawled – currently not indexed (1 page)
`/blog/budget-friendly-pet-care-tips` — last crawled May 1. Low-priority blog post; thin content issue, not new.

---

## Summary

Traffic looks normal. Indexed page count is holding at 21. The main concern is **redirect errors on `/calculator` and `/tools/gear`** with the AdSense resubmission 2 days out — worth investigating today.

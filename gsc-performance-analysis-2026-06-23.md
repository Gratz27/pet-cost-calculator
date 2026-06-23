# GSC Search Performance Analysis — petcost-calculator.com
*Source: Search Console export, Web, last 28 days (25 May – 22 Jun 2026)*
*Analysed: 23 Jun 2026 | Previous window: 17 May – 13 Jun 2026*

---

## Headline Numbers

| Metric | This window (to 22 Jun) | Prior window (to 16 Jun) | Change |
|---|---|---|---|
| Clicks | **156** | 158 | −2 (flat) |
| Impressions | **26,372** | 26,342 | +30 (flat) |
| CTR | **0.59%** | 0.60% | flat |
| Avg position | ~9.0 | ~9.0 | flat |
| Pages with impressions | **~42** | ~24 | **+18 ← new** |
| Queries with impressions | 950 | 919 | +31 |

**Overall verdict: flat on clicks/CTR, but two significant structural shifts buried in the data (see below).**

---

## Finding 1 — CTR Fix: Too Early to Call, But 06-18 Is an Encouraging Signal

The number-led title fix on the top blog pages shipped ~06-17/18. This export's window ends 06-20 — only **4 days of post-fix data** are included.

| Period | Days | Clicks | Impressions | CTR | Daily avg clicks |
|---|---|---|---|---|---|
| Pre-fix (05-24 → 06-16) | 24 | 141 | 24,085 | 0.59% | 5.9 |
| Post-fix (06-17 → 06-20) | 4 | 15 | 2,287 | **0.66%** | 3.8 |

**Confound:** impressions fell from ~1,000/day to ~570/day after 06-16 (data lag, low-traffic weekend days, and possibly Google re-crawling/re-ranking during the transition). The CTR numerically ticked up (0.59% → 0.66%) despite reduced volume — a slight positive signal, not a verdict.

**Best single-day signal:** 06-18 hit **1.58% CTR** (10 clicks / 632 impr) — the highest single-day CTR in the entire 28-day window. This was the day after the fix was most likely re-crawled. Promising, but one data point.

**Golden-retriever page specifically:** CTR still reads **0.30%** (32 clicks / 10,754 impr). Unchanged from 0.29% prior window. Google almost certainly hadn't served the new title at scale within the 4-day overlap.

**Verdict: check the next export (pull in ~7 days). That's the real verdict window.**

---

## Finding 2 — STRUCTURAL BREAKTHROUGH: Programmatic Pages Now Getting Impressions

This is the most important finding in the report.

In the prior window, **zero** breed or compare pages had any impressions. In this window, **11 programmatic pages** have appeared in search for the first time:

| Page | Impressions | Position | Note |
|---|---|---|---|
| /breeds/whippet | 13 | 21 | |
| /breeds/tibetan-mastiff | 11 | 16.6 | |
| /breeds/fox-terrier-smooth | 10 | **4.7** | ← high position |
| /breeds/golden-retriever | 9 | **6.9** | flagship breed |
| /breeds/japanese-akita | 8 | 14 | |
| /breeds/nova-scotia-duck-tolling-retriever | 6 | 12.3 | |
| /compare/golden-retriever-vs-bulldog | 6 | **4.5** | ← very high position |
| /compare/ragdoll-vs-bengal | 2 | 7.5 | |
| /compare/australian-shepherd-vs-boston-terrier | 2 | 9.5 | |
| /compare/scottish-fold-vs-australian-cattle-dog | 1 | 6.0 | |
| /breeds/maltese | 1 | 8.0 | |

**Totals: 69 impressions, 0 clicks — but previously 0 impressions.**

Several positions are already strong (4.5, 4.7, 6.9) — these pages are being indexed and rank competitively, they just need more impressions to accumulate before clicks follow. This is almost certainly the result of the **06-18 compare-page enrichment commit** (FAQ schema, unique content, internal linking fixes) starting to take effect. The structural ceiling is cracking open.

**What to do now:** Request indexing on 10–15 more breed and compare pages via GSC URL Inspection. The pages that are appearing are doing so organically — actively requesting indexing on similar pages will accelerate the pattern.

---

## Finding 3 — Homepage up 29%

| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| / (homepage) | **66** | 1,423 | 4.64% | 6.64 |
| Prior window | 51 | 1,068 | 4.78% | 6.7 |

+15 clicks (+29%). The strongest absolute improvement on the site. Likely a combination of brand term strengthening ("pet cost calculator" moving to pos 3.79) and the new content linking internally to the homepage.

---

## Finding 4 — New High-Priority CTR Targets (Pages Getting Ignored)

The golden-retriever page is already the known CTR problem. But this data reveals **four more pages with terrible CTR and significant impression volume that haven't been fixed yet:**

| Page | Impressions | Clicks | CTR | Position | Fix needed |
|---|---|---|---|---|---|
| /blog/puppy-vs-adult-dog-costs | 987 | 1 | **0.10%** | 6.81 | Number-led title rewrite |
| /blog/labrador-retriever-costs | 940 | 1 | **0.11%** | 9.79 | Number-led title rewrite |
| /blog/french-bulldog-complete-cost-guide | 639 | 1 | **0.16%** | 8.06 | Number-led title rewrite |
| /blog/first-year-puppy-costs | 558 | 0 | **0%** | 13.98 | Title + push to page 1 |
| /blog/persian-cat-costs | 216 | 0 | **0%** | 6.17 | Title fix — pos 6 with 0% CTR is alarming |

**Combined: 3,340 impressions → 3 clicks (0.09% average CTR).** At homepage-level CTR (4.64%) these 5 pages would deliver ~155 clicks. That's the prize. Roll the same number-led, year-tagged title formula used on the top-4 fix across all five immediately.

**Persian cat is particularly urgent:** position 6.17 with 0% CTR means the title/meta is actively repelling clicks despite strong placement.

---

## Finding 5 — "pet cost calculator" Strengthening Toward Top 3

| Query | Clicks | Impressions | CTR | Position | vs prior |
|---|---|---|---|---|---|
| pet cost calculator | 15 | 76 | 19.74% | **3.79** | was 3.92 → improving |
| dog cost calculator | 4 | 24 | 16.67% | 6.71 | strong CTR |
| how much is my dog worth calculator | 2 | 18 | 11.11% | 4.94 | |
| cat cost calculator | 1 | 21 | 4.76% | **4.00** | high position |

Brand/tool cluster CTR remains elite (11–20%). Position 3.79 → a few more backlinks + homepage title optimisation nudge this into the top 3 (typically 2× CTR uplift). **Outreach backlinks are the lever here.**

---

## Finding 6 — Golden Retriever Cluster: Still the Biggest Untapped Opportunity

| Query | Impressions | Clicks | CTR | Position |
|---|---|---|---|---|
| how much does a golden retriever cost | 1,218 | 1 | 0.08% | 9.84 |
| how much is a golden retriever | 273 | 0 | 0% | 11.29 |
| how much do golden retrievers cost | 220 | 0 | 0% | 10.03 |
| are golden retrievers expensive | 117 | 0 | 0% | 8.68 |
| golden retriever maintenance cost | 41 | 0 | 0% | 6.98 |
| how much does a golden retriever cost per month | 40 | 0 | 0% | 7.30 |

Combined cluster: **~2,200+ impressions, ~4 clicks.** The page is at pos 8–10 for most queries. The CTR fix is a title-level change; getting above pos 8 requires links. The `/breeds/golden-retriever` breed page is now appearing at pos 6.9 — this is the internal linking anchor to improve. The blog article + breed page + calculator should form a tight cluster.

---

## Finding 7 — Intent Mismatch Impressions (Can't Convert, Don't Chase)

Two queries are ranking at pos ~4.4 with 0 clicks and never will click through:

- "golden retriever puppies" — 82 impr, pos 4.43 — buying intent, not cost intent
- "golden retriever puppies for sale" — 59 impr, pos 4.47 — same

These impressions are structural noise. The meta description should be crystal clear that this is a **cost calculator**, not a puppy marketplace, to reduce wasted impressions and signal relevance to Google.

---

## Finding 8 — Emergency Vet Page: Still Not Fixed

Despite recent FAQ schema additions, the emergency-vet page remains stuck:

| Query | Impressions | Clicks | CTR | Position |
|---|---|---|---|---|
| cost of emergency vet visit | 62 | 0 | 0% | 73.6 |
| how much do emergency vets cost | 61 | 0 | 0% | 74.9 |
| how much does emergency vet cost | 58 | 0 | 0% | 76.5 |
| emergency vet cost | 31 | 0 | 0% | 64.0 |

The page itself is at pos 33.6 (all clicks from it are 2 from unrelated queries). Four high-volume queries are on pages 6–8 of Google. FAQ schema alone won't fix a pos 70+ ranking — this needs a more thorough content and E-E-A-T review.

---

## Revised Priority Order (Data-Backed, 23 Jun)

1. **Roll CTR title fix to the 5 new targets** (puppy-vs-adult, labrador, french bulldog, first-year puppy, persian cat) — 3,340 impressions with 0.09% aggregate CTR. **AI assistant, $0, today.**
2. **Request indexing for 15+ breed + compare pages** via GSC URL Inspection — the structural breakthrough has started; accelerate it. **Darren + AI, today.**
3. **Watch next GSC export for CTR-fix verdict** on golden-retriever page — 7 days away.
4. **Outreach emails sent** → backlinks → push "pet cost calculator" from pos 3.79 into top 3.
5. **Investigate emergency-vet page** — stuck at pos 33–76 despite rewrite; needs content audit, not just schema.

---

## Data Still Missing

- **GA4 export** — sessions, engagement rate, `calculator_complete` event. Calculator completion rate is instrumented but unread.
- **No AdSense data** — approval status still unconfirmed.

# PetCost Weekly SEO Report — 2026-06-29

## Traffic (GA4, last ~28 days)

| Metric | Value | Change |
|---|---|---|
| Active Users | 385 | +41.5% |
| Sessions | 536 | +51.0% |
| Avg Engagement Time | 1m 10s | +27.2% |

Traffic is trending strongly upward. Top pages by views: `/` (758 views), `/blog/golden-retriever-lifetime-costs` (45), `/calculator` (41), `/tools/gear` (31), `/blog/dog-vs-cat-costs` (29).

**⚠️ China traffic spike:** China is the #2 country by active users (86 users, +406% vs prior period). Worth monitoring — could be bot traffic inflating numbers.

---

## GSC Indexing

| Status | Count | vs Baseline (~June 2026) |
|---|---|---|
| Indexed | 21 | ✅ Unchanged |
| Not indexed | 14 | ⬆️ Was ~10 |

### 🚨 ACTION NEEDED: Redirect Errors on Key Pages

Redirect errors jumped to **11 pages** (validation started 6/16/26, data last updated 6/12/26). The issue now includes **critical pages beyond the legacy blog redirects**:

- `/calculator` — ⚠️ key AdSense page
- `/tools/gear` — ⚠️ key AdSense page
- `/blog/golden-retriever-cost-us` — top traffic blog post
- `/blog/diy-pet-care`
- `/blog/small-vs-large-dogs`
- `/blog/purebred-vs-mixed-breed`
- `/blog/adoption-vs-breeder`
- `/blog/budget-friendly-pet-care`
- `/blog/city-vs-rural-pet-costs`
- `/blog/labrador-retriever-costs`
- (1 more URL not shown in excerpt)

The baseline only expected **legacy 301-redirected blog URLs** here. `/calculator` and `/tools/gear` being flagged as redirect errors is new and unexpected — these are two of the key pages being watched for AdSense resubmission.

**Likely cause:** A Netlify or Next.js redirect rule is creating a redirect loop or chain for these URLs. Check `netlify.toml` redirects and Next.js middleware for any rules affecting `/calculator`, `/tools/gear`, and blog slugs. The `www` → non-www (or vice versa) domain redirect could be interacting badly with another rule.

### Other GSC Notes

- **Soft 404:** 0 pages (Passed) ✅ — previously a concern; now resolved. Good for AdSense.
- **Duplicate without canonical:** 1 page (validation started)
- **Crawled – currently not indexed:** 1 page (validation started)

---

## Summary

Traffic is up solidly (good). The redirect error issue affecting `/calculator` and `/tools/gear` needs urgent investigation — these pages must be cleanly indexable before AdSense resubmission can succeed. The soft 404 fix appears to have held, which is progress.

# Amazon Product Advertising API (PA-API) — Setup

The **Pet Essentials** page (`/tools/gear`) shows the current top Amazon product
image for each curated category and product type. Those images come from
Amazon's **Product Advertising API 5.0**, fetched at build/revalidation (never
per visitor).

> The page degrades gracefully: if the API keys below are **not** set, or any
> request fails, the page automatically falls back to its emoji + search-link
> cards. So the site is never broken by a missing key. Until you complete the
> steps below, the page simply looks like it did before — just renamed.

## 1. Get PA-API access

1. You must be an **Amazon Associate** in good standing. (You already are —
   store tag `petcost0e-20`.)
2. PA-API access is granted once your account has made the **required qualifying
   sales** (historically ~3 sales in 180 days). If you don't have access yet,
   the keys can't be created until you do.
3. Sign in at <https://webservices.amazon.com/paapi5/documentation/> →
   **"Join"/Manage credentials** to generate your **Access Key** and
   **Secret Key**. Save the secret key when shown — it's only displayed once.

## 2. Add the credentials to Netlify

Netlify → **Site settings → Environment variables** → add:

| Variable | Value | Required |
|---|---|---|
| `AMAZON_PAAPI_ACCESS_KEY` | your PA-API access key | ✅ |
| `AMAZON_PAAPI_SECRET_KEY` | your PA-API secret key | ✅ |
| `AMAZON_PAAPI_PARTNER_TAG` | `petcost0e-20` | optional (defaults to this) |
| `AMAZON_PAAPI_HOST` | `webservices.amazon.com` | optional (US default) |
| `AMAZON_PAAPI_REGION` | `us-east-1` | optional (US default) |
| `AMAZON_PAAPI_MARKETPLACE` | `www.amazon.com` | optional (US default) |

Then **trigger a redeploy** (Deploys → Trigger deploy → Clear cache and deploy).

⚠️ **Never commit these keys to git or paste them in chat.** Netlify env vars
are the only place they belong.

## 3. How it works (for reference)

- `lib/amazonPaapi.ts` — signs each request with AWS SigV4 (no external deps)
  and calls `SearchItems` (`SearchIndex: PetSupplies`, `ItemCount: 1`).
- The page fetches **sequentially with ~1.1s spacing** to respect PA-API's
  default 1 request/second throttle. New PA-API accounts start at 1 req/sec and
  8,640 requests/day; the limit rises with your referred sales.
- Results are cached for **24 hours** (`export const revalidate = 86400` on the
  page + `next: { revalidate }` on the fetch).
- Product cards still **link to a generic Amazon search** (your "keep generic
  categories" choice); only the *image* (and optional price) comes from PA-API.

## 4. Image domains

`next.config.mjs` already whitelists Amazon's image hosts so `next/image` can
optimise them:

- `m.media-amazon.com`
- `images-na.ssl-images-amazon.com`

## Troubleshooting

- **Still seeing emoji cards after deploy?** Check the build log for PA-API
  errors, confirm both keys are set, and that your account actually has PA-API
  access (a brand-new Associate account without qualifying sales cannot call it).
- **Some cards have images, others don't?** A query returned no PetSupplies
  result, or hit the rate limit — those cards fall back individually. Tweak the
  `query` / `bannerQuery` strings in `app/tools/gear/page.tsx` if a category
  consistently returns nothing.

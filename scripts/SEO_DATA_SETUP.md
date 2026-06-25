# GA4 + GSC Auto-Pull Setup (free, one-time ~20 min)

This lets the daily CEO Growth Report pull **real** Google Analytics 4 and Google
Search Console data automatically — no manual exports. It uses Google's own free
APIs via a read-only service account. Cost: $0/month.

Script: `scripts/seo_data_pull.py`

---

## Step 1 — Create a Google Cloud project + service account

1. Go to https://console.cloud.google.com/ → create a project (e.g. `petcost-reporting`).
2. **APIs & Services → Library** → enable both:
   - **Google Analytics Data API**
   - **Google Search Console API**
3. **APIs & Services → Credentials → Create credentials → Service account.**
   - Name it `petcost-report-reader`. Skip the optional role grants. Create.
4. Open the new service account → **Keys → Add key → Create new key → JSON.**
   - A `.json` file downloads. This is the credential. **Keep it private — never commit it.**
   - Copy the service account's email (looks like
     `petcost-report-reader@petcost-reporting.iam.gserviceaccount.com`).

## Step 2 — Grant the service account READ access

**GA4:** Admin (gear, bottom-left) → **Property Access Management** → **+** →
add the service-account email with role **Viewer** → save.

**Search Console:** open your property at https://search.google.com/search-console
→ **Settings → Users and permissions → Add user** → paste the service-account email →
permission **Full** (Restricted also works for read) → add.

## Step 3 — Find your IDs

- **GA4 numeric property ID:** GA4 Admin → **Property Settings** → top-right shows a
  number like `443219876`. ⚠️ This is NOT the `G-XXXXXXXXXX` measurement ID.
- **GSC site URL:** if your property is a *Domain* property, use
  `sc-domain:petcost-calculator.com`. If it's a *URL-prefix* property, use the exact
  prefix, e.g. `https://petcost-calculator.com/` (trailing slash matters).

## Step 4 — Store the credentials

Put the JSON key somewhere the daily task can read it. Two options:

**A. Local file (simplest for the scheduled task on this machine):**
Save it outside the repo, e.g. `~/.config/petcost/ga-sa.json`, then set env vars
(add to your shell profile so they persist):

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/petcost/ga-sa.json"
# GA4_PROPERTY_ID (477244403) and GSC_SITE_URL (sc-domain:petcost-calculator.com)
# are already baked into the script as defaults — only set these to override.
```

> **GA4 property ID `477244403` and GSC site `sc-domain:petcost-calculator.com`
> are already set as script defaults.** The only env var you *must* provide is
> `GOOGLE_APPLICATION_CREDENTIALS` (the service-account key path).

**B. Netlify env var (if you ever run this in CI/build):** base64 the JSON and store
it as a build env var, decoding to a temp file at runtime. Not needed for the local
daily task.

> The repo `.gitignore` already excludes the key path below — confirm the JSON is
> never staged. If in doubt: `git status` should not show the `.json`.

## Step 5 — Install deps and test

```bash
pip install google-analytics-data google-api-python-client google-auth
python scripts/seo_data_pull.py --days 28
```

You should see a markdown report of sessions, top pages, channels, key events,
plus GSC clicks/impressions/CTR/position, top queries, and CTR opportunities.

## Step 6 — Wire into the daily report

Once it runs cleanly, the daily CEO report task will run:

```bash
python scripts/seo_data_pull.py --days 28 --json /tmp/petcost-seo.json
```

and read the numbers into sections 3, 4, and 12 automatically — no more "no data
available" note.

---

## Notes
- The script reads "key events" by `eventName`. Tell me (or check GA4 → Admin →
  Events) the exact event names you use for **calculator completion**, **email
  signup**, and **affiliate click**, and I'll label them in the report output.
- GSC data lags ~2–3 days, so the script ends the date range at yesterday.
- Everything is **read-only**: the service account cannot change anything in GA4,
  GSC, or your site.

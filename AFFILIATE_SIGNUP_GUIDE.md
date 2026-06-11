# Affiliate Program Signup Guide

This is your checklist for signing up to the affiliate/partner programs that power the
"Recommended products" and insurance comparison links across petcost-calculator.com.

All links currently point to plain (non-tracking) URLs, defined in `lib/affiliateLinks.ts`.
Once you're approved for a program, come back to that file and paste your tracking link
into the matching `affiliateUrl` field — the site will pick it up automatically on the
next deploy.

---

## 1. US Pet Insurance

### Healthy Paws
- Apply: search "Healthy Paws affiliate program" — they run a direct, in-house partner
  program (not on ShareASale/CJ/Impact/Awin). Application form is at
  healthypawspetinsurance.com/partners/affiliate.
- Commission: typically a flat fee per approved policy referral.
- **Known issue (June 2026):** the entire healthypawspetinsurance.com domain (including
  the `partners.` and `www16.` subdomains) is behind Cloudflare bot-detection and returned
  "Sorry, you have been blocked" for both Darren and Claude's browser session. This is not
  account-specific — it's blocking automated/flagged traffic generally.
  - Try again from a normal browser, no VPN, ideally from a different network/device
    (e.g. phone) to see if it loads.
  - If still blocked, try reaching out via their social media (Facebook/Instagram) or by
    mail at: Healthy Paws Pet Insurance, P.O. Box 50034, Bellevue, WA 98015, requesting
    affiliate program details.
  - Consider deprioritizing Healthy Paws if it remains inaccessible — Embrace, Lemonade,
    etc. (below) are easier to apply to via established networks.
- Once approved: paste your tracking link into `insuranceLinks.healthyPaws.affiliateUrl`.

### Embrace Pet Insurance
- Network: **Impact** (impact.com)
- Apply: create a free Impact publisher account at app.impact.com, then search for
  "Embrace Pet Insurance" in their marketplace and apply to the program.
- Commission: pay-per-lead/quote, varies by program terms.
- Once approved: paste your Impact tracking link into `insuranceLinks.embrace.affiliateUrl`.

### ASPCA Pet Insurance
- Apply: aspcapetinsurance.com has a "for affiliates" / partner page — apply directly
  through their site (they run their own program rather than a major network).
- Commission: pay-per-lead, check their partner terms after approval.
- Once approved: paste the link into `insuranceLinks.aspca.affiliateUrl`.

---

## 2. UK Pet Insurance

### Petplan (UK)
- Network: **Awin**
- Apply: create a free Awin publisher account at awin.com, then search the Awin
  advertiser directory for "Petplan" and apply to join their program.
- Commission: typically pay-per-sale or pay-per-lead on new policies.
- Once approved: paste your Awin deep link into `insuranceLinks.petplanUK.affiliateUrl`.

### Tesco Pet Insurance (UK)
- Note: the old `tesco.com/zones/...` link was dead — the site now points to
  `tesco-bank.com/insurance/pet-insurance/`, which works without any affiliate ID.
- Network: Tesco Bank financial products are typically run through **Optimise**
  (formerly Affiliate Window's financial arm) rather than the main Awin/Tesco retail
  program — search "Tesco Bank affiliate program Optimise" to find the current
  application page.
- Once approved: paste your tracking link into `insuranceLinks.tescoUK.affiliateUrl`.

---

## 3. Australian Pet Insurance

### Real Insurance (AU)
- No public self-serve affiliate program was found during research.
- Apply: contact Real Insurance / Auto & General (their parent company) directly via
  their corporate site and ask about a referral/partner arrangement for content sites.
- Once you have a tracking link: paste it into `insuranceLinks.realInsuranceAU.affiliateUrl`.

### PetSure (AU)
- Network: **Commission Factory** (the main AU affiliate network)
- Apply: create a free Commission Factory publisher account, then search for "PetSure"
  (or its retail brands — PetSure underwrites policies for several AU pet insurance
  brands) in the advertiser directory. You can also check petsure.com.au for a
  "Partners" page.
- Once approved: paste your Commission Factory link into `insuranceLinks.petSureAU.affiliateUrl`.

---

## 4. Pet Products

### Chewy
- Network: **Partnerize**
- Apply: go to join.partnerize.com/chewy/en_us and apply to the Chewy publisher program.
- Commission: roughly 4% of sale + a bonus (around $15) for new customer referrals.
- Once approved: paste your Partnerize tracking link into `productLinks.chewy.affiliateUrl`.
  The current direct link points to Chewy's dog food search results
  (`chewy.com/s?query=dog+food`) — you can swap this for any Chewy category/product
  page once you have your tracking ID.

### Amazon Pet Supplies
- Network: **Amazon Associates**
- Apply: affiliate-program.amazon.com — sign up with your site URL
  (petcost-calculator.com) and get approved (usually requires a few qualifying sales
  within 180 days, so make your first few sales happen quickly after approval).
- Commission: pet supplies category is typically around 3%.
- Once approved: build your tagged Amazon link (e.g.
  `https://www.amazon.com/pet-supplies/b?node=2619533011&tag=YOURTAG-20`) and paste it
  into `productLinks.amazonPetSupplies.affiliateUrl`.
- **Important Amazon rule**: Associates links must say "as an Amazon Associate I earn
  from qualifying purchases" somewhere on pages with Amazon links — the affiliate
  disclosure already on the insurance compare page covers this generally, but consider
  adding similar wording near the Chewy/Amazon block in the calculator results.

---

## How to update a link once approved

1. Open `lib/affiliateLinks.ts`.
2. Find the relevant entry (e.g. `insuranceLinks.healthyPaws`).
3. Set `affiliateUrl` to your tracking link, e.g.:
   ```ts
   healthyPaws: {
     name: "Healthy Paws",
     directUrl: "https://www.healthypaws.com",
     affiliateUrl: "https://your-tracking-link-here",
   },
   ```
4. Commit and push — Netlify will redeploy automatically.

Every link still gets `?utm_source=petcost-calculator&utm_medium=referral` appended
automatically, so you can also track clicks in Google Analytics even before any
affiliate IDs are wired up.

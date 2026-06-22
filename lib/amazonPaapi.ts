/**
 * Amazon Product Advertising API 5.0 client (SearchItems).
 * --------------------------------------------------------
 * Used by the Pet Essentials page to show the current top product image for
 * each curated search query, while the cards still LINK to a generic Amazon
 * search (keeping the "browse the category" model).
 *
 * REQUIRED ENVIRONMENT VARIABLES (set in Netlify → Site settings → Env vars):
 *   AMAZON_PAAPI_ACCESS_KEY   — PA-API access key
 *   AMAZON_PAAPI_SECRET_KEY   — PA-API secret key
 *   AMAZON_PAAPI_PARTNER_TAG  — Associates store/tracking ID (defaults to petcost0e-20)
 *
 * Optional (US defaults shown):
 *   AMAZON_PAAPI_HOST    — webservices.amazon.com
 *   AMAZON_PAAPI_REGION  — us-east-1
 *   AMAZON_PAAPI_MARKETPLACE — www.amazon.com
 *
 * If credentials are missing or any call fails, every function degrades to
 * null / empty so the page falls back to its emoji + search-link cards. The
 * live site is therefore never broken by a missing key or an API error.
 *
 * NOTE: PA-API access requires an Amazon Associates account that has made the
 * required qualifying sales. See AMAZON_PAAPI_SETUP.md in the repo root.
 */

import crypto from "crypto";

export type AmazonItem = {
  title: string;
  imageUrl: string;
  detailUrl: string;
  price: string | null;
};

const SERVICE = "ProductAdvertisingAPI";
const TARGET = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";
const PATH = "/paapi5/searchitems";

function cfg() {
  const accessKey = process.env.AMAZON_PAAPI_ACCESS_KEY;
  const secretKey = process.env.AMAZON_PAAPI_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PAAPI_PARTNER_TAG || "petcost0e-20";
  const host = process.env.AMAZON_PAAPI_HOST || "webservices.amazon.com";
  const region = process.env.AMAZON_PAAPI_REGION || "us-east-1";
  const marketplace = process.env.AMAZON_PAAPI_MARKETPLACE || "www.amazon.com";
  return { accessKey, secretKey, partnerTag, host, region, marketplace };
}

/** True only when both API keys are present. */
export function paapiConfigured(): boolean {
  const { accessKey, secretKey } = cfg();
  return Boolean(accessKey && secretKey);
}

const sha256hex = (data: string) =>
  crypto.createHash("sha256").update(data, "utf8").digest("hex");

const hmac = (key: crypto.BinaryLike | Buffer, data: string) =>
  crypto.createHmac("sha256", key).update(data, "utf8").digest();

function signingKey(secret: string, dateStamp: string, region: string) {
  const kDate = hmac("AWS4" + secret, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, SERVICE);
  return hmac(kService, "aws4_request");
}

/** Single SearchItems call returning the top matching item, or null. */
export async function searchTopItem(keywords: string): Promise<AmazonItem | null> {
  const { accessKey, secretKey, partnerTag, host, region, marketplace } = cfg();
  if (!accessKey || !secretKey) return null;

  const payload = JSON.stringify({
    Keywords: keywords,
    SearchIndex: "PetSupplies",
    ItemCount: 1,
    Resources: [
      "Images.Primary.Large",
      "ItemInfo.Title",
      "Offers.Listings.Price",
    ],
    PartnerTag: partnerTag,
    PartnerType: "Associates",
    Marketplace: marketplace,
  });

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
  const dateStamp = amzDate.slice(0, 8);

  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:application/json; charset=utf-8\n` +
    `host:${host}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${TARGET}\n`;
  const signedHeaders =
    "content-encoding;content-type;host;x-amz-date;x-amz-target";

  const canonicalRequest = [
    "POST",
    PATH,
    "",
    canonicalHeaders,
    signedHeaders,
    sha256hex(payload),
  ].join("\n");

  const scope = `${dateStamp}/${region}/${SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256hex(canonicalRequest),
  ].join("\n");

  const signature = crypto
    .createHmac("sha256", signingKey(secretKey, dateStamp, region))
    .update(stringToSign, "utf8")
    .digest("hex");

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  try {
    const res = await fetch(`https://${host}${PATH}`, {
      method: "POST",
      headers: {
        "content-encoding": "amz-1.0",
        "content-type": "application/json; charset=utf-8",
        host,
        "x-amz-date": amzDate,
        "x-amz-target": TARGET,
        Authorization: authorization,
      },
      body: payload,
      // Cache at the data layer for a day; page-level revalidate also applies.
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;
    const data: any = await res.json();
    const item = data?.SearchResult?.Items?.[0];
    if (!item) return null;

    const imageUrl: string | undefined = item?.Images?.Primary?.Large?.URL;
    const detailUrl: string | undefined = item?.DetailPageURL;
    const title: string =
      item?.ItemInfo?.Title?.DisplayValue || keywords;
    const price: string | null =
      item?.Offers?.Listings?.[0]?.Price?.DisplayAmount ?? null;

    if (!imageUrl || !detailUrl) return null;
    return { title, imageUrl, detailUrl, price };
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch the top item for many queries, SEQUENTIALLY and rate-limited, so we
 * stay within PA-API's default 1 request/second throttle. Results are cached
 * per query for the life of the server process. Returns a Map keyed by query;
 * missing/failed queries are simply absent. Returns an empty Map if PA-API is
 * not configured (page then renders its emoji fallback cards).
 */
const memo = new Map<string, AmazonItem | null>();

export async function fetchTopItems(
  queries: string[]
): Promise<Map<string, AmazonItem>> {
  const out = new Map<string, AmazonItem>();
  if (!paapiConfigured()) return out;

  const unique = Array.from(new Set(queries));
  for (let i = 0; i < unique.length; i++) {
    const q = unique[i];
    let item = memo.has(q) ? memo.get(q)! : await searchTopItem(q);
    if (!memo.has(q)) {
      memo.set(q, item);
      // Space out only the calls we actually made (not cached hits).
      if (i < unique.length - 1) await sleep(1100);
    }
    if (item) out.set(q, item);
  }
  return out;
}

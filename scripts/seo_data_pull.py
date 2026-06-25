#!/usr/bin/env python3
"""
seo_data_pull.py — Pull real first-party GA4 + Google Search Console data.

Used by the daily CEO Growth Report scheduled task so it no longer needs
manual GA4/GSC exports. Free: uses Google's own GA4 Data API and
Search Console API via a read-only service account.

ENV VARS (set these before running — see scripts/SEO_DATA_SETUP.md):
  GOOGLE_APPLICATION_CREDENTIALS  Absolute path to the service-account JSON key.
  GA4_PROPERTY_ID                 Numeric GA4 property ID, e.g. "443219876"
                                  (NOT the G-XXXX measurement ID).
  GSC_SITE_URL                    GSC property, e.g. "sc-domain:petcost-calculator.com"
                                  or "https://petcost-calculator.com/".

USAGE:
  python scripts/seo_data_pull.py                 # last 28 days, prints markdown
  python scripts/seo_data_pull.py --days 7
  python scripts/seo_data_pull.py --json out.json # also write raw JSON

DEPENDENCIES:
  pip install google-analytics-data google-api-python-client google-auth
"""

import argparse
import datetime as dt
import json
import os
import sys

SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
]


def _fail(msg: str) -> "NoReturn":  # type: ignore[name-defined]
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def _date_range(days: int):
    end = dt.date.today() - dt.timedelta(days=1)  # GSC data lags ~2-3 days; GA4 is fresher
    start = end - dt.timedelta(days=days - 1)
    return start.isoformat(), end.isoformat()


# --------------------------------------------------------------------------- #
# GA4
# --------------------------------------------------------------------------- #
def pull_ga4(property_id: str, creds, start: str, end: str) -> dict:
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Metric,
        OrderBy,
        RunReportRequest,
    )

    client = BetaAnalyticsDataClient(credentials=creds)
    prop = f"properties/{property_id}"
    dr = [DateRange(start_date=start, end_date=end)]

    # 1) Site-wide totals
    totals_req = RunReportRequest(
        property=prop,
        date_ranges=dr,
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="screenPageViews"),
            Metric(name="engagementRate"),
            Metric(name="averageSessionDuration"),
            Metric(name="bounceRate"),
        ],
    )
    totals_res = client.run_report(totals_req)
    totals = {}
    if totals_res.rows:
        mh = [m.name for m in totals_res.metric_headers]
        vals = [v.value for v in totals_res.rows[0].metric_values]
        totals = dict(zip(mh, vals))

    # 2) Top landing pages by sessions
    pages_req = RunReportRequest(
        property=prop,
        date_ranges=dr,
        dimensions=[Dimension(name="landingPagePlusQueryString")],
        metrics=[Metric(name="sessions"), Metric(name="engagementRate")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=15,
    )
    pages_res = client.run_report(pages_req)
    top_pages = [
        {
            "page": r.dimension_values[0].value,
            "sessions": r.metric_values[0].value,
            "engagementRate": r.metric_values[1].value,
        }
        for r in pages_res.rows
    ]

    # 3) Key events (calculator completions, email signups, affiliate clicks).
    #    Rename these to match the event names actually configured in GA4.
    events_req = RunReportRequest(
        property=prop,
        date_ranges=dr,
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="eventCount")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
        limit=25,
    )
    events_res = client.run_report(events_req)
    events = [
        {"event": r.dimension_values[0].value, "count": r.metric_values[0].value}
        for r in events_res.rows
    ]

    # 4) Channel breakdown
    chan_req = RunReportRequest(
        property=prop,
        date_ranges=dr,
        dimensions=[Dimension(name="sessionDefaultChannelGroup")],
        metrics=[Metric(name="sessions")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=12,
    )
    chan_res = client.run_report(chan_req)
    channels = [
        {"channel": r.dimension_values[0].value, "sessions": r.metric_values[0].value}
        for r in chan_res.rows
    ]

    return {"totals": totals, "topPages": top_pages, "events": events, "channels": channels}


# --------------------------------------------------------------------------- #
# Search Console
# --------------------------------------------------------------------------- #
def pull_gsc(site_url: str, creds, start: str, end: str) -> dict:
    from googleapiclient.discovery import build

    service = build("searchconsole", "v1", credentials=creds, cache_discovery=False)

    def query(dimensions, limit=20):
        body = {
            "startDate": start,
            "endDate": end,
            "dimensions": dimensions,
            "rowLimit": limit,
        }
        resp = service.searchanalytics().query(siteUrl=site_url, body=body).execute()
        return resp.get("rows", [])

    # Site totals (no dimensions)
    totals_rows = query([], limit=1)
    site_totals = {}
    if totals_rows:
        r = totals_rows[0]
        site_totals = {
            "clicks": r.get("clicks", 0),
            "impressions": r.get("impressions", 0),
            "ctr": r.get("ctr", 0),
            "position": r.get("position", 0),
        }

    def shape(rows, key):
        return [
            {
                key: r["keys"][0],
                "clicks": r.get("clicks", 0),
                "impressions": r.get("impressions", 0),
                "ctr": round(r.get("ctr", 0) * 100, 2),
                "position": round(r.get("position", 0), 1),
            }
            for r in rows
        ]

    top_queries = shape(query(["query"], 25), "query")
    top_pages = shape(query(["page"], 25), "page")

    # High-impression / low-CTR opportunities (the CTR-rewrite targets)
    opportunities = sorted(
        [q for q in top_queries if q["impressions"] >= 50],
        key=lambda x: (x["impressions"], -x["ctr"]),
        reverse=True,
    )[:15]

    return {
        "totals": site_totals,
        "topQueries": top_queries,
        "topPages": top_pages,
        "ctrOpportunities": opportunities,
    }


# --------------------------------------------------------------------------- #
# Markdown digest
# --------------------------------------------------------------------------- #
def to_markdown(ga4: dict, gsc: dict, start: str, end: str) -> str:
    L = [f"# SEO Data Pull — {start} to {end}", ""]

    L.append("## GA4 — Traffic")
    t = ga4.get("totals", {})
    if t:
        L.append(
            f"- Sessions: {t.get('sessions','?')} | Users: {t.get('totalUsers','?')} | "
            f"Pageviews: {t.get('screenPageViews','?')}"
        )
        L.append(
            f"- Engagement rate: {t.get('engagementRate','?')} | "
            f"Avg session (s): {t.get('averageSessionDuration','?')} | "
            f"Bounce: {t.get('bounceRate','?')}"
        )
    L.append("")
    L.append("### Top landing pages")
    L.append("| Page | Sessions | Engagement |")
    L.append("|---|---|---|")
    for p in ga4.get("topPages", []):
        L.append(f"| {p['page']} | {p['sessions']} | {p['engagementRate']} |")
    L.append("")
    L.append("### Channels")
    L.append("| Channel | Sessions |")
    L.append("|---|---|")
    for c in ga4.get("channels", []):
        L.append(f"| {c['channel']} | {c['sessions']} |")
    L.append("")
    L.append("### Key events")
    L.append("| Event | Count |")
    L.append("|---|---|")
    for e in ga4.get("events", []):
        L.append(f"| {e['event']} | {e['count']} |")
    L.append("")

    L.append("## GSC — Search")
    g = gsc.get("totals", {})
    if g:
        L.append(
            f"- Clicks: {g.get('clicks',0)} | Impressions: {g.get('impressions',0)} | "
            f"CTR: {round(g.get('ctr',0)*100,2)}% | Avg position: {round(g.get('position',0),1)}"
        )
    L.append("")
    L.append("### Top queries")
    L.append("| Query | Clicks | Impr | CTR % | Pos |")
    L.append("|---|---|---|---|---|")
    for q in gsc.get("topQueries", []):
        L.append(f"| {q['query']} | {q['clicks']} | {q['impressions']} | {q['ctr']} | {q['position']} |")
    L.append("")
    L.append("### CTR opportunities (high impressions, low CTR)")
    L.append("| Query | Impr | CTR % | Pos |")
    L.append("|---|---|---|---|")
    for q in gsc.get("ctrOpportunities", []):
        L.append(f"| {q['query']} | {q['impressions']} | {q['ctr']} | {q['position']} |")
    L.append("")
    L.append("### Top pages")
    L.append("| Page | Clicks | Impr | CTR % | Pos |")
    L.append("|---|---|---|---|---|")
    for p in gsc.get("topPages", []):
        L.append(f"| {p['page']} | {p['clicks']} | {p['impressions']} | {p['ctr']} | {p['position']} |")

    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=28)
    ap.add_argument("--json", dest="json_out", default=None, help="Optional path to write raw JSON")
    ap.add_argument("--md", dest="md_out", default=None, help="Optional path to write markdown")
    args = ap.parse_args()

    # Defaults for petcost-calculator.com — override via env vars if needed.
    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    property_id = os.environ.get("GA4_PROPERTY_ID", "477244403")
    site_url = os.environ.get("GSC_SITE_URL", "sc-domain:petcost-calculator.com")

    missing = [
        n
        for n, v in [
            ("GOOGLE_APPLICATION_CREDENTIALS", creds_path),
            ("GA4_PROPERTY_ID", property_id),
            ("GSC_SITE_URL", site_url),
        ]
        if not v
    ]
    if missing:
        _fail(
            "Missing env vars: " + ", ".join(missing) + ". See scripts/SEO_DATA_SETUP.md."
        )
    if not os.path.isfile(creds_path):
        _fail(f"Credentials file not found: {creds_path}")

    try:
        from google.oauth2 import service_account
    except ImportError:
        _fail("Run: pip install google-analytics-data google-api-python-client google-auth")

    creds = service_account.Credentials.from_service_account_file(creds_path, scopes=SCOPES)
    start, end = _date_range(args.days)

    ga4 = pull_ga4(property_id, creds, start, end)
    gsc = pull_gsc(site_url, creds, start, end)

    payload = {"range": {"start": start, "end": end}, "ga4": ga4, "gsc": gsc}

    if args.json_out:
        with open(args.json_out, "w") as f:
            json.dump(payload, f, indent=2)

    md = to_markdown(ga4, gsc, start, end)
    if args.md_out:
        with open(args.md_out, "w") as f:
            f.write(md)
    print(md)


if __name__ == "__main__":
    main()

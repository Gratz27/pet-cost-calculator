"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Tag, Star, Utensils, Bone, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import {
  partners as ALL_PARTNERS,
  CATEGORY_META,
  CATEGORY_ORDER,
  type Partner,
  type PartnerCategory,
} from "@/lib/partners";

const CAT_ICON: Record<PartnerCategory, typeof Utensils> = {
  food: Utensils,
  treats: Bone,
  supplements: HeartPulse,
  insurance: ShieldCheck,
  lifestyle: Sparkles,
};

type RegionFilter = "all" | "us" | "uk";

const MONO_COLORS = ["#2E7D32", "#1B5E20", "#388E3C", "#43A047", "#2E6B5E", "#5E8C2E"];
function monoColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return MONO_COLORS[h % MONO_COLORS.length];
}
function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function PartnerLogo({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !domain) {
    return (
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
        style={{ background: monoColor(name) }}
        aria-hidden
      >
        {initials(name)}
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#C8E6C9] bg-white overflow-hidden">
      {/* Plain <img> (not next/image) so a missing logo can fall back to a
          branded monogram without a server round-trip. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://logo.clearbit.com/${domain}?size=96`}
        alt={`${name} logo`}
        width={40}
        height={40}
        loading="lazy"
        className="h-10 w-10 object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function RegionBadge({ region }: { region: Partner["region"] }) {
  if (region === "global") return null;
  const label = region.toUpperCase();
  return (
    <span className="rounded-full bg-[#F1F8F1] border border-[#C8E6C9] px-2 py-0.5 text-[10px] font-semibold text-[#2E7D32]">
      {label}
    </span>
  );
}

function PartnerCard({ partner, topPick }: { partner: Partner; topPick: boolean }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-[#C8E6C9] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#4CAF50] hover:shadow-lg"
    >
      {topPick && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-[#2E7D32] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
          <Star className="h-3 w-3 fill-white" /> Top pick
        </span>
      )}
      <div className="flex items-center gap-3">
        <PartnerLogo name={partner.name} domain={partner.domain} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold text-[#1B2B1B] group-hover:text-[#2E7D32]">{partner.name}</h3>
            <RegionBadge region={partner.region} />
          </div>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5a7a5a]">{partner.tagline}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        {partner.coupon ? (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#4CAF50] bg-[#E8F5E9] px-2.5 py-1 text-xs font-bold text-[#1B5E20]">
            <Tag className="h-3.5 w-3.5" /> {partner.coupon}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2E7D32]">
          Visit site <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}

export default function PartnerDirectory() {
  const guessUK =
    typeof navigator !== "undefined" &&
    /en-GB|en-IE/i.test(navigator.language || "");
  const [region, setRegion] = useState<RegionFilter>(guessUK ? "uk" : "all");

  const visible = useMemo(
    () =>
      ALL_PARTNERS.filter((p) =>
        region === "all" ? true : p.region === region || p.region === "global"
      ),
    [region]
  );

  const topPickKey = useMemo(() => {
    const map: Record<string, string> = {};
    for (const cat of CATEGORY_ORDER) {
      const inCat = visible
        .filter((p) => p.category === cat && p.epcValue > 0)
        .sort((a, b) => b.epcValue - a.epcValue);
      if (inCat[0]) map[cat] = inCat[0].key;
    }
    return map;
  }, [visible]);

  const regions: { id: RegionFilter; label: string }[] = [
    { id: "all", label: "All regions" },
    { id: "us", label: "🇺🇸 US" },
    { id: "uk", label: "🇬🇧 UK" },
  ];

  return (
    <div>
      {/* Region segmented control */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-medium text-[#5a7a5a]">Showing brands for:</span>
        <div className="inline-flex rounded-xl border border-[#C8E6C9] bg-white p-1">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                region === r.id ? "bg-[#2E7D32] text-white" : "text-[#5a7a5a] hover:bg-[#E8F5E9]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = visible
          .filter((p) => p.category === cat)
          .sort((a, b) => b.epcValue - a.epcValue || a.name.localeCompare(b.name));
        if (items.length === 0) return null;
        const Icon = CAT_ICON[cat];
        const meta = CATEGORY_META[cat];
        return (
          <section key={cat} className="mb-10">
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <Icon className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <h2 className="text-xl font-bold text-[#1B2B1B]">{meta.label}</h2>
              <span className="rounded-full bg-[#F1F8F1] px-2 py-0.5 text-xs font-semibold text-[#5a7a5a]">
                {items.length}
              </span>
            </div>
            <p className="mb-4 ml-[52px] text-sm text-[#5a7a5a]">{meta.blurb}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <PartnerCard key={p.key} partner={p} topPick={topPickKey[cat] === p.key} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

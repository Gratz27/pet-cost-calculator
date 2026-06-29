import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ChevronRight, Utensils, Pill, Bone, Shield, ShoppingBag, Tag } from "lucide-react";
import { awinLinks, productLinks, resolveLink } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Partner Brands – Vetted Pet Products & Services | PetCost",
  description:
    "Brands we've partnered with and personally vetted — premium dog & cat food, supplements, treats, insurance, and supplies. We earn a small commission at no extra cost to you.",
  alternates: { canonical: "https://petcost-calculator.com/partners" },
};

// ── Category config ──────────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { label: string; icon: typeof Utensils; description: string }> = {
  food:        { label: "Premium Food",          icon: Utensils,    description: "High-quality dry, wet, raw and air-dried recipes — no fillers, real ingredients." },
  supplements: { label: "Supplements & Health",  icon: Pill,        description: "Vet-formulated supplements for joint, gut, skin and immune health." },
  treats:      { label: "Treats & Accessories",  icon: Bone,        description: "Natural chews, training treats, and accessories — mostly UK brands." },
  insurance:   { label: "Pet Insurance",         icon: Shield,      description: "Accident, illness and wellness cover — compare full options on our insurance page." },
  lifestyle:   { label: "Lifestyle & Supplies",  icon: ShoppingBag, description: "Everything else: gear, subscriptions and general pet lifestyle brands." },
};

const REGION_LABEL: Record<string, string> = { uk: "🇬🇧 UK", us: "🇺🇸 US", global: "🌍 Global" };

// ── Build data ───────────────────────────────────────────────────────────────
// AWIN partners (auto-populated from affiliateLinks.ts)
const awinByCategory = Object.values(awinLinks).reduce<Record<string, typeof awinLinks[string][]>>(
  (acc, brand) => {
    if (!acc[brand.category]) acc[brand.category] = [];
    acc[brand.category].push(brand);
    return acc;
  },
  {}
);

// Non-AWIN partners we want to surface here too
const extraBrands: {
  name: string; tagline: string; region: string; category: string;
  affiliateUrl: string; couponCode?: string;
}[] = [
  {
    name: "YumWoof",
    tagline: "Air-dried, vet-designed dog food — no seed oils, personalised by breed. Use code PETCOST for 5% off.",
    region: "global",
    category: "food",
    affiliateUrl: productLinks.yumWoof.affiliateUrl!,
    couponCode: productLinks.yumWoof.couponCode,
  },
  {
    name: "BarkBox",
    tagline: "Monthly themed toy and treat boxes — tailored to your dog's size and breed.",
    region: "us",
    category: "lifestyle",
    affiliateUrl: productLinks.barkBox.affiliateUrl!,
  },
  {
    name: "Chewy",
    tagline: "Auto-ship pet food and supplies with free returns and up to 30% autoship discount.",
    region: "us",
    category: "lifestyle",
    affiliateUrl: resolveLink(productLinks.chewy),
  },
  {
    name: "Amazon Pet Supplies",
    tagline: "The widest range of pet products — food, health, gear, and accessories in one place.",
    region: "global",
    category: "lifestyle",
    affiliateUrl: productLinks.amazonPetSupplies.affiliateUrl!,
  },
];

// Merge AWIN + extra into one data structure per category
function getBrandsForCategory(cat: string) {
  const awin = (awinByCategory[cat] ?? []).map(b => ({
    name: b.name,
    tagline: b.tagline,
    region: b.region,
    category: b.category,
    affiliateUrl: b.affiliateUrl,
    couponCode: b.couponCode,
  }));
  const extra = extraBrands.filter(b => b.category === cat);
  return [...awin, ...extra];
}

// ── Brand card ───────────────────────────────────────────────────────────────
function BrandCard({ brand }: { brand: ReturnType<typeof getBrandsForCategory>[number] }) {
  return (
    <a
      href={brand.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col rounded-xl bg-[#F1F8F1] border border-[#C8E6C9] p-5 hover:border-[#4CAF50] hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-sm font-bold text-[#1B2B1B] group-hover:text-[#2E7D32]">{brand.name}</span>
        <span className="shrink-0 text-[10px] font-semibold bg-white border border-[#C8E6C9] rounded-full px-2 py-0.5 text-[#5a7a5a]">
          {REGION_LABEL[brand.region] ?? brand.region}
        </span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed flex-1">{brand.tagline}</p>
      {brand.couponCode && (
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] rounded-full px-2 py-0.5 self-start">
          <Tag className="h-2.5 w-2.5" /> Code: {brand.couponCode}
        </div>
      )}
      <span className="flex items-center gap-1 mt-3 text-xs font-medium text-[#2E7D32]">
        Visit {brand.name} <ExternalLink className="h-3 w-3" />
      </span>
    </a>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PartnersPage() {
  const categoryOrder: (keyof typeof CATEGORY_META)[] = ["food", "supplements", "treats", "insurance", "lifestyle"];

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Partner Brands</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white">
        <div className="container-xl py-12 md:py-16">
          <div className="max-w-2xl">
            <div className="badge bg-white/20 text-green-100 mb-4">Vetted Partners</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Partner Brands</h1>
            <p className="text-green-200 text-lg leading-relaxed mb-6">
              Every brand on this page has been reviewed by the PetCost team. We only partner with companies
              that we believe offer genuine value for pet owners — not just whoever pays the most.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-green-100">
              <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5">
                🇬🇧 UK brands available
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5">
                🇺🇸 US brands available
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5">
                🌍 Global brands available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works banner */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-4">
          <p className="text-sm text-[#5a7a5a] text-center">
            <span className="font-semibold text-[#1B2B1B]">How this works:</span>{" "}
            When you buy through a link on this page, we may earn a small affiliate commission at no extra cost to you.
            This is how we keep PetCost free. It never influences which brands we list or recommend.
          </p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="max-w-5xl mx-auto space-y-10">

          {categoryOrder.map((cat) => {
            const brands = getBrandsForCategory(cat);
            if (brands.length === 0) return null;
            const { label, icon: Icon, description } = CATEGORY_META[cat];
            return (
              <section key={cat} id={cat}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] flex-shrink-0">
                    <Icon className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1B2B1B]">{label}</h2>
                    <p className="text-sm text-[#5a7a5a]">{description}</p>
                  </div>
                </div>

                {/* Brand grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brands.map((brand) => (
                    <BrandCard key={brand.name} brand={brand} />
                  ))}
                </div>

                {/* Insurance: link to full compare page */}
                {cat === "insurance" && (
                  <div className="mt-4 rounded-xl bg-white border border-[#C8E6C9] p-4 flex items-center justify-between gap-4">
                    <p className="text-sm text-[#5a7a5a]">
                      Looking for UK or Australian insurance? Compare all providers including Petplan, Tesco and PetSure.
                    </p>
                    <Link href="/tools/insurance-compare" className="btn-green text-sm whitespace-nowrap shrink-0">
                      Compare all →
                    </Link>
                  </div>
                )}
              </section>
            );
          })}

          {/* Quick-add notice for future partners */}
          <div className="rounded-xl bg-white border border-[#C8E6C9] p-6 text-center">
            <h3 className="font-bold text-[#1B2B1B] mb-1">More brands coming soon</h3>
            <p className="text-sm text-[#5a7a5a] max-w-md mx-auto">
              We're regularly onboarding new partners. Check back or{" "}
              <Link href="/contact" className="text-[#2E7D32] hover:underline">get in touch</Link>{" "}
              if you'd like to partner with PetCost.
            </p>
          </div>

          {/* Disclosure */}
          <div className="rounded-xl bg-white border border-[#C8E6C9] px-4 py-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-[#1B2B1B]">Affiliate disclosure:</span>{" "}
              Links on this page are affiliate links. If you make a purchase after clicking, we may earn a
              commission at no additional cost to you. We partner with AWIN, Amazon Associates, Impact.com,
              and direct brand programmes. Our editorial recommendations and cost data are never influenced
              by commercial relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

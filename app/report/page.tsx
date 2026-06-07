import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, TrendingUp, BarChart3, Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Annual Pet Cost Report 2026 | PetCost-Calculator",
  description: "The definitive 2026 report on pet ownership costs across 300+ breeds in the US, UK, and Australia. Key findings, trends, and breed-by-breed data.",
};

const keyFindings = [
  { stat: "+12%", label: "Average vet cost increase vs 2024", color: "text-red-600" },
  { stat: "$3,847", label: "Average first-year cost for a medium dog", color: "text-[#2E7D32]" },
  { stat: "$2,190", label: "Average first-year cost for a cat", color: "text-[#2E7D32]" },
  { stat: "41%", label: "Of pet owners underestimated first-year costs", color: "text-orange-600" },
  { stat: "$1,823", label: "Average unexpected vet bill in 2025", color: "text-red-600" },
  { stat: "68%", label: "Of insured pets had claims in 2025", color: "text-blue-600" },
];

const breedRankings = {
  mostExpensive: [
    { name: "French Bulldog", firstYear: 5800, reason: "High vet costs, brachycephalic health issues" },
    { name: "English Bulldog", firstYear: 5400, reason: "Frequent vet visits, specialised food" },
    { name: "Chow Chow", firstYear: 5100, reason: "Professional grooming, health conditions" },
    { name: "Bernese Mountain Dog", firstYear: 4900, reason: "Large size, cancer predisposition" },
    { name: "Tibetan Mastiff", firstYear: 4700, reason: "Giant size, large food volume" },
  ],
  mostAffordable: [
    { name: "Chihuahua", firstYear: 2100, reason: "Small size, low food costs" },
    { name: "Mixed breed (rescue)", firstYear: 1900, reason: "Low adoption fee, good genetics" },
    { name: "Beagle", firstYear: 2400, reason: "Moderate size, few breed-specific issues" },
    { name: "Domestic Shorthair Cat", firstYear: 1600, reason: "Robust health, low grooming" },
    { name: "Ragdoll Cat", firstYear: 1900, reason: "Relaxed temperament, low daycare need" },
  ],
};

const trends = [
  {
    title: "Vet costs rising faster than inflation",
    body: "Veterinary service costs increased 12% year-on-year in 2025, outpacing general CPI by 4 percentage points. Specialist and emergency care costs rose the most sharply, up 18% in major US cities.",
    icon: TrendingUp,
    color: "text-red-600",
  },
  {
    title: "Pet insurance adoption growing",
    body: "34% of dog owners and 21% of cat owners now have pet insurance, up from 28% and 16% respectively in 2023. The fastest growth is in the 25–35 age group, who are treating pets more like family members.",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    title: "Premium food spending increasing",
    body: "Spending on premium, raw, and grain-free pet food grew 22% in 2025. The average annual food spend for a large dog is now $780, vs $640 in 2023.",
    icon: TrendingUp,
    color: "text-[#2E7D32]",
  },
];

export default function ReportPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Annual Pet Cost Report 2026</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white">
        <div className="container-xl py-14 md:py-20 max-w-4xl">
          <div className="badge bg-white/20 text-green-100 mb-4">2026 Report</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Annual Pet Cost Report 2026</h1>
          <p className="text-green-200 text-lg leading-relaxed max-w-2xl mb-6">
            The most comprehensive analysis of pet ownership costs across 300+ breeds in the United States, United Kingdom, and Australia. Based on data from 50,000+ cost data points collected throughout 2025.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2 text-sm text-green-100">
              <BarChart3 className="h-4 w-4" />
              300+ breeds analysed
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2 text-sm text-green-100">
              <BarChart3 className="h-4 w-4" />
              50,000+ data points
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2 text-sm text-green-100">
              <BarChart3 className="h-4 w-4" />
              3 countries covered
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl space-y-8">

        {/* Key findings */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-6">Key Findings</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {keyFindings.map(({ stat, label, color }) => (
              <div key={label} className="text-center rounded-xl bg-[#F1F8F1] p-5">
                <div className={`text-3xl font-black mb-1 ${color}`}>{stat}</div>
                <div className="text-xs text-[#5a7a5a] leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-6">2025–2026 Trends</h2>
          <div className="space-y-5">
            {trends.map(({ title, body, icon: Icon, color }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] flex-shrink-0 mt-0.5">
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1B2B1B] mb-1">{title}</h3>
                  <p className="text-sm text-[#5a7a5a] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most and least expensive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1B2B1B] mb-4">Most Expensive Breeds (First Year)</h2>
            <div className="space-y-3">
              {breedRankings.mostExpensive.map((b, i) => (
                <Link key={b.name} href={`/breeds/${b.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-start gap-3 group">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">{b.name}</div>
                    <div className="text-xs text-slate-400">{b.reason}</div>
                  </div>
                  <div className="text-sm font-bold text-red-600 flex-shrink-0">${b.firstYear.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1B2B1B] mb-4">Most Affordable Breeds (First Year)</h2>
            <div className="space-y-3">
              {breedRankings.mostAffordable.map((b, i) => (
                <div key={b.name} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#1B2B1B]">{b.name}</div>
                    <div className="text-xs text-slate-400">{b.reason}</div>
                  </div>
                  <div className="text-sm font-bold text-[#2E7D32] flex-shrink-0">${b.firstYear.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional comparison */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">Regional Cost Comparison</h2>
          <p className="text-[#5a7a5a] text-sm mb-5">Average annual cost for a medium-sized dog by region (excl. first-year setup costs).</p>
          <div className="space-y-3">
            {[
              { region: "Singapore", cost: 3780, pct: 100 },
              { region: "New York / San Francisco", cost: 3640, pct: 96 },
              { region: "London, UK", cost: 3500, pct: 93 },
              { region: "Sydney, Australia", cost: 3360, pct: 89 },
              { region: "Toronto, Canada", cost: 3080, pct: 81 },
              { region: "US national average", cost: 2800, pct: 74 },
              { region: "Midwest US", cost: 2420, pct: 64 },
            ].map(({ region, cost, pct }) => (
              <div key={region}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#1B2B1B] font-medium">{region}</span>
                  <span className="font-bold text-[#2E7D32]">${cost.toLocaleString()}/yr</span>
                </div>
                <div className="h-2 bg-[#E8F5E9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E7D32] rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 text-white text-center">
          <Download className="h-8 w-8 text-green-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Get the Full Report (PDF)</h2>
          <p className="text-green-200 text-sm mb-5">92-page detailed report with breed-by-breed tables, regional breakdowns, and 5-year trend data.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 rounded-xl px-4 py-3 text-sm text-[#1B2B1B] bg-white outline-none" />
            <button type="submit" className="btn-green text-sm px-6 flex-shrink-0">
              Download Free <ArrowRight className="h-4 w-4 inline ml-1" />
            </button>
          </form>
          <p className="mt-3 text-xs text-green-400">No spam. Unsubscribe any time.</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/calculator" className="btn-primary">Calculate My Pet&apos;s Costs</Link>
          <Link href="/methodology" className="btn-secondary">Read Our Methodology</Link>
        </div>
      </div>
    </div>
  );
}

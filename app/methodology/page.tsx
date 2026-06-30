import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Database, MapPin, RefreshCw, Calculator, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Methodology – How We Calculate Pet Costs | PetCost-Calculator",
  description: "How PetCost-Calculator sources, adjusts, and validates pet ownership cost data across 300+ breeds in the US, UK, and Australia.",
};

const sources = [
  { name: "Veterinary Practice Data", detail: "Average consultation, procedure, and prescription costs from vet practices across all three regions, updated quarterly." },
  { name: "Pet Store & Online Retailer Pricing", detail: "Food, supply, and accessory costs tracked across major retailers including Chewy, Petco, Amazon, Pets at Home, and PetBarn." },
  { name: "Breeder & Rescue Surveys", detail: "Purchase and adoption fee data collected from GCCF-registered breeders, AKC-registered breeders, and rescue organisations." },
  { name: "Pet Insurance Provider Filings", detail: "Annual and monthly premium data from Healthy Paws, ASPCA, Petplan, Tesco Pet Insurance, and Real Insurance." },
  { name: "Pet Owner Panels", detail: "Self-reported actual spending data from a panel of 2,000+ pet owners across the US, UK, and Australia, audited annually." },
];

const multipliers = [
  { region: "New York, San Francisco, LA, Seattle, Boston", mult: "1.30×", note: "High-cost US metros" },
  { region: "Chicago, Austin, Denver, Portland", mult: "1.15×", note: "Mid-tier US cities" },
  { region: "US baseline (other cities)", mult: "1.00×", note: "Reference point" },
  { region: "United Kingdom", mult: "1.25×", note: "GBP-adjusted, post-Brexit vet costs" },
  { region: "Australia (Sydney, Melbourne)", mult: "1.20×", note: "AUD-adjusted" },
  { region: "Canada", mult: "1.10×", note: "CAD-adjusted" },
  { region: "Singapore", mult: "1.35×", note: "Highest cost region" },
  { region: "Germany, France, Netherlands, Switzerland", mult: "1.20×", note: "Western Europe" },
];

export default function MethodologyPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Methodology</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12 max-w-4xl">
          <div className="badge badge-green mb-3">Transparency</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-4">Our Methodology</h1>
          <p className="text-[#5a7a5a] text-lg leading-relaxed max-w-2xl">
            Every cost estimate on PetCost-Calculator is built from verified market data. This page explains exactly where the numbers come from, how we adjust for location, and how often we update.
          </p>
          <p className="text-xs text-slate-400 mt-4">Last updated: June 2026</p>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl">
        <div className="space-y-8">

          {/* Data sources */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <Database className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <h2 className="text-xl font-bold text-[#1B2B1B]">Data Sources</h2>
            </div>
            <p className="text-[#5a7a5a] mb-5">
              Our cost data is compiled from five primary sources, each weighted by sample size and recency. No single source drives any estimate — we cross-validate all figures before publishing.
            </p>
            <div className="space-y-4">
              {sources.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32] font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1B2B1B] mb-0.5">{s.name}</h3>
                    <p className="text-sm text-[#5a7a5a]">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional adjustments */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <MapPin className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <h2 className="text-xl font-bold text-[#1B2B1B]">Regional Cost Adjustments</h2>
            </div>
            <p className="text-[#5a7a5a] mb-5">
              Pet ownership costs vary significantly by geography. Our regional multipliers are applied to all vet, food, grooming, and daycare estimates. The US national average serves as the baseline (1.00×).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#E8F5E9]">
                    <th className="text-left px-4 py-3 text-[#1B2B1B] font-semibold rounded-tl-xl">Region</th>
                    <th className="text-center px-4 py-3 text-[#1B2B1B] font-semibold">Multiplier</th>
                    <th className="text-left px-4 py-3 text-[#1B2B1B] font-semibold rounded-tr-xl">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {multipliers.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F1F8F1]"}>
                      <td className="px-4 py-3 text-[#1B2B1B]">{m.region}</td>
                      <td className="px-4 py-3 text-center font-bold text-[#2E7D32]">{m.mult}</td>
                      <td className="px-4 py-3 text-[#5a7a5a]">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Update frequency */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <RefreshCw className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <h2 className="text-xl font-bold text-[#1B2B1B]">Update Frequency</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { label: "Food & supply prices", freq: "Monthly", color: "bg-green-100 text-green-800" },
                { label: "Vet & grooming costs", freq: "Quarterly", color: "bg-blue-100 text-blue-800" },
                { label: "Insurance premiums", freq: "Annually", color: "bg-orange-100 text-orange-800" },
              ].map(({ label, freq, color }) => (
                <div key={label} className="rounded-xl bg-[#F1F8F1] p-4">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${color}`}>{freq}</span>
                  <p className="text-sm text-[#1B2B1B] font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculation model */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <Calculator className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <h2 className="text-xl font-bold text-[#1B2B1B]">How the Calculator Works</h2>
            </div>
            <div className="article-content">
              <p>The calculator combines five inputs: your chosen breed, location, living situation, work schedule, and cost preferences. Here is how each affects the output:</p>
              <ul>
                <li><strong>Breed</strong> — Sets base costs for food, vet care, grooming, insurance, and lifespan from our breed database of 300+ profiles.</li>
                <li><strong>Location</strong> — Applies a regional multiplier to all variable costs (vet, food, grooming, daycare).</li>
                <li><strong>Living situation</strong> — Renting adds an estimated pet deposit of $400 to first-year costs.</li>
                <li><strong>Work schedule</strong> — Full-time office workers who choose daily daycare see higher annual costs than remote workers.</li>
                <li><strong>Food type</strong> — Premium or raw diet food is estimated at 1.5× the standard food cost for that breed.</li>
                <li><strong>Grooming frequency</strong> — From DIY (0.2× base) to every 1–2 weeks (2.0× base).</li>
                <li><strong>Insurance</strong> — Definite insurance adds the full annual premium; &ldquo;possibly&rdquo; adds 50%.</li>
              </ul>
              <p>Lifetime costs are calculated as: First Year + (Annual × (Lifespan − 1)). The 10-year forecast tab applies a user-adjustable inflation rate (0–8%) to model cost growth.</p>
            </div>
          </div>

          {/* What it can and can't tell you */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">What Our Estimates Can and Can&apos;t Tell You</h2>
            <p className="text-[#5a7a5a] leading-relaxed mb-3">
              Our figures are designed to answer one question well: &quot;what should I realistically budget for
              this pet?&quot; They are averages and ranges built from market data, and they are most accurate when
              used as a planning guide. There are limits worth being honest about:
            </p>
            <ul className="article-content">
              <li><strong>Individual health is unpredictable.</strong> Two dogs of the same breed can have very different lifetime vet costs. We model typical breed risks, but we can&apos;t foresee an individual animal&apos;s specific conditions.</li>
              <li><strong>Major emergencies are one-off, not annual.</strong> A single surgery or cancer diagnosis can dwarf a year&apos;s routine costs. We flag emergency-fund guidance separately rather than smearing rare events across every year.</li>
              <li><strong>Local providers vary.</strong> Even within one city, vet and grooming prices differ between practices. Our regional multipliers capture the average, not your specific clinic.</li>
              <li><strong>Your choices move the number.</strong> Food quality, insurance level, grooming frequency, and whether you use boarding or daycare can each shift the total by hundreds per year.</li>
            </ul>
          </div>

          {/* How to get the most accurate estimate */}
          <div className="card p-8">
            <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">How to Get the Most Accurate Estimate</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              To make your result as close to reality as possible, select the breed that most closely matches
              your pet (or, for a mixed breed, the closest dominant breed or size), choose your nearest major
              city so the right regional multiplier is applied, and answer the lifestyle questions based on what
              you&apos;ll genuinely do — not the cheapest theoretical option. If you&apos;re deciding between
              breeds, run the calculator for each and compare the lifetime totals; the gap is often larger than
              people expect and is one of the most useful inputs to a sensible decision. Finally, treat the
              emergency-fund guidance as a real line item: the owners least likely to face financial stress are
              the ones who set money aside (or insure early) before they ever need it.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-2">Disclaimer</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  All cost estimates are provided for informational and planning purposes only. Actual costs depend on individual pet health, owner choices, and local market conditions. PetCost-Calculator is not a financial adviser. You should consult a veterinarian for breed-specific health cost expectations.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-4">
            <Link href="/calculator" className="btn-primary">
              Try the Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

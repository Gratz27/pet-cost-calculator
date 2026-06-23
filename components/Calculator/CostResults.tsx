"use client";

import { useState } from "react";
import { RotateCcw, Share2, AlertTriangle, TrendingUp, Shield, Lightbulb, Printer, ExternalLink, Mail } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { type CostBreakdown, type CalculatorInputs, getBreedById, getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import { productLinks, insuranceCompareCta, resolveLink, amazonSearchLink, recommendedSuppliesQuery } from "@/lib/affiliateLinks";
import Link from "next/link";
import BreedImage from "@/components/BreedImage";

// Pure-SVG donut chart — renders reliably at any viewport width (recharts'
// ResponsiveContainer collapsed to 0px inside flex parents on mobile).
function DonutChart({ data, colors }: { data: { name: string; value: number }[]; colors: string[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total <= 0) return null;
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <svg viewBox="0 0 200 200" className="w-44 h-44" role="img" aria-label="Cost distribution chart">
        {data.map((d, i) => {
          const frac = d.value / total;
          const seg = (
            <circle
              key={d.name}
              cx="100" cy="100" r={R}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth="34"
              strokeDasharray={`${frac * C} ${C}`}
              strokeDashoffset={-offset * C}
              transform="rotate(-90 100 100)"
            />
          );
          offset += frac;
          return seg;
        })}
        <text x="100" y="96" textAnchor="middle" className="fill-[#1B2B1B]" fontSize="20" fontWeight="700">
          {formatCurrency(total)}
        </text>
        <text x="100" y="116" textAnchor="middle" className="fill-[#5a7a5a]" fontSize="11">
          first year
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {data.map((d, i) => (
          <span key={d.name} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: colors[i % colors.length] }} />
            {d.name} {Math.round((d.value / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
}

interface Props {
  results: CostBreakdown;
  inputs: CalculatorInputs;
  onReset: () => void;
}

const COLORS = ["#2E7D32", "#4CAF50", "#1565C0", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

function buildProjectionData(annual: number, firstYear: number, years = 10, inflation = 0.04) {
  const rows: { year: string; cost: number; cumulative: number }[] = [];
  let cumulative = 0;
  for (let i = 0; i < years; i++) {
    const cost = i === 0 ? firstYear : Math.round(annual * Math.pow(1 + inflation, i));
    cumulative += cost;
    rows.push({ year: `Yr ${i + 1}`, cost, cumulative });
  }
  return rows;
}

// National average annual costs by region
const NATIONAL_AVG_ANNUAL: Record<string, { dog: number; cat: number; label: string; currency: string }> = {
  us:  { dog: 2600, cat: 1400, label: "US national average",  currency: "USD" },
  uk:  { dog: 1800, cat: 950,  label: "UK national average",  currency: "GBP" },
  au:  { dog: 2200, cat: 1200, label: "AU national average",  currency: "AUD" },
  ca:  { dog: 2400, cat: 1300, label: "CA national average",  currency: "CAD" },
  sg:  { dog: 3200, cat: 1800, label: "SG national average",  currency: "SGD" },
};

function detectRegion(location: string): string {
  const loc = location.toLowerCase();
  if (/london|manchester|edinburgh|uk|united kingdom|england|scotland|wales/.test(loc)) return "uk";
  if (/sydney|melbourne|brisbane|perth|adelaide|australia|au\b/.test(loc)) return "au";
  if (/toronto|vancouver|montreal|calgary|canada/.test(loc)) return "ca";
  if (/singapore/.test(loc)) return "sg";
  return "us";
}

export default function CostResults({ results, inputs, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "annual" | "lifetime" | "projection">("overview");
  const [inflationRate, setInflationRate] = useState(4);
  const [emailSaved, setEmailSaved] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const breed = getBreedById(inputs.petType, inputs.breedId);

  // Cheaper alternatives: same pet type, same size, lower base annual costs
  const alternatives = getAllBreeds(inputs.petType)
    .filter((b) => b.id !== inputs.breedId && b.size === (breed?.size ?? "medium"))
    .map((b) => ({ ...b, baseAnnual: b.annualFood + b.annualVet + b.annualGrooming }))
    .sort((a, b) => a.baseAnnual - b.baseAnnual)
    .slice(0, 3);

  const currentBaseAnnual = (breed?.annualFood ?? 0) + (breed?.annualVet ?? 0) + (breed?.annualGrooming ?? 0);

  const firstYearData = [
    { name: "Purchase/Adoption", value: Math.round(results.firstYear.adoptionFee) },
    { name: "Initial Vet", value: Math.round(results.firstYear.initialVet) },
    { name: "Supplies", value: Math.round(results.firstYear.supplies) },
    { name: "Food", value: Math.round(results.firstYear.food) },
    { name: "Grooming", value: Math.round(results.firstYear.grooming) },
    { name: "Training", value: Math.round(results.firstYear.training) },
    { name: "Insurance", value: Math.round(results.firstYear.insurance) },
  ].filter(d => d.value > 0);

  const annualData = [
    { name: "Food", value: Math.round(results.annual.food) },
    { name: "Vet", value: Math.round(results.annual.vet) },
    { name: "Grooming", value: Math.round(results.annual.grooming) },
    { name: "Insurance", value: Math.round(results.annual.insurance) },
    { name: "Supplies", value: Math.round(results.annual.supplies) },
    { name: "Daycare", value: Math.round(results.annual.daycare) },
    { name: "Dental", value: Math.round(results.annual.dental) },
  ].filter(d => d.value > 0);

  const yearlyData = Array.from({ length: Math.min(results.lifetime.years, 15) }, (_, i) => ({
    year: `Yr ${i + 1}`,
    cost: i === 0 ? Math.round(results.firstYear.total) : Math.round(results.annual.total),
  }));

  const projectionData = buildProjectionData(results.annual.total, results.firstYear.total, 10, inflationRate / 100);

  const affordabilityScore = () => {
    const annualTotal = results.annual.total;
    if (annualTotal < 1500) return { label: "Very Affordable", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (annualTotal < 2500) return { label: "Affordable", color: "text-green-700", bg: "bg-green-50", border: "border-green-200" };
    if (annualTotal < 4000) return { label: "Moderate Cost", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" };
    if (annualTotal < 6000) return { label: "High Cost", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" };
    return { label: "Premium Cost", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" };
  };

  const score = affordabilityScore();
  const showInsuranceCTA = inputs.insurance === "no" || !inputs.insurance;

  // Regional average — used for the header context line and comparison card
  const region = detectRegion(inputs.location ?? "");
  const regionData = NATIONAL_AVG_ANNUAL[region];
  const regionAvg = regionData[inputs.petType];
  const pctVsAvg = Math.round(((results.annual.total - regionAvg) / regionAvg) * 100);

  function handleShare() {
    const text = `I calculated the cost of owning a ${breed?.name ?? "pet"}. First year: ${formatCurrency(results.firstYear.total)}. Lifetime: ${formatCurrency(results.lifetime.total)}.`;
    if (navigator.share) {
      navigator.share({ title: `${breed?.name ?? "Pet"} cost report`, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied to clipboard!"));
    }
  }

  return (
    <div className="space-y-5">
      {/* Header summary */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {breed && (
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0">
                <BreedImage breedId={breed.id} petType={inputs.petType} alt={breed.name} fill sizes="96px" className="p-1" />
              </div>
            )}
            <div>
              <p className="text-green-300 text-sm mb-1">Cost report for</p>
              <h2 className="text-2xl md:text-3xl font-bold">{breed?.name ?? "Your Pet"}</h2>
              <p className="text-green-300 text-sm mt-1">{inputs.location} · {inputs.petType === "dog" ? "Dog" : "Cat"}</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1.5">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${score.bg} ${score.color} ${score.border} border`}>
              {score.label}
            </span>
            <span className="text-xs text-green-200">
              {pctVsAvg > 0
                ? `≈ ${pctVsAvg}% above the ${regionData.label} for ${inputs.petType}s`
                : pctVsAvg < 0
                ? `≈ ${Math.abs(pctVsAvg)}% below the ${regionData.label} for ${inputs.petType}s`
                : `In line with the ${regionData.label}`}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "First Year Total", value: formatCurrency(results.firstYear.total), sub: "inc. setup costs" },
            { label: "Annual Ongoing", value: formatCurrency(results.annual.total), sub: `${formatCurrency(results.annual.total / 12)}/month` },
            { label: "Lifetime Total", value: formatCurrency(results.lifetime.total), sub: `over ${results.lifetime.years} years` },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white/10 rounded-xl p-4">
              <div className="text-green-300 text-xs mb-1">{label}</div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-green-300 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance CTA — only if not insuring */}
      {showInsuranceCTA && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-blue-900 mb-1">Heads up: you haven&apos;t included pet insurance</h3>
              <p className="text-sm text-blue-700 mb-3">
                Without insurance, a single emergency vet visit can cost $1,500–$5,000+. Pet insurance for {breed?.name ?? "this breed"} typically costs {formatCurrency((breed?.annualInsurance ?? 600) / 12)}/month and can cover up to 90% of vet bills.
              </p>
              <Link href={insuranceCompareCta} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 border border-blue-300 rounded-lg px-4 py-2 hover:bg-blue-100 transition-all">
                Compare insurance quotes <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* National average comparison */}
      {(() => {
        const avg = regionAvg;
        const yours = results.annual.total;
        const diff = yours - avg;
        const maxVal = Math.max(yours, avg) * 1.1;
        const yoursPct = Math.round((yours / maxVal) * 100);
        const avgPct = Math.round((avg / maxVal) * 100);
        return (
          <div className="card p-5">
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-4">Your cost vs {regionData.label}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-[#5a7a5a] mb-1.5">
                  <span>Your estimate ({breed?.name ?? "your pet"})</span>
                  <span className="font-semibold text-[#1B2B1B]">{formatCurrency(yours)}/yr</span>
                </div>
                <div className="h-3 bg-[#E8F5E9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E7D32] rounded-full transition-all" style={{ width: `${yoursPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-[#5a7a5a] mb-1.5">
                  <span>{regionData.label} ({inputs.petType})</span>
                  <span className="font-semibold text-[#1B2B1B]">{formatCurrency(avg)}/yr</span>
                </div>
                <div className="h-3 bg-[#E8F5E9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF50] rounded-full transition-all" style={{ width: `${avgPct}%` }} />
                </div>
              </div>
            </div>
            <p className="text-xs text-[#5a7a5a] mt-3">
              {diff > 0
                ? `Your ${breed?.name ?? "pet"} costs ${formatCurrency(diff)}/yr more than the ${regionData.label.toLowerCase()} — mainly due to ${breed?.size === "large" ? "large breed" : "breed-specific"} food, vet, and grooming costs.`
                : diff < 0
                ? `Your ${breed?.name ?? "pet"} costs ${formatCurrency(Math.abs(diff))}/yr less than the ${regionData.label.toLowerCase()}.`
                : `Your cost matches the ${regionData.label.toLowerCase()}.`}
            </p>
          </div>
        );
      })()}

      {/* Save results — copy summary to clipboard */}
      <div className="card p-5">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-1">Save or share your results</h3>
            <p className="text-xs text-[#5a7a5a] mb-3">Your results now live at this page&apos;s link — send it to a partner, or copy a plain-text summary. Use Print below to save as a PDF.</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).then(() => setLinkCopied(true));
                }}
                className="rounded-xl bg-[#2E7D32] text-white text-sm font-semibold px-4 py-2 hover:bg-[#1B5E20] transition-colors"
              >
                {linkCopied ? "✓ Link copied!" : "Copy Share Link"}
              </button>
              <button
                onClick={() => {
                  const summary = [
                    `Pet Cost Report — ${breed?.name ?? "Your Pet"}`,
                    `Location: ${inputs.location}`,
                    ``,
                    `First Year Total: ${formatCurrency(results.firstYear.total)}`,
                    `Annual Ongoing:   ${formatCurrency(results.annual.total)} (${formatCurrency(results.annual.total / 12)}/mo)`,
                    `Lifetime Total:   ${formatCurrency(results.lifetime.total)} over ${results.lifetime.years} years`,
                    ``,
                    `Full report: ${window.location.href}`,
                    `Generated by PetCost-Calculator.com`,
                  ].join("\n");
                  navigator.clipboard.writeText(summary).then(() => setEmailSaved(true));
                }}
                className="rounded-xl border border-[#2E7D32] text-[#2E7D32] text-sm font-semibold px-4 py-2 hover:bg-[#E8F5E9] transition-colors"
              >
                {emailSaved ? "✓ Summary copied!" : "Copy Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
        {(["overview", "annual", "lifetime", "projection"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap px-2 ${activeTab === tab ? "bg-white text-[#1B2B1B] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {tab === "overview" ? "First Year" : tab === "annual" ? "Annual" : tab === "lifetime" ? "Lifetime" : "10-yr Forecast"}
          </button>
        ))}
      </div>

      {/* First year breakdown */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-6">
            <h3 className="text-base font-bold text-[#1B2B1B] mb-4">First Year Breakdown</h3>
            <div className="space-y-2.5">
              {firstYearData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#1B2B1B]">{formatCurrency(item.value)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-[#1B2B1B]">Total</span>
                <span className="text-sm font-bold text-[#2E7D32]">{formatCurrency(results.firstYear.total)}</span>
              </div>
            </div>
          </div>
          <div className="card p-6 flex flex-col">
            <h3 className="text-base font-bold text-[#1B2B1B] mb-4">Cost Distribution</h3>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <DonutChart data={firstYearData} colors={COLORS} />
            </div>
          </div>
        </div>
      )}

      {/* Annual costs */}
      {activeTab === "annual" && (
        <div className="card p-6">
          <h3 className="text-base font-bold text-[#1B2B1B] mb-4">Annual Ongoing Costs (Year 2+)</h3>
          <div className="space-y-3 mb-6">
            {annualData.map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-semibold text-[#1B2B1B]">{formatCurrency(item.value)}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(item.value / results.annual.total) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <span className="text-sm font-bold text-[#1B2B1B]">Annual Total</span>
              <span className="text-sm font-bold text-[#2E7D32]">{formatCurrency(results.annual.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Monthly equivalent</span>
              <span className="text-xs font-medium text-slate-600">{formatCurrency(results.annual.total / 12)}/mo</span>
            </div>
          </div>
        </div>
      )}

      {/* Lifetime */}
      {activeTab === "lifetime" && (
        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="text-base font-bold text-[#1B2B1B] mb-4">Year-by-Year Costs</h3>
            <div className="w-full min-w-0">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={yearlyData} barSize={24}>
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="cost" fill="#2E7D32" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-5">
              <div className="text-xs text-slate-500 mb-1">Lifetime Total</div>
              <div className="text-2xl font-bold text-[#1B2B1B]">{formatCurrency(results.lifetime.total)}</div>
              <div className="text-xs text-slate-400">over {results.lifetime.years} years</div>
            </div>
            <div className="card p-5">
              <div className="text-xs text-slate-500 mb-1">Recommended Emergency Fund</div>
              <div className="text-2xl font-bold text-[#1B2B1B]">{formatCurrency(results.lifetime.emergencyFund)}</div>
              <div className="text-xs text-slate-400">for unexpected vet bills</div>
            </div>
          </div>
        </div>
      )}

      {/* 10-Year Projection */}
      {activeTab === "projection" && (
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h3 className="text-base font-bold text-[#1B2B1B]">10-Year Cost Forecast</h3>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-500 whitespace-nowrap">Inflation: {inflationRate}%/yr</label>
              <input
                type="range"
                min={0}
                max={8}
                step={1}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-28 accent-[#2E7D32]"
              />
            </div>
          </div>
          <div className="w-full min-w-0">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E9" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Legend />
              <Line type="monotone" dataKey="cost" name="Annual cost" stroke="#2E7D32" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="cumulative" name="Cumulative" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#F1F8F1] p-4">
              <div className="text-xs text-slate-500 mb-1">Year 10 annual cost</div>
              <div className="text-lg font-bold text-[#1B2B1B]">{formatCurrency(projectionData[9]?.cost ?? 0)}</div>
              <div className="text-xs text-slate-400">with {inflationRate}% inflation/yr</div>
            </div>
            <div className="rounded-xl bg-[#F1F8F1] p-4">
              <div className="text-xs text-slate-500 mb-1">10-year cumulative total</div>
              <div className="text-lg font-bold text-[#1B2B1B]">{formatCurrency(projectionData[9]?.cumulative ?? 0)}</div>
              <div className="text-xs text-slate-400">inflation-adjusted</div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden costs alert */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-900 mb-2">Hidden costs not included above</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div><span className="text-amber-700">Boarding/kennels: </span><span className="font-semibold text-amber-900">{formatCurrency(results.hiddenCosts.boarding)}/yr</span></div>
              <div><span className="text-amber-700">Furniture/repairs: </span><span className="font-semibold text-amber-900">{formatCurrency(results.hiddenCosts.furniture)}/yr</span></div>
              <div><span className="text-amber-700">Cleaning products: </span><span className="font-semibold text-amber-900">{formatCurrency(results.hiddenCosts.cleaning)}/yr</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cheaper alternatives */}
      {alternatives.filter(a => a.baseAnnual < currentBaseAnnual).length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-[#2E7D32]" />
            <h3 className="text-sm font-bold text-[#1B2B1B]">Lower-cost {breed?.size} {inputs.petType}s to consider</h3>
          </div>
          <div className="space-y-2">
            {alternatives.filter(a => a.baseAnnual < currentBaseAnnual).map((alt) => {
              const saving = currentBaseAnnual - alt.baseAnnual;
              return (
                <Link key={alt.id} href={`/breeds/${alt.id}`} className="flex items-center justify-between rounded-xl hover:bg-[#F1F8F1] px-3 py-2.5 transition-colors group">
                  <span className="text-sm font-medium text-[#1B2B1B] group-hover:text-[#2E7D32]">{alt.name}</span>
                  <span className="text-sm text-green-700 font-semibold">~{formatCurrency(saving)}/yr less</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-[#2E7D32]" />
          <h3 className="text-sm font-bold text-[#1B2B1B]">Money-saving tips</h3>
        </div>
        <ul className="space-y-1.5 text-sm text-slate-600">
          <li className="flex items-start gap-2"><span className="text-[#2E7D32] font-bold mt-0.5">→</span> Set up a dedicated pet savings account with a monthly auto-transfer of {formatCurrency(results.annual.total / 12)}</li>
          <li className="flex items-start gap-2"><span className="text-[#2E7D32] font-bold mt-0.5">→</span> Compare pet insurance quotes annually — prices vary by up to 40% between providers</li>
          <li className="flex items-start gap-2"><span className="text-[#2E7D32] font-bold mt-0.5">→</span> Buy food and supplies in bulk from Chewy or Amazon to save 15–25% annually</li>
          <li className="flex items-start gap-2"><span className="text-[#2E7D32] font-bold mt-0.5">→</span> Preventive vet care reduces emergency costs by up to 30%</li>
        </ul>
      </div>

      {/* Affiliate products */}
      <div className="rounded-2xl border border-[#C8E6C9] bg-[#F1F8F1] p-5">
        <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wide">Recommended products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href={resolveLink(productLinks.chewy)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white border border-[#C8E6C9] p-3 hover:border-[#4CAF50] transition-all group">
            <div className="text-2xl">🦴</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">Top-rated food on Chewy</div>
              <div className="text-xs text-slate-400">Auto-ship saves up to 30%</div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
          </a>
          <a href={amazonSearchLink(recommendedSuppliesQuery(inputs.petType, breed?.size))} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white border border-[#C8E6C9] p-3 hover:border-[#4CAF50] transition-all group">
            <div className="text-2xl">📦</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">
                {inputs.petType === "cat" ? "Cat starter kit on Amazon" : breed?.size === "large" ? "Large dog crate & bed on Amazon" : breed?.size === "small" ? "Small dog carrier & bed on Amazon" : "Dog starter kit on Amazon"}
              </div>
              <div className="text-xs text-slate-400">Crate, bed, bowls & essentials</div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
          </a>
          <Link href="/tools/insurance-compare" className="flex items-center gap-3 rounded-xl bg-white border border-[#C8E6C9] p-3 hover:border-[#4CAF50] transition-all group">
            <div className="text-2xl">🛡️</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">Compare pet insurance</div>
              <div className="text-xs text-slate-400">Find the best rate for your breed</div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
          </Link>
          {inputs.petType === "dog" && (
            <a href={resolveLink(productLinks.barkBox)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white border border-[#C8E6C9] p-3 hover:border-[#4CAF50] transition-all group">
              <div className="text-2xl">🐾</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">BarkBox monthly toy & treat box</div>
                <div className="text-xs text-slate-400">Themed toys + treats delivered monthly</div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
            </a>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <button onClick={onReset} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <RotateCcw className="h-4 w-4" /> Start Over
        </button>
        <button onClick={handleShare} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <Share2 className="h-4 w-4" /> Share
        </button>
        <button onClick={() => window.print()} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <Printer className="h-4 w-4" /> Print
        </button>
        <Link href={`/compare`} className="btn-secondary text-sm flex-1 text-center">Compare Breeds</Link>
      </div>
    </div>
  );
}

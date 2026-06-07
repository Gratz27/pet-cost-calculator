"use client";

import { useState } from "react";
import { RotateCcw, Download, Share2, AlertTriangle, TrendingUp, Shield, Lightbulb } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { type CostBreakdown, type CalculatorInputs, getBreedById } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

interface Props {
  results: CostBreakdown;
  inputs: CalculatorInputs;
  onReset: () => void;
}

const COLORS = ["#1E3A5F", "#3B82F6", "#16A34A", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function CostResults({ results, inputs, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "annual" | "lifetime">("overview");
  const breed = getBreedById(inputs.petType, inputs.breedId);

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

  // Build year-by-year data
  const yearlyData = Array.from({ length: Math.min(results.lifetime.years, 15) }, (_, i) => ({
    year: `Yr ${i + 1}`,
    cost: i === 0 ? Math.round(results.firstYear.total) : Math.round(results.annual.total),
  }));

  const affordabilityScore = () => {
    const annualTotal = results.annual.total;
    if (annualTotal < 1500) return { label: "Very Affordable", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (annualTotal < 2500) return { label: "Affordable", color: "text-green-700", bg: "bg-green-50", border: "border-green-200" };
    if (annualTotal < 4000) return { label: "Moderate Cost", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" };
    if (annualTotal < 6000) return { label: "High Cost", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" };
    return { label: "Premium Cost", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" };
  };

  const score = affordabilityScore();

  return (
    <div className="space-y-5">
      {/* Header summary */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1E3A5F] text-white rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-blue-200 text-sm mb-1">Cost report for</p>
            <h2 className="text-2xl md:text-3xl font-bold">{breed?.name ?? "Your Pet"}</h2>
            <p className="text-blue-300 text-sm mt-1">{inputs.location} · {inputs.petType === "dog" ? "Dog" : "Cat"}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${score.bg} ${score.color} ${score.border} border`}>
            {score.label}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "First Year Total", value: formatCurrency(results.firstYear.total), sub: "inc. setup costs" },
            { label: "Annual Ongoing", value: formatCurrency(results.annual.total), sub: "from year 2+" },
            { label: "Lifetime Total", value: formatCurrency(results.lifetime.total), sub: `over ${results.lifetime.years} years` },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white/10 rounded-xl p-4">
              <div className="text-blue-200 text-xs mb-1">{label}</div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-blue-300 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {(["overview", "annual", "lifetime"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white text-[#0f172a] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {tab === "overview" ? "First Year" : tab === "annual" ? "Annual Costs" : "Lifetime"}
          </button>
        ))}
      </div>

      {/* First year breakdown */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-6">
            <h3 className="text-base font-bold text-[#0f172a] mb-4">First Year Breakdown</h3>
            <div className="space-y-2.5">
              {firstYearData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0f172a]">{formatCurrency(item.value)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-[#0f172a]">Total</span>
                <span className="text-sm font-bold text-[#1E3A5F]">{formatCurrency(results.firstYear.total)}</span>
              </div>
            </div>
          </div>
          <div className="card p-6 flex flex-col">
            <h3 className="text-base font-bold text-[#0f172a] mb-4">Cost Distribution</h3>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={firstYearData} cx="50%" cy="50%" outerRadius={80} dataKey="value" stroke="none">
                    {firstYearData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Annual costs */}
      {activeTab === "annual" && (
        <div className="card p-6">
          <h3 className="text-base font-bold text-[#0f172a] mb-4">Annual Ongoing Costs (Year 2+)</h3>
          <div className="space-y-3 mb-6">
            {annualData.map((item, i) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-semibold text-[#0f172a]">{formatCurrency(item.value)}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(item.value / results.annual.total) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <span className="text-sm font-bold text-[#0f172a]">Annual Total</span>
              <span className="text-sm font-bold text-[#1E3A5F]">{formatCurrency(results.annual.total)}</span>
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
            <h3 className="text-base font-bold text-[#0f172a] mb-4">Year-by-Year Costs</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={yearlyData} barSize={24}>
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="cost" fill="#1E3A5F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-5">
              <div className="text-xs text-slate-500 mb-1">Lifetime Total</div>
              <div className="text-2xl font-bold text-[#0f172a]">{formatCurrency(results.lifetime.total)}</div>
              <div className="text-xs text-slate-400">over {results.lifetime.years} years</div>
            </div>
            <div className="card p-5">
              <div className="text-xs text-slate-500 mb-1">Recommended Emergency Fund</div>
              <div className="text-2xl font-bold text-[#0f172a]">{formatCurrency(results.lifetime.emergencyFund)}</div>
              <div className="text-xs text-slate-400">for unexpected vet bills</div>
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

      {/* Tips */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-[#16A34A]" />
          <h3 className="text-sm font-bold text-[#0f172a]">Money-saving tips</h3>
        </div>
        <ul className="space-y-1.5 text-sm text-slate-600">
          <li className="flex items-start gap-2"><span className="text-[#16A34A] font-bold mt-0.5">→</span> Set up a dedicated pet savings account with a monthly auto-transfer of {formatCurrency(results.annual.total / 12)}</li>
          <li className="flex items-start gap-2"><span className="text-[#16A34A] font-bold mt-0.5">→</span> Compare pet insurance quotes annually — prices vary by up to 40% between providers</li>
          <li className="flex items-start gap-2"><span className="text-[#16A34A] font-bold mt-0.5">→</span> Buy food and supplies in bulk to save 15–25% annually</li>
          <li className="flex items-start gap-2"><span className="text-[#16A34A] font-bold mt-0.5">→</span> Preventive vet care reduces emergency costs by up to 30%</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onReset} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
          <RotateCcw className="h-4 w-4" /> Start Over
        </button>
        <a href="/compare" className="btn-secondary text-sm flex-1 text-center">Compare Another Breed</a>
        <a href="/breeds" className="btn-primary text-sm flex-1 text-center">Browse All Breeds</a>
      </div>
    </div>
  );
}

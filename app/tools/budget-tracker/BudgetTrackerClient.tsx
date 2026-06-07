"use client";

import { useState } from "react";
import { PlusCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Category {
  id: string;
  label: string;
  budget: number;
  actual: number;
  emoji: string;
}

const DEFAULTS: Category[] = [
  { id: "food", label: "Food", budget: 80, actual: 0, emoji: "🍖" },
  { id: "vet", label: "Vet & Health", budget: 60, actual: 0, emoji: "🏥" },
  { id: "grooming", label: "Grooming", budget: 40, actual: 0, emoji: "✂️" },
  { id: "insurance", label: "Insurance", budget: 50, actual: 0, emoji: "🛡️" },
  { id: "supplies", label: "Supplies & Toys", budget: 20, actual: 0, emoji: "🧸" },
  { id: "daycare", label: "Daycare / Walker", budget: 0, actual: 0, emoji: "🦮" },
  { id: "dental", label: "Dental", budget: 0, actual: 0, emoji: "🦷" },
];

export default function BudgetTrackerClient() {
  const [categories, setCategories] = useState<Category[]>(DEFAULTS);

  const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
  const totalActual = categories.reduce((s, c) => s + c.actual, 0);
  const diff = totalActual - totalBudget;

  function updateField(id: string, field: "budget" | "actual", value: string) {
    const num = parseFloat(value) || 0;
    setCategories(prev => prev.map(c => c.id === id ? { ...c, [field]: num } : c));
  }

  function resetActual() {
    setCategories(prev => prev.map(c => ({ ...c, actual: 0 })));
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Monthly budget", value: `$${totalBudget.toFixed(0)}`, color: "text-[#1B2B1B]" },
          { label: "Actual spending", value: `$${totalActual.toFixed(0)}`, color: "text-[#1B2B1B]" },
          {
            label: diff === 0 ? "On budget" : diff > 0 ? "Over budget" : "Under budget",
            value: `${diff > 0 ? "+" : ""}$${diff.toFixed(0)}`,
            color: diff === 0 ? "text-slate-500" : diff > 0 ? "text-red-600" : "text-green-600",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="card p-4 text-center">
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-[#5a7a5a] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Category table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#C8E6C9] bg-[#F1F8F1]">
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-[#5a7a5a] uppercase tracking-wide">
            <div className="col-span-4">Category</div>
            <div className="col-span-3 text-center">Budget/mo</div>
            <div className="col-span-3 text-center">Actual/mo</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
        </div>
        <div className="divide-y divide-[#E8F5E9]">
          {categories.map((cat) => {
            const catDiff = cat.actual - cat.budget;
            const status = cat.budget === 0 && cat.actual === 0 ? "neutral"
              : catDiff > 5 ? "over"
              : catDiff < -5 ? "under"
              : "ok";
            return (
              <div key={cat.id} className="px-5 py-3 grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4 flex items-center gap-2">
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="text-sm font-medium text-[#1B2B1B]">{cat.label}</span>
                </div>
                <div className="col-span-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={cat.budget || ""}
                      onChange={(e) => updateField(cat.id, "budget", e.target.value)}
                      className="w-full rounded-lg border border-[#C8E6C9] pl-6 pr-2 py-1.5 text-sm text-[#1B2B1B] focus:border-[#2E7D32] focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={cat.actual || ""}
                      onChange={(e) => updateField(cat.id, "actual", e.target.value)}
                      className="w-full rounded-lg border border-[#C8E6C9] pl-6 pr-2 py-1.5 text-sm text-[#1B2B1B] focus:border-[#2E7D32] focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="col-span-2 flex justify-center">
                  {status === "neutral" && <Minus className="h-4 w-4 text-slate-300" />}
                  {status === "ok" && <span className="text-xs font-semibold text-green-600">✓ OK</span>}
                  {status === "over" && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
                      <TrendingUp className="h-3.5 w-3.5" /> +${catDiff.toFixed(0)}
                    </span>
                  )}
                  {status === "under" && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                      <TrendingDown className="h-3.5 w-3.5" /> ${catDiff.toFixed(0)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals row */}
        <div className="px-5 py-4 bg-[#F1F8F1] border-t border-[#C8E6C9] grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4 text-sm font-bold text-[#1B2B1B]">Monthly Total</div>
          <div className="col-span-3 text-center text-sm font-bold text-[#2E7D32]">${totalBudget.toFixed(0)}</div>
          <div className="col-span-3 text-center text-sm font-bold text-[#1B2B1B]">${totalActual.toFixed(0)}</div>
          <div className="col-span-2 text-center">
            <span className={`text-xs font-bold ${diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-slate-400"}`}>
              {diff > 0 ? `+$${diff.toFixed(0)}` : diff < 0 ? `-$${Math.abs(diff).toFixed(0)}` : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Annual projection */}
      <div className="card p-5">
        <h3 className="text-sm font-bold text-[#1B2B1B] mb-3">Annual Projection</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#2E7D32]">${(totalBudget * 12).toLocaleString()}</div>
            <div className="text-xs text-slate-400">Budgeted/year</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#1B2B1B]">${(totalActual * 12).toLocaleString()}</div>
            <div className="text-xs text-slate-400">Projected actual/year</div>
          </div>
          <div>
            <div className={`text-lg font-bold ${diff * 12 > 0 ? "text-red-600" : "text-green-600"}`}>{diff * 12 > 0 ? "+" : ""}${(diff * 12).toLocaleString()}</div>
            <div className="text-xs text-slate-400">Over/under budget</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={resetActual} className="btn-secondary text-sm">Reset actual spending</button>
      </div>
    </div>
  );
}

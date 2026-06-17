"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { getAllBreeds, type Breed } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

export default function CompareClient() {
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [breed1, setBreed1] = useState<Breed | null>(null);
  const [breed2, setBreed2] = useState<Breed | null>(null);

  const breeds = getAllBreeds(petType);

  const filtered1 = breeds.filter(b => b.name.toLowerCase().includes(search1.toLowerCase())).slice(0, 8);
  const filtered2 = breeds.filter(b => b.name.toLowerCase().includes(search2.toLowerCase())).slice(0, 8);

  const calcSummary = (b: Breed) => {
    const firstYear = b.adoptionFee + b.initialVet + b.initialSupplies + b.training + b.annualFood + b.annualVet + b.annualGrooming + b.annualInsurance;
    const annual = b.annualFood + b.annualVet + b.annualGrooming + b.annualInsurance + b.annualSupplies;
    const lifetime = firstYear + annual * (b.lifespan - 1);
    return { firstYear, annual, lifetime };
  };

  const rows = [
    { label: "Size", key: (b: Breed) => b.size.charAt(0).toUpperCase() + b.size.slice(1) },
    { label: "Lifespan", key: (b: Breed) => `${b.lifespan} years` },
    { label: "Purchase / Adoption", key: (b: Breed) => formatCurrency(b.adoptionFee) },
    { label: "Initial Vet Costs", key: (b: Breed) => formatCurrency(b.initialVet) },
    { label: "Starter Supplies", key: (b: Breed) => formatCurrency(b.initialSupplies) },
    { label: "Annual Food", key: (b: Breed) => formatCurrency(b.annualFood) },
    { label: "Annual Vet", key: (b: Breed) => formatCurrency(b.annualVet) },
    { label: "Annual Grooming", key: (b: Breed) => formatCurrency(b.annualGrooming) },
    { label: "Annual Insurance", key: (b: Breed) => formatCurrency(b.annualInsurance) },
    { label: "First Year Total", key: (b: Breed) => formatCurrency(calcSummary(b).firstYear), bold: true },
    { label: "Annual Ongoing", key: (b: Breed) => formatCurrency(calcSummary(b).annual), bold: true },
    { label: "Lifetime Total", key: (b: Breed) => formatCurrency(calcSummary(b).lifetime), bold: true, highlight: true },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Type toggle */}
      <div className="flex gap-2 justify-center">
        {(["dog", "cat"] as const).map(t => (
          <button key={t} onClick={() => { setPetType(t); setBreed1(null); setBreed2(null); setSearch1(""); setSearch2(""); }}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${petType === t ? "bg-[#2E7D32] text-white" : "bg-white border border-[#C8E6C9] text-[#5a7a5a] hover:border-[#2E7D32]"}`}>
            {t === "dog" ? "🐕 Dogs" : "🐈 Cats"}
          </button>
        ))}
      </div>

      {/* Breed selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Breed 1", search: search1, setSearch: setSearch1, selected: breed1, setSelected: setBreed1, filtered: filtered1 },
          { label: "Breed 2", search: search2, setSearch: setSearch2, selected: breed2, setSelected: setBreed2, filtered: filtered2 },
        ].map(({ label, search, setSearch, selected, setSelected, filtered }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#C8E6C9] p-4">
            <p className="text-xs font-semibold text-[#5a7a5a] mb-2">{label}</p>
            {selected ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1B2B1B]">{selected.name}</div>
                  <div className="text-xs text-[#5a7a5a] capitalize">{selected.size} · {selected.lifespan}yr</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-xs text-[#5a7a5a] hover:text-red-500 underline">Change</button>
              </div>
            ) : (
              <div>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5a7a5a]" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search breeds..." className="input-field pl-9 text-sm py-2" />
                </div>
                <div className="max-h-44 overflow-y-auto space-y-1">
                  {filtered.map(b => (
                    <button key={b.id} onClick={() => { setSelected(b); setSearch(""); }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-[#F1F8F1] transition-colors">
                      <span className="font-medium text-[#1B2B1B]">{b.name}</span>
                      <span className="text-xs text-[#5a7a5a] capitalize">{b.size}</span>
                    </button>
                  ))}
                  {filtered.length === 0 && <p className="text-center py-4 text-sm text-[#5a7a5a]">No matches</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      {breed1 && breed2 && (
        <>
          {/* Mobile: stacked cards, one per breed */}
          <div className="grid grid-cols-1 sm:hidden gap-4">
            {[breed1, breed2].map((breed) => (
              <div key={breed.id} className="bg-white rounded-2xl border border-[#C8E6C9] overflow-hidden">
                <div className="bg-[#1B5E20] text-white p-4">
                  <div className="font-bold">{breed.name}</div>
                  <div className="text-xs text-green-200 capitalize">{breed.size}</div>
                </div>
                {rows.map((row, i) => (
                  <div key={row.label} className={`flex items-center justify-between px-4 py-3 border-b border-[#C8E6C9] last:border-b-0 ${row.highlight ? "bg-[#E8F5E9]" : i % 2 === 0 ? "bg-white" : "bg-[#F1F8F1]"}`}>
                    <span className={`text-sm ${row.bold ? "font-bold text-[#1B2B1B]" : "text-[#5a7a5a]"}`}>{row.label}</span>
                    <span className={`text-sm text-right ${row.bold ? "font-bold text-[#2E7D32]" : "font-medium text-[#1B2B1B]"}`}>{row.key(breed)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tablet/desktop: side-by-side table */}
          <div className="hidden sm:block bg-white rounded-2xl border border-[#C8E6C9] overflow-hidden">
            <div className="grid grid-cols-3 bg-[#1B5E20] text-white">
              <div className="p-4 text-sm font-medium text-green-200">Cost Category</div>
              <div className="p-4 text-center">
                <div className="font-bold">{breed1.name}</div>
                <div className="text-xs text-green-200 capitalize">{breed1.size}</div>
              </div>
              <div className="p-4 text-center">
                <div className="font-bold">{breed2.name}</div>
                <div className="text-xs text-green-200 capitalize">{breed2.size}</div>
              </div>
            </div>
            {rows.map((row, i) => {
              const val1 = row.key(breed1);
              const val2 = row.key(breed2);
              return (
                <div key={row.label} className={`grid grid-cols-3 border-b border-[#C8E6C9] ${row.highlight ? "bg-[#E8F5E9]" : i % 2 === 0 ? "bg-white" : "bg-[#F1F8F1]"}`}>
                  <div className={`p-4 text-sm ${row.bold ? "font-bold text-[#1B2B1B]" : "text-[#5a7a5a]"}`}>{row.label}</div>
                  <div className={`p-4 text-sm text-center ${row.bold ? "font-bold text-[#2E7D32]" : "font-medium text-[#1B2B1B]"}`}>{val1}</div>
                  <div className={`p-4 text-sm text-center ${row.bold ? "font-bold text-[#2E7D32]" : "font-medium text-[#1B2B1B]"}`}>{val2}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {!breed1 || !breed2 ? (
        <div className="text-center py-12 text-[#5a7a5a]">
          <p className="text-sm">Select two breeds above to see your comparison</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href={`/compare/${[breed1.id, breed2.id].sort().join("-vs-")}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            View full {breed1.name} vs {breed2.name} comparison <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="/calculator" className="btn-green inline-flex items-center gap-2">
            Get a personalised estimate <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}

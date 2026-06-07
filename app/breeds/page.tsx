import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronRight, ArrowRight } from "lucide-react";
import { getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dog & Cat Breed Cost Guide",
  description: "Browse cost estimates for 200+ dog and cat breeds. See first-year costs, annual expenses, and lifetime ownership costs for every breed.",
};

const sizeLabels: Record<string, string> = { small: "Small", medium: "Medium", large: "Large" };
const sizeColors: Record<string, string> = { small: "badge-green", medium: "badge-blue", large: "badge-orange" };

export default function BreedsPage({ searchParams }: { searchParams: { type?: string } }) {
  const petType = searchParams.type === "cat" ? "cat" : "dog";
  const breeds = getAllBreeds(petType);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-xl py-12">
          <div className="badge badge-blue mb-3">200+ Breeds</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
            {petType === "dog" ? "Dog" : "Cat"} Breed Cost Guide
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Real cost data for every breed. Click any breed to see full first-year, annual, and lifetime cost estimates.
          </p>

          {/* Pet type toggle */}
          <div className="flex gap-2 mt-6">
            <Link
              href="/breeds?type=dog"
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${petType === "dog" ? "bg-[#1E3A5F] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#1E3A5F]"}`}
            >
              🐕 Dogs
            </Link>
            <Link
              href="/breeds?type=cat"
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${petType === "cat" ? "bg-[#1E3A5F] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#1E3A5F]"}`}
            >
              🐈 Cats
            </Link>
          </div>
        </div>
      </div>

      <div className="container-xl py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">{breeds.length} breeds found</p>
          <Link href="/compare" className="text-sm font-semibold text-[#1E3A5F] flex items-center gap-1.5 hover:underline">
            Compare breeds side-by-side <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {breeds.map((breed) => {
            const firstYearEst = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.annualFood + breed.annualVet + breed.annualGrooming;
            const annualEst = breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance + breed.annualSupplies;
            const lifetimeEst = firstYearEst + annualEst * (breed.lifespan - 1);

            return (
              <Link key={breed.id} href={`/breeds/${breed.id}`} className="card p-5 group hover:border-[#1E3A5F]/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-[#0f172a] group-hover:text-[#1E3A5F] transition-colors">{breed.name}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Lifespan: {breed.lifespan} years</p>
                  </div>
                  <span className={`badge ${sizeColors[breed.size] ?? "badge-blue"} text-xs`}>
                    {sizeLabels[breed.size] ?? breed.size}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">First year</span>
                    <span className="font-semibold text-[#0f172a]">{formatCurrency(firstYearEst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual ongoing</span>
                    <span className="font-semibold text-[#0f172a]">{formatCurrency(annualEst)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2">
                    <span className="text-slate-500 font-medium">Lifetime est.</span>
                    <span className="font-bold text-[#1E3A5F]">{formatCurrency(lifetimeEst)}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#1E3A5F] opacity-0 group-hover:opacity-100 transition-opacity">
                  View full breakdown <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import BreedImage from "@/components/BreedImage";

export const metadata: Metadata = {
  title: "Dog & Cat Breed Cost Guide",
  description: "Browse cost estimates for 200+ dog and cat breeds. See first-year costs, annual expenses, and lifetime ownership costs for every breed.",
};

export default function BreedsPage({ searchParams }: { searchParams: { type?: string } }) {
  const petType = searchParams.type === "cat" ? "cat" as const : "dog" as const;
  const breeds = getAllBreeds(petType);

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12">
          <div className="badge badge-green mb-3">200+ Breeds</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">
            {petType === "dog" ? "Dog" : "Cat"} Breed Cost Guide
          </h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Real cost data for every breed. Click any breed to see full first-year, annual, and lifetime cost estimates.
          </p>
          <div className="flex gap-2 mt-6">
            <Link href="/breeds?type=dog"
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${petType === "dog" ? "bg-[#2E7D32] text-white" : "bg-white border border-[#C8E6C9] text-[#5a7a5a] hover:border-[#2E7D32]"}`}>
              🐕 Dogs
            </Link>
            <Link href="/breeds?type=cat"
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${petType === "cat" ? "bg-[#2E7D32] text-white" : "bg-white border border-[#C8E6C9] text-[#5a7a5a] hover:border-[#2E7D32]"}`}>
              🐈 Cats
            </Link>
          </div>
        </div>
      </div>

      <div className="container-xl py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#5a7a5a]">{breeds.length} breeds found</p>
          <Link href="/compare" className="text-sm font-semibold text-[#2E7D32] flex items-center gap-1.5 hover:underline">
            Compare breeds <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {breeds.map((breed) => {
            const firstYearEst = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.annualFood + breed.annualVet + breed.annualGrooming;
            const annualEst = breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance + breed.annualSupplies;
            return (
              <Link key={breed.id} href={`/breeds/${breed.id}`} className="card overflow-hidden group hover:border-[#4CAF50]/50">
                <div className="relative h-52 bg-[#E8F5E9] overflow-hidden">
                  <BreedImage breedId={breed.id} petType={petType} alt={breed.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-bold text-[#1B2B1B] text-sm group-hover:text-[#2E7D32] transition-colors leading-tight">{breed.name}</h2>
                    <span className={`badge text-xs flex-shrink-0 ml-2 ${breed.size === "small" ? "badge-green" : breed.size === "medium" ? "badge-blue" : "badge-orange"}`}>
                      {breed.size}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#5a7a5a]">First year</span>
                      <span className="font-semibold text-[#1B2B1B]">{formatCurrency(firstYearEst)}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#E8F5E9] pt-1">
                      <span className="text-[#5a7a5a] font-medium">Annual</span>
                      <span className="font-bold text-[#2E7D32]">{formatCurrency(annualEst)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin } from "lucide-react";
import { getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import AdUnit from "@/components/AdUnit";

interface Props { params: Promise<{ country: string; region: string }> }

const REGIONS: Record<string, Record<string, { label: string; multiplier: number; currency: string; currencySymbol: string; description: string }>> = {
  us: {
    "new-york": { label: "New York", multiplier: 1.30, currency: "USD", currencySymbol: "$", description: "New York City and surrounding metro area" },
    "los-angeles": { label: "Los Angeles", multiplier: 1.30, currency: "USD", currencySymbol: "$", description: "Los Angeles metro, Southern California" },
    "chicago": { label: "Chicago", multiplier: 1.15, currency: "USD", currencySymbol: "$", description: "Chicago metro and Midwest" },
    "austin": { label: "Austin", multiplier: 1.15, currency: "USD", currencySymbol: "$", description: "Austin and Central Texas" },
    "national-average": { label: "US National Average", multiplier: 1.00, currency: "USD", currencySymbol: "$", description: "Average across all US cities and regions" },
  },
  uk: {
    "london": { label: "London", multiplier: 1.35, currency: "GBP", currencySymbol: "£", description: "Greater London and the Home Counties" },
    "manchester": { label: "Manchester", multiplier: 1.20, currency: "GBP", currencySymbol: "£", description: "Greater Manchester and North West England" },
    "national-average": { label: "UK National Average", multiplier: 1.25, currency: "GBP", currencySymbol: "£", description: "Average across all UK regions" },
  },
  au: {
    "sydney": { label: "Sydney", multiplier: 1.25, currency: "AUD", currencySymbol: "A$", description: "Greater Sydney and NSW" },
    "melbourne": { label: "Melbourne", multiplier: 1.20, currency: "AUD", currencySymbol: "A$", description: "Greater Melbourne and Victoria" },
    "national-average": { label: "Australia National Average", multiplier: 1.20, currency: "AUD", currencySymbol: "A$", description: "Average across all Australian states" },
  },
};

const COUNTRY_LABELS: Record<string, string> = { us: "United States", uk: "United Kingdom", au: "Australia" };

export async function generateStaticParams() {
  const params: { country: string; region: string }[] = [];
  for (const [country, regions] of Object.entries(REGIONS)) {
    for (const region of Object.keys(regions)) {
      params.push({ country, region });
    }
  }
  return params;
}

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const params = await paramsPromise;
  const regionData = REGIONS[params.country]?.[params.region];
  if (!regionData) return { title: "Regional Pet Costs" };
  const countryLabel = COUNTRY_LABELS[params.country] ?? params.country.toUpperCase();
  return {
    title: `Pet Ownership Costs in ${regionData.label}, ${countryLabel} (2026) | PetCost-Calculator`,
    description: `How much does it cost to own a dog or cat in ${regionData.label}? Breed-by-breed cost data for ${regionData.label} pet owners, updated for 2026.`,
    alternates: { canonical: `https://petcost-calculator.com/costs/${params.country}/${params.region}` },
    openGraph: {
      title: `Pet Ownership Costs in ${regionData.label}, ${countryLabel} (2026)`,
      description: `How much does it cost to own a dog or cat in ${regionData.label}?`,
      url: `https://petcost-calculator.com/costs/${params.country}/${params.region}`,
    },
  };
}

export default async function RegionalCostPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  const regionData = REGIONS[params.country]?.[params.region];
  if (!regionData) notFound();

  const countryLabel = COUNTRY_LABELS[params.country] ?? params.country.toUpperCase();
  const { label, multiplier, currencySymbol } = regionData;

  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  function regionCost(base: number) {
    return Math.round(base * multiplier);
  }

  const popularDogs = dogs
    .filter(d => ["golden-retriever", "labrador-retriever", "french-bulldog", "german-shepherd", "poodle", "beagle", "border-collie", "cavalier-king-charles-spaniel"].includes(d.id))
    .slice(0, 8);

  const popularCats = cats.slice(0, 6);

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Pet Costs in {label}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12 max-w-4xl">
          <div className="flex items-center gap-2 badge badge-green mb-3">
            <MapPin className="h-3.5 w-3.5" /> {countryLabel}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-4">
            Pet Ownership Costs in {label}
          </h1>
          <p className="text-[#5a7a5a] text-lg leading-relaxed max-w-2xl">
            {regionData.description}. All costs below are adjusted to {label} local market rates (×{multiplier.toFixed(2)} multiplier vs US baseline).
          </p>
          <p className="text-xs text-slate-400 mt-4">Last updated: June 2026 · Currency: {regionData.currency}</p>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl space-y-8">

        {/* Cost summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Small dog (first year)", value: regionCost(2400) },
            { label: "Medium dog (first year)", value: regionCost(3600) },
            { label: "Large dog (first year)", value: regionCost(4800) },
            { label: "Cat (first year)", value: regionCost(2100) },
          ].map(({ label: l, value }) => (
            <div key={l} className="card p-4 text-center">
              <div className="text-xl font-bold text-[#2E7D32]">{currencySymbol}{value.toLocaleString()}</div>
              <div className="text-xs text-[#5a7a5a] mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Popular dogs table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#C8E6C9] bg-[#F1F8F1]">
            <h2 className="text-lg font-bold text-[#1B2B1B]">Popular Dog Breeds in {label}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#E8F5E9]">
                  <th className="text-left px-5 py-3 text-[#1B2B1B] font-semibold">Breed</th>
                  <th className="text-right px-4 py-3 text-[#1B2B1B] font-semibold">First Year</th>
                  <th className="text-right px-4 py-3 text-[#1B2B1B] font-semibold">Annual</th>
                  <th className="text-right px-4 py-3 text-[#1B2B1B] font-semibold">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {popularDogs.map((dog, i) => {
                  const annual = regionCost(dog.annualFood + dog.annualVet + dog.annualGrooming + dog.annualInsurance + dog.annualSupplies);
                  const first = regionCost(dog.adoptionFee + dog.initialVet + dog.initialSupplies + dog.training) + annual;
                  return (
                    <tr key={dog.id} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FBF8]"}>
                      <td className="px-5 py-3">
                        <Link href={`/breeds/${dog.id}`} className="font-medium text-[#1B2B1B] hover:text-[#2E7D32]">{dog.name}</Link>
                        <span className="ml-2 text-xs text-slate-400 capitalize">{dog.size}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#1B2B1B]">{currencySymbol}{first.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[#5a7a5a]">{currencySymbol}{annual.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[#5a7a5a]">{currencySymbol}{Math.round(annual / 12).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ad — between breed tables */}
        <AdUnit slot="2847391056" format="horizontal" />

        {/* Popular cats */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#C8E6C9] bg-[#F1F8F1]">
            <h2 className="text-lg font-bold text-[#1B2B1B]">Popular Cat Breeds in {label}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#E8F5E9]">
                  <th className="text-left px-5 py-3 text-[#1B2B1B] font-semibold">Breed</th>
                  <th className="text-right px-4 py-3 text-[#1B2B1B] font-semibold">First Year</th>
                  <th className="text-right px-4 py-3 text-[#1B2B1B] font-semibold">Annual</th>
                  <th className="text-right px-4 py-3 text-[#1B2B1B] font-semibold">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {popularCats.map((cat, i) => {
                  const annual = regionCost(cat.annualFood + cat.annualVet + cat.annualGrooming + cat.annualInsurance + cat.annualSupplies);
                  const first = regionCost(cat.adoptionFee + cat.initialVet + cat.initialSupplies + cat.training) + annual;
                  return (
                    <tr key={cat.id} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FBF8]"}>
                      <td className="px-5 py-3">
                        <Link href={`/breeds/${cat.id}`} className="font-medium text-[#1B2B1B] hover:text-[#2E7D32]">{cat.name}</Link>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#1B2B1B]">{currencySymbol}{first.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[#5a7a5a]">{currencySymbol}{annual.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-[#5a7a5a]">{currencySymbol}{Math.round(annual / 12).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Other regions */}
        <div className="card p-6">
          <h2 className="text-base font-bold text-[#1B2B1B] mb-3">Other regions</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(REGIONS).flatMap(([country, regions]) =>
              Object.entries(regions)
                .filter(([r]) => !(country === params.country && r === params.region))
                .map(([r, data]) => (
                  <Link key={`${country}-${r}`} href={`/costs/${country}/${r}`} className="rounded-xl border border-[#C8E6C9] bg-white px-4 py-2 text-sm font-medium text-[#2E7D32] hover:bg-[#E8F5E9] transition-all">
                    {data.label}
                  </Link>
                ))
            )}
          </div>
        </div>

        <div className="text-center">
          <Link href="/calculator" className="btn-primary">Get my personalised estimate →</Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Shield, Check, X, ExternalLink } from "lucide-react";

type Country = "all" | "us" | "uk" | "au";
type PetType = "all" | "dog" | "cat";

const providers = [
  {
    name: "Healthy Paws",
    coverage: "Up to 90%",
    avgMonthly: "$52",
    deductible: "$100–$500",
    waitingPeriod: "15 days",
    pros: ["No annual or lifetime limits", "Fast claim processing", "Strong customer reviews"],
    cons: ["No wellness add-on", "US only"],
    bestFor: "Comprehensive accident & illness",
    link: "https://www.healthypaws.com",
    country: "us" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
  {
    name: "Embrace",
    coverage: "Up to 90%",
    avgMonthly: "$48",
    deductible: "$100–$1,000",
    waitingPeriod: "14 days",
    pros: ["Wellness add-on available", "Diminishing deductible", "Good for dogs and cats"],
    cons: ["Higher base premiums", "5-day accident waiting period"],
    bestFor: "Wellness + illness coverage",
    link: "https://www.embracepetinsurance.com",
    country: "us" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
  {
    name: "ASPCA Pet Insurance",
    coverage: "Up to 90%",
    avgMonthly: "$44",
    deductible: "$100–$500",
    waitingPeriod: "14 days",
    pros: ["Trusted non-profit brand", "Preventive care add-on", "Good multi-pet discount"],
    cons: ["Claims can be slow", "US only"],
    bestFor: "Budget-conscious US owners",
    link: "https://www.aspcapetinsurance.com",
    country: "us" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
  {
    name: "Petplan (UK)",
    coverage: "Up to £12,000/yr",
    avgMonthly: "£35",
    deductible: "£90–£150 excess",
    waitingPeriod: "14 days",
    pros: ["Well-established UK provider", "Lifetime policies available", "Dental included"],
    cons: ["Premiums increase with age", "UK only"],
    bestFor: "UK pet owners seeking lifetime cover",
    link: "https://www.petplan.co.uk",
    country: "uk" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
  {
    name: "Tesco Pet Insurance (UK)",
    coverage: "Up to £7,000/yr",
    avgMonthly: "£22",
    deductible: "£70–£120",
    waitingPeriod: "14 days",
    pros: ["Budget-friendly premiums", "Widely recognised brand", "Online claim portal"],
    cons: ["Lower cover limits", "No exotic breeds"],
    bestFor: "UK budget option",
    link: "https://www.tesco.com/zones/financial/insurance/pet/",
    country: "uk" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
  {
    name: "Real Insurance (AU)",
    coverage: "Up to A$12,000/yr",
    avgMonthly: "A$58",
    deductible: "A$100–$300",
    waitingPeriod: "14 days",
    pros: ["Australian-based provider", "Routine care add-on", "Good claims process"],
    cons: ["Premiums rise quickly post-age-6", "AU only"],
    bestFor: "Australian pet owners",
    link: "https://www.realinsurance.com.au/pet-insurance",
    country: "au" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
  {
    name: "PetSure (AU)",
    coverage: "Up to A$20,000/yr",
    avgMonthly: "A$65",
    deductible: "A$0–$200",
    waitingPeriod: "14 days",
    pros: ["Highest AU cover limits", "Backed by major underwriter", "24/7 vet helpline"],
    cons: ["Premiums above AU average", "Waiting period for orthopaedic conditions"],
    bestFor: "Comprehensive AU cover",
    link: "https://www.petsure.com.au",
    country: "au" as Country,
    petTypes: ["dog", "cat"] as PetType[],
  },
];

const breedCosts = [
  { breed: "French Bulldog", monthly: 85, reason: "High vet use, brachycephalic breed", petType: "dog" },
  { breed: "Golden Retriever", monthly: 58, reason: "Cancer and hip dysplasia predisposition", petType: "dog" },
  { breed: "Labrador Retriever", monthly: 52, reason: "Generally healthy, common breed", petType: "dog" },
  { breed: "Poodle (Standard)", monthly: 55, reason: "Few genetic issues, long lifespan", petType: "dog" },
  { breed: "Border Collie", monthly: 45, reason: "Active, fit breed, fewer conditions", petType: "dog" },
  { breed: "Maine Coon", monthly: 42, reason: "Cardiac issues in breed", petType: "cat" },
  { breed: "Domestic Shorthair", monthly: 28, reason: "Robust mixed genetics", petType: "cat" },
  { breed: "Persian Cat", monthly: 38, reason: "Respiratory and eye conditions", petType: "cat" },
  { breed: "Bengal Cat", monthly: 32, reason: "Generally healthy, active breed", petType: "cat" },
  { breed: "Sphynx Cat", monthly: 45, reason: "Skin and cardiac conditions", petType: "cat" },
];

const COUNTRY_LABELS: Record<Country, string> = { all: "All countries", us: "🇺🇸 United States", uk: "🇬🇧 United Kingdom", au: "🇦🇺 Australia" };
const PET_LABELS: Record<PetType, string> = { all: "Dogs & cats", dog: "🐕 Dogs only", cat: "🐈 Cats only" };

export default function InsuranceCompareClient() {
  const [country, setCountry] = useState<Country>("all");
  const [petType, setPetType] = useState<PetType>("all");

  const filteredProviders = providers.filter(p =>
    (country === "all" || p.country === country) &&
    (petType === "all" || p.petTypes.includes(petType))
  );

  const filteredBreeds = breedCosts.filter(b =>
    petType === "all" || b.petType === petType
  );

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-[#1B2B1B] mb-4">Filter providers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#5a7a5a] uppercase tracking-wide mb-2 block">Country</label>
            <div className="flex flex-wrap gap-2">
              {(["all", "us", "uk", "au"] as Country[]).map(c => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium border transition-all ${country === c ? "bg-[#2E7D32] text-white border-[#2E7D32]" : "bg-white text-[#5a7a5a] border-[#C8E6C9] hover:border-[#2E7D32]"}`}
                >
                  {COUNTRY_LABELS[c]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#5a7a5a] uppercase tracking-wide mb-2 block">Pet type</label>
            <div className="flex flex-wrap gap-2">
              {(["all", "dog", "cat"] as PetType[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPetType(p)}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium border transition-all ${petType === p ? "bg-[#2E7D32] text-white border-[#2E7D32]" : "bg-white text-[#5a7a5a] border-[#C8E6C9] hover:border-[#2E7D32]"}`}
                >
                  {PET_LABELS[p]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-[#5a7a5a] mt-3">
          Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Is it worth it? */}
      <div className="card p-8">
        <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">Is Pet Insurance Worth It?</h2>
        <div className="prose prose-sm max-w-none text-[#3a5a3a] space-y-3">
          <p>Pet insurance is worth it when the cost of a potential claim exceeds the total premiums paid. For most breeds, this break-even point comes within 2–4 years of ownership — and a single emergency surgery can cost more than 3 years of premiums.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mt-4">
            <div className="rounded-xl bg-green-50 border border-green-200 p-4">
              <p className="font-bold text-green-800 text-sm mb-2">Worth it if you…</p>
              <ul className="space-y-1.5 text-sm text-green-700">
                {["Own a breed with known health predispositions", "Don't have an emergency pet fund of $2,000+", "Want predictable monthly costs", "Got your pet young (premiums lowest before age 3)"].map(i => (
                  <li key={i} className="flex gap-2"><Check className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-green-600" />{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-200 p-4">
              <p className="font-bold text-red-800 text-sm mb-2">May not be worth it if…</p>
              <ul className="space-y-1.5 text-sm text-red-700">
                {["You own a robust mixed-breed with no known conditions", "You have $5,000+ in an emergency fund", "Your pet is already over 8 and premiums have risen significantly"].map(i => (
                  <li key={i} className="flex gap-2"><X className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-red-400" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Average cost by breed */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-[#1B2B1B] mb-4">Average Monthly Cost by Breed</h2>
        {filteredBreeds.length === 0 ? (
          <p className="text-sm text-[#5a7a5a]">No breeds match the current filter.</p>
        ) : (
          <div className="space-y-3">
            {filteredBreeds.map(({ breed, monthly, reason }) => (
              <div key={breed} className="flex items-center justify-between py-2 border-b border-[#E8F5E9] last:border-0">
                <div>
                  <div className="text-sm font-medium text-[#1B2B1B]">{breed}</div>
                  <div className="text-xs text-slate-400">{reason}</div>
                </div>
                <div className="text-base font-bold text-[#2E7D32]">${monthly}/mo</div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-slate-400 mt-4">* US averages. UK and AU premiums vary. Use as a planning guide only.</p>
      </div>

      {/* Provider cards */}
      <div>
        <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">
          {filteredProviders.length === 0 ? "No providers match your filters" : "Top Providers"}
        </h2>
        {filteredProviders.length === 0 ? (
          <div className="card p-8 text-center text-[#5a7a5a]">
            <Shield className="h-10 w-10 mx-auto mb-3 text-slate-200" />
            <p>Try widening your filters to see more providers.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredProviders.map((p) => (
              <div key={p.name} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-[#1B2B1B]">{p.name}</h3>
                      <span className="text-xs rounded-full bg-[#E8F5E9] text-[#2E7D32] font-semibold px-2 py-0.5">
                        {COUNTRY_LABELS[p.country].replace(/^.{2}\s/, "")}
                      </span>
                    </div>
                    <p className="text-sm text-[#5a7a5a]">Best for: {p.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#2E7D32]">{p.avgMonthly}</div>
                    <div className="text-xs text-slate-400">avg/month</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                  {[["Coverage", p.coverage], ["Deductible", p.deductible], ["Waiting period", p.waitingPeriod]].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-[#F1F8F1] p-3">
                      <div className="text-slate-500 mb-0.5">{k}</div>
                      <div className="font-semibold text-[#1B2B1B]">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">Pros</p>
                    {p.pros.map(pro => (
                      <div key={pro} className="flex items-start gap-1.5 text-[#5a7a5a] mb-0.5">
                        <Check className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" /> {pro}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-red-600 mb-1">Cons</p>
                    {p.cons.map(con => (
                      <div key={con} className="flex items-start gap-1.5 text-[#5a7a5a] mb-0.5">
                        <X className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" /> {con}
                      </div>
                    ))}
                  </div>
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E7D32] hover:underline">
                  Visit {p.name} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

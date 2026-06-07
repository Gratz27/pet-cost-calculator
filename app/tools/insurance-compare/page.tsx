import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, Check, X, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Insurance Comparison Guide 2026 | PetCost-Calculator",
  description: "Is pet insurance worth it? Compare pet insurance costs by breed, what's covered, and which providers offer the best value in 2026.",
};

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
  },
  {
    name: "Embrace",
    coverage: "Up to 90%",
    avgMonthly: "$48",
    deductible: "$100–$1,000",
    waitingPeriod: "14 days",
    pros: ["Wellness add-on available", "Diminishing deductible", "US only"],
    cons: ["Higher base premiums", "5-day accident waiting period"],
    bestFor: "Wellness + illness coverage",
    link: "https://www.embracepetinsurance.com",
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
  },
];

const breedCosts = [
  { breed: "French Bulldog", monthly: 85, reason: "High vet use, brachycephalic breed" },
  { breed: "Golden Retriever", monthly: 58, reason: "Cancer and hip dysplasia predisposition" },
  { breed: "Labrador Retriever", monthly: 52, reason: "Generally healthy, common breed" },
  { breed: "Poodle (Standard)", monthly: 55, reason: "Few genetic issues, long lifespan" },
  { breed: "Border Collie", monthly: 45, reason: "Active, fit breed, fewer conditions" },
  { breed: "Maine Coon (Cat)", monthly: 42, reason: "Cardiac issues in breed" },
  { breed: "Domestic Shorthair (Cat)", monthly: 28, reason: "Robust mixed genetics" },
  { breed: "Persian Cat", monthly: 38, reason: "Respiratory and eye conditions" },
];

export default function InsuranceComparePage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-[#2E7D32]">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Insurance Compare</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12 max-w-4xl">
          <div className="badge badge-blue mb-3">Insurance Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-4">Pet Insurance Comparison 2026</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Is pet insurance worth it? We break down what each policy covers, average costs by breed, and how to choose the right provider.
          </p>
          <p className="text-xs text-slate-400 mt-4">Updated June 2026 · Affiliate disclosure: some links are affiliate links that help fund this site at no cost to you.</p>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl space-y-8">

        {/* Is it worth it? */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">Is Pet Insurance Worth It?</h2>
          <div className="article-content">
            <p>Pet insurance is worth it when the cost of a potential claim exceeds the total premiums paid. For most breeds, this break-even point comes within 2–4 years of ownership — and a single emergency surgery can cost more than 3 years of premiums.</p>
            <p><strong>Pet insurance is particularly valuable if:</strong></p>
            <ul>
              <li>You own a breed with known health predispositions (e.g. French Bulldogs, Golden Retrievers)</li>
              <li>You don&apos;t have an emergency pet fund of $2,000+</li>
              <li>You want predictable monthly costs rather than variable vet bills</li>
              <li>Your pet is young — premiums are significantly lower before age 3</li>
            </ul>
            <p><strong>Pet insurance may not be worth it if:</strong></p>
            <ul>
              <li>You own a robust mixed-breed with no known conditions</li>
              <li>You have a large enough emergency fund to self-insure</li>
              <li>Your pet is already older (over 8) and premiums have risen significantly</li>
            </ul>
          </div>
        </div>

        {/* Average cost by breed */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-[#1B2B1B] mb-4">Average Monthly Insurance Cost by Breed</h2>
          <div className="space-y-3">
            {breedCosts.map(({ breed, monthly, reason }) => (
              <div key={breed} className="flex items-center justify-between py-2 border-b border-[#E8F5E9] last:border-0">
                <div>
                  <div className="text-sm font-medium text-[#1B2B1B]">{breed}</div>
                  <div className="text-xs text-slate-400">{reason}</div>
                </div>
                <div className="text-base font-bold text-[#2E7D32]">${monthly}/mo</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">* US averages. UK and AU premiums vary. Use these as a planning guide only.</p>
        </div>

        {/* Provider comparison */}
        <div>
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">Top Providers Compared</h2>
          <div className="space-y-5">
            {providers.map((p) => (
              <div key={p.name} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1B2B1B]">{p.name}</h3>
                    <p className="text-sm text-[#5a7a5a]">Best for: {p.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#2E7D32]">{p.avgMonthly}</div>
                    <div className="text-xs text-slate-400">avg/month</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                  <div className="rounded-lg bg-[#F1F8F1] p-3">
                    <div className="text-slate-500 mb-0.5">Coverage</div>
                    <div className="font-semibold text-[#1B2B1B]">{p.coverage}</div>
                  </div>
                  <div className="rounded-lg bg-[#F1F8F1] p-3">
                    <div className="text-slate-500 mb-0.5">Deductible</div>
                    <div className="font-semibold text-[#1B2B1B]">{p.deductible}</div>
                  </div>
                  <div className="rounded-lg bg-[#F1F8F1] p-3">
                    <div className="text-slate-500 mb-0.5">Waiting period</div>
                    <div className="font-semibold text-[#1B2B1B]">{p.waitingPeriod}</div>
                  </div>
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
        </div>

        <div className="text-center pt-4">
          <Link href="/calculator" className="btn-primary">Calculate My Full Pet Costs →</Link>
        </div>
      </div>
    </div>
  );
}

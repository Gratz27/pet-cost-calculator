import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calculator, ChevronRight, TrendingUp, Shield, Clock, AlertTriangle } from "lucide-react";
import { getAllBreeds, getBreedById } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");
  return [...dogs, ...cats].map((b) => ({ slug: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const breed = getBreedById("dog", params.slug) ?? getBreedById("cat", params.slug);
  if (!breed) return { title: "Breed Not Found" };

  const firstYear = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.annualFood + breed.annualVet + breed.annualGrooming;

  return {
    title: `${breed.name} Cost Guide – How Much Does a ${breed.name} Cost?`,
    description: `Complete ${breed.name} cost guide. First-year costs from ${formatCurrency(firstYear)}, annual expenses, lifetime ownership costs, and money-saving tips.`,
    openGraph: {
      title: `${breed.name} Ownership Cost Guide`,
      description: `How much does a ${breed.name} cost? Full breakdown of first-year, annual, and lifetime costs.`,
    },
  };
}

export default function BreedPage({ params }: Props) {
  const petType = (() => {
    if (getBreedById("dog", params.slug)) return "dog" as const;
    if (getBreedById("cat", params.slug)) return "cat" as const;
    return null;
  })();

  if (!petType) notFound();

  const breed = getBreedById(petType, params.slug)!;

  const firstYearTotal = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.training + breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance;
  const annualTotal = breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance + breed.annualSupplies;
  const lifetimeTotal = firstYearTotal + annualTotal * (breed.lifespan - 1);

  const costItems = [
    {
      category: "First Year (One-time + Year 1)",
      items: [
        { label: `Purchase / Adoption Fee`, value: breed.adoptionFee, note: "Varies by breeder vs rescue" },
        { label: "Initial Vet Visit & Vaccinations", value: breed.initialVet, note: "Spay/neuter, microchip, health check" },
        { label: "Starter Supplies", value: breed.initialSupplies, note: "Bed, crate, collar, bowls, toys" },
        { label: "Training Classes", value: breed.training, note: "Basic obedience recommended" },
        { label: "First Year Food", value: breed.annualFood, note: "Quality dry food or equivalent" },
        { label: "First Year Vet", value: breed.annualVet, note: "Annual wellness visits" },
        { label: "First Year Grooming", value: breed.annualGrooming, note: "Professional grooming" },
        { label: "First Year Insurance", value: breed.annualInsurance, note: "Accident & illness coverage" },
      ],
      total: firstYearTotal,
    },
    {
      category: "Annual Ongoing (Year 2+)",
      items: [
        { label: "Food", value: breed.annualFood },
        { label: "Vet Care", value: breed.annualVet },
        { label: "Grooming", value: breed.annualGrooming },
        { label: "Pet Insurance", value: breed.annualInsurance },
        { label: "Supplies & Toys", value: breed.annualSupplies },
      ],
      total: annualTotal,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#1E3A5F]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/breeds" className="hover:text-[#1E3A5F]">Breeds</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#0f172a] font-medium">{breed.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-xl py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${breed.size === "small" ? "badge-green" : breed.size === "medium" ? "badge-blue" : "badge-orange"}`}>
                  {breed.size} · {petType}
                </span>
                <span className="badge badge-blue">{breed.lifespan} yr lifespan</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
                How Much Does a {breed.name} Cost?
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                {breed.description} Complete cost breakdown below — from first-year setup to lifetime ownership.
              </p>
            </div>
            <Link
              href={`/calculator`}
              className="btn-green flex-shrink-0"
            >
              <Calculator className="h-4 w-4" />
              Get My Personalised Estimate
            </Link>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { label: "First Year Total", value: formatCurrency(firstYearTotal), sub: "inc. one-time setup", icon: TrendingUp, color: "text-[#1E3A5F]" },
              { label: "Annual Ongoing", value: formatCurrency(annualTotal), sub: "per year from year 2", icon: Clock, color: "text-[#16A34A]" },
              { label: "Lifetime Estimate", value: formatCurrency(lifetimeTotal), sub: `over ${breed.lifespan} years`, icon: Shield, color: "text-purple-600" },
            ].map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <Icon className={`h-5 w-5 ${color} mb-2`} />
                <div className="text-2xl font-bold text-[#0f172a]">{value}</div>
                <div className="text-sm font-medium text-slate-700 mt-0.5">{label}</div>
                <div className="text-xs text-slate-400">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {costItems.map((section) => (
            <div key={section.category} className="card p-6">
              <h2 className="text-lg font-bold text-[#0f172a] mb-4">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700">{item.label}</div>
                      {"note" in item && item.note && <div className="text-xs text-slate-400">{item.note}</div>}
                    </div>
                    <span className="text-sm font-semibold text-[#0f172a] whitespace-nowrap">{formatCurrency(item.value)}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <span className="text-sm font-bold text-[#0f172a]">Total</span>
                  <span className="text-base font-bold text-[#1E3A5F]">{formatCurrency(section.total)}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Emergency fund */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-1">Budget for emergencies</h3>
                <p className="text-sm text-amber-800">
                  Unexpected vet bills are the #1 financial shock for new pet owners. We recommend keeping{" "}
                  <strong>{formatCurrency(breed.size === "large" ? 3000 : breed.size === "medium" ? 2500 : 2000)}</strong> in a dedicated emergency fund for your {breed.name}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Get personalised estimate */}
          <div className="card p-5 bg-gradient-to-br from-[#0f172a] to-[#1E3A5F] text-white border-0">
            <h3 className="text-base font-bold mb-2">Get a personalised estimate</h3>
            <p className="text-blue-200 text-sm mb-4">These are baseline costs. Your actual costs depend on your location, lifestyle, and choices.</p>
            <Link href="/calculator" className="btn-green w-full text-sm text-center">
              Start the Calculator
            </Link>
          </div>

          {/* Quick facts */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-[#0f172a] mb-3">Quick Facts</h3>
            <div className="space-y-2.5 text-sm">
              {[
                { label: "Size", value: breed.size.charAt(0).toUpperCase() + breed.size.slice(1) },
                { label: "Average lifespan", value: `${breed.lifespan} years` },
                { label: "Annual food cost", value: formatCurrency(breed.annualFood) },
                { label: "Annual vet cost", value: formatCurrency(breed.annualVet) },
                { label: "Annual grooming", value: formatCurrency(breed.annualGrooming) },
                { label: "Annual insurance", value: formatCurrency(breed.annualInsurance) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-[#0f172a]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compare */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-[#0f172a] mb-2">Compare with other breeds</h3>
            <p className="text-xs text-slate-500 mb-3">See how {breed.name} costs compare to similar breeds.</p>
            <Link href="/compare" className="btn-secondary w-full text-sm text-center">
              Compare Breeds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

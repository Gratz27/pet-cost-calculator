import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator, ChevronRight, TrendingUp, Shield, Clock, AlertTriangle } from "lucide-react";
import { getAllBreeds, getBreedById } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import BreedImage from "@/components/BreedImage";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return [...getAllBreeds("dog"), ...getAllBreeds("cat")].map((b) => ({ slug: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const breed = getBreedById("dog", params.slug) ?? getBreedById("cat", params.slug);
  if (!breed) return { title: "Breed Not Found" };
  const firstYear = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.annualFood + breed.annualVet + breed.annualGrooming;
  return {
    title: `${breed.name} Cost Guide – How Much Does a ${breed.name} Cost?`,
    description: `Complete ${breed.name} cost guide. First-year costs from ${formatCurrency(firstYear)}, annual expenses, lifetime ownership costs, and money-saving tips.`,
  };
}

export default function BreedPage({ params }: Props) {
  const petType = getBreedById("dog", params.slug) ? "dog" as const : getBreedById("cat", params.slug) ? "cat" as const : null;
  if (!petType) notFound();
  const breed = getBreedById(petType, params.slug)!

  const firstYearTotal = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.training + breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance;
  const annualTotal = breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance + breed.annualSupplies;
  const lifetimeTotal = firstYearTotal + annualTotal * (breed.lifespan - 1);

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/breeds" className="hover:text-[#2E7D32]">Breeds</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">{breed.name}</span>
          </nav>
        </div>
      </div>

      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="relative w-full md:w-72 h-52 rounded-2xl overflow-hidden flex-shrink-0 border border-[#C8E6C9]">
              <BreedImage breedId={breed.id} petType={petType} alt={breed.name} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 288px" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`badge ${breed.size === "small" ? "badge-green" : breed.size === "medium" ? "badge-blue" : "badge-orange"}`}>{breed.size}</span>
                <span className="badge badge-green capitalize">{petType}</span>
                <span className="badge badge-blue">{breed.lifespan} yr lifespan</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">
                How Much Does a {breed.name} Cost?
              </h1>
              <p className="text-[#5a7a5a] text-lg leading-relaxed mb-5">{breed.description}</p>
              <Link href="/calculator" className="btn-green">
                <Calculator className="h-4 w-4" /> Get My Personalised Estimate
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { label: "First Year Total", value: formatCurrency(firstYearTotal), sub: "inc. one-time setup", icon: TrendingUp, color: "text-[#2E7D32]" },
              { label: "Annual Ongoing", value: formatCurrency(annualTotal), sub: "per year from year 2", icon: Clock, color: "text-[#1565C0]" },
              { label: "Lifetime Estimate", value: formatCurrency(lifetimeTotal), sub: `over ${breed.lifespan} years`, icon: Shield, color: "text-purple-600" },
            ].map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="bg-[#F1F8F1] rounded-2xl p-5 border border-[#C8E6C9]">
                <Icon className={`h-5 w-5 ${color} mb-2`} />
                <div className="text-2xl font-bold text-[#1B2B1B]">{value}</div>
                <div className="text-sm font-medium text-[#5a7a5a] mt-0.5">{label}</div>
                <div className="text-xs text-slate-400">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {[
            {
              title: "First Year Costs (inc. setup)",
              items: [
                { label: "Purchase / Adoption Fee", value: breed.adoptionFee, note: "Varies by breeder vs rescue" },
                { label: "Initial Vet Visit & Vaccinations", value: breed.initialVet, note: "Spay/neuter, microchip, health check" },
                { label: "Starter Supplies", value: breed.initialSupplies, note: "Bed, crate, collar, bowls, toys" },
                { label: "Training Classes", value: breed.training, note: "Basic obedience recommended" },
                { label: "First Year Food", value: breed.annualFood },
                { label: "First Year Vet Care", value: breed.annualVet },
                { label: "First Year Grooming", value: breed.annualGrooming },
                { label: "First Year Insurance", value: breed.annualInsurance },
              ],
              total: firstYearTotal,
            },
            {
              title: "Annual Ongoing Costs (Year 2+)",
              items: [
                { label: "Food", value: breed.annualFood },
                { label: "Vet Care", value: breed.annualVet },
                { label: "Grooming", value: breed.annualGrooming },
                { label: "Pet Insurance", value: breed.annualInsurance },
                { label: "Supplies & Toys", value: breed.annualSupplies },
              ],
              total: annualTotal,
            },
          ].map((section) => (
            <div key={section.title} className="card p-6">
              <h2 className="text-lg font-bold text-[#1B2B1B] mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-[#5a7a5a]">{item.label}</div>
                      {"note" in item && item.note && <div className="text-xs text-slate-400">{item.note}</div>}
                    </div>
                    <span className="text-sm font-semibold text-[#1B2B1B] whitespace-nowrap">{formatCurrency(item.value)}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-[#E8F5E9] flex justify-between">
                  <span className="text-sm font-bold text-[#1B2B1B]">Total</span>
                  <span className="text-base font-bold text-[#2E7D32]">{formatCurrency(section.total)}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-1">Budget for emergencies</h3>
                <p className="text-sm text-amber-800">
                  We recommend keeping <strong>{formatCurrency(breed.size === "large" ? 3000 : breed.size === "medium" ? 2500 : 2000)}</strong> in a dedicated emergency fund for unexpected vet bills.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0">
            <h3 className="text-base font-bold mb-2">Get a personalised estimate</h3>
            <p className="text-green-200 text-sm mb-4">These are baseline costs. Your actual costs depend on your location, lifestyle, and choices.</p>
            <Link href="/calculator" className="btn-green w-full text-sm text-center block">Start the Calculator</Link>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-3">Quick Facts</h3>
            <div className="space-y-2.5 text-sm">
              {[
                ["Size", breed.size.charAt(0).toUpperCase() + breed.size.slice(1)],
                ["Lifespan", `${breed.lifespan} years`],
                ["Annual food", formatCurrency(breed.annualFood)],
                ["Annual vet", formatCurrency(breed.annualVet)],
                ["Annual grooming", formatCurrency(breed.annualGrooming)],
                ["Annual insurance", formatCurrency(breed.annualInsurance)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[#5a7a5a]">{label}</span>
                  <span className="font-medium text-[#1B2B1B]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-2">Compare breeds</h3>
            <Link href="/compare" className="btn-secondary w-full text-sm text-center block">Compare Breeds</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

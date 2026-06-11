import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator, ChevronRight, TrendingUp, Shield, Clock, AlertTriangle, Lightbulb } from "lucide-react";
import { getAllBreeds, getBreedById } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import BreedImage from "@/components/BreedImage";
import AdUnit from "@/components/AdUnit";
import { productLinks, resolveLink, amazonSearchLink, breedGearQuery } from "@/lib/affiliateLinks";

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
    alternates: { canonical: `https://petcost-calculator.com/breeds/${breed.id}` },
    openGraph: {
      title: `${breed.name} Cost Guide – How Much Does a ${breed.name} Cost?`,
      description: `Complete ${breed.name} cost guide. First-year costs from ${formatCurrency(firstYear)}, annual expenses, and lifetime costs.`,
      url: `https://petcost-calculator.com/breeds/${breed.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${breed.name} Cost Guide – How Much Does a ${breed.name} Cost?`,
      description: `Complete ${breed.name} cost guide. First-year costs from ${formatCurrency(firstYear)}, annual expenses, and lifetime costs.`,
    },
  };
}

export default function BreedPage({ params }: Props) {
  const petType = getBreedById("dog", params.slug) ? "dog" as const : getBreedById("cat", params.slug) ? "cat" as const : null;
  if (!petType) notFound();
  const breed = getBreedById(petType, params.slug)!

  const firstYearTotal = breed.adoptionFee + breed.initialVet + breed.initialSupplies + breed.training + breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance;
  const annualTotal = breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualInsurance + breed.annualSupplies;
  const lifetimeTotal = firstYearTotal + annualTotal * (breed.lifespan - 1);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${breed.name} Cost Guide – How Much Does a ${breed.name} Cost?`,
      description: `Complete ${breed.name} cost guide with first-year costs, annual expenses, and lifetime ownership costs.`,
      url: `https://petcost-calculator.com/breeds/${breed.id}`,
      dateModified: new Date().toISOString().split("T")[0],
      publisher: { "@type": "Organization", name: "PetCost-Calculator", url: "https://petcost-calculator.com" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://petcost-calculator.com" },
          { "@type": "ListItem", position: 2, name: "Breeds", item: "https://petcost-calculator.com/breeds" },
          { "@type": "ListItem", position: 3, name: breed.name, item: `https://petcost-calculator.com/breeds/${breed.id}` },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How much does a ${breed.name} cost?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `A ${breed.name} typically costs ${formatCurrency(firstYearTotal)} in the first year, including purchase/adoption, vet care, food, and supplies. Annual ongoing costs average ${formatCurrency(annualTotal)}/yr, and the lifetime total over ${breed.lifespan} years is around ${formatCurrency(lifetimeTotal)}.`,
          },
        },
        {
          "@type": "Question",
          name: `How much does a ${breed.name} cost per year?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `After the first year, a ${breed.name} costs approximately ${formatCurrency(annualTotal)} per year on average, covering food (${formatCurrency(breed.annualFood)}), vet care (${formatCurrency(breed.annualVet)}), grooming (${formatCurrency(breed.annualGrooming)}), and insurance (${formatCurrency(breed.annualInsurance)}).`,
          },
        },
        {
          "@type": "Question",
          name: `Is a ${breed.name} expensive to own?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${breed.name}s have a lifetime ownership cost of approximately ${formatCurrency(lifetimeTotal)} over ${breed.lifespan} years. The US national average for dog ownership is around $2,600/yr, so ${breed.name}s are ${annualTotal > 2600 ? "above" : "below"} average in annual running costs.`,
          },
        },
      ],
    },
  ];

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
              <Link href={`/calculator?breedId=${breed.id}&petType=${petType}`} className="btn-green">
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

          {/* Ad — between cost tables and content */}
          <AdUnit slot="2847391056" format="horizontal" className="my-2" />

          {/* About section */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-[#1B2B1B] mb-3">About the {breed.name}</h2>
            <p className="text-[#5a7a5a] text-sm leading-relaxed mb-3">
              The {breed.name} is a {breed.size}-sized {petType} breed with an average lifespan of {breed.lifespan} years.
              First-year ownership costs typically run around {formatCurrency(firstYearTotal)}, which includes the purchase or adoption fee,
              initial vet visits, vaccinations, starter supplies, and the first year of food, grooming, and insurance.
            </p>
            <p className="text-[#5a7a5a] text-sm leading-relaxed mb-3">
              From year two onwards, ongoing costs average {formatCurrency(annualTotal)} per year. The largest recurring expense
              is {breed.annualFood > breed.annualVet ? "food" : "vet care"} at {formatCurrency(Math.max(breed.annualFood, breed.annualVet))}/year,
              followed by {breed.annualFood > breed.annualVet ? "vet care" : "food"} at {formatCurrency(Math.min(breed.annualFood, breed.annualVet))}/year.
              {breed.annualGrooming > 400 ? ` Grooming is a significant cost for this breed at ${formatCurrency(breed.annualGrooming)}/year, reflecting their coat maintenance requirements.` : ""}
            </p>
            <p className="text-[#5a7a5a] text-sm leading-relaxed">
              Over a {breed.lifespan}-year lifespan, the total estimated cost of owning a {breed.name} is approximately {formatCurrency(lifetimeTotal)}.
              These figures are US national averages — your actual costs will vary based on your city, lifestyle, and whether you use a breeder or rescue organisation.
              Use our calculator above to get a personalised estimate.
            </p>
          </div>

          {/* Money-saving tips */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-[#2E7D32]" />
              <h2 className="text-lg font-bold text-[#1B2B1B]">How to save on {breed.name} costs</h2>
            </div>
            <ul className="space-y-3 text-sm text-[#5a7a5a]">
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] font-bold mt-0.5">→</span>
                <span><strong className="text-[#1B2B1B]">Adopt, don't shop.</strong> Rescue organisations typically charge {formatCurrency(150)}–{formatCurrency(400)} compared to {formatCurrency(breed.adoptionFee)}+ from breeders. Adult {petType}s from shelters are often already vaccinated and desexed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] font-bold mt-0.5">→</span>
                <span><strong className="text-[#1B2B1B]">Get pet insurance early.</strong> {breed.name}s insured as puppies or kittens typically see lower premiums and fewer exclusions. At {formatCurrency(breed.annualInsurance)}/year, insurance can save thousands on a single emergency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] font-bold mt-0.5">→</span>
                <span><strong className="text-[#1B2B1B]">Buy food in bulk.</strong> Premium food for a {breed.size} {petType} costs {formatCurrency(breed.annualFood)}/year on average. Buying 15–20kg bags and comparing brands can cut this by 20–30%.</span>
              </li>
              {breed.annualGrooming > 500 && (
                <li className="flex items-start gap-2">
                  <span className="text-[#2E7D32] font-bold mt-0.5">→</span>
                  <span><strong className="text-[#1B2B1B]">Learn basic grooming.</strong> Professional grooming costs {formatCurrency(breed.annualGrooming)}/year for this breed. Learning to brush and bathe at home between professional appointments can halve this cost.</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-[#2E7D32] font-bold mt-0.5">→</span>
                <span><strong className="text-[#1B2B1B]">Build an emergency fund.</strong> We recommend {formatCurrency(breed.size === "large" ? 3000 : breed.size === "medium" ? 2500 : 2000)} in a dedicated pet savings account. A single emergency surgery can cost {formatCurrency(3000)}–{formatCurrency(8000)} without insurance.</span>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-[#1B2B1B] mb-4">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {[
                {
                  q: `How much does a ${breed.name} cost?`,
                  a: `A ${breed.name} typically costs ${formatCurrency(firstYearTotal)} in the first year, including the purchase or adoption fee (${formatCurrency(breed.adoptionFee)}), initial vet visits (${formatCurrency(breed.initialVet)}), supplies (${formatCurrency(breed.initialSupplies)}), and the first year of food, grooming, and insurance. Annual ongoing costs from year two are approximately ${formatCurrency(annualTotal)}/year.`,
                },
                {
                  q: `How much does a ${breed.name} cost per month?`,
                  a: `After the first year, a ${breed.name} costs approximately ${formatCurrency(Math.round(annualTotal / 12))}/month on average. This covers food (${formatCurrency(Math.round(breed.annualFood / 12))}/month), vet care (${formatCurrency(Math.round(breed.annualVet / 12))}/month), grooming (${formatCurrency(Math.round(breed.annualGrooming / 12))}/month), and insurance (${formatCurrency(Math.round(breed.annualInsurance / 12))}/month).`,
                },
                {
                  q: `Is a ${breed.name} expensive to own?`,
                  a: `${breed.name}s cost approximately ${formatCurrency(annualTotal)}/year to maintain — ${annualTotal > 2600 ? "above" : "below"} the US national average of around $2,600/year for ${petType} ownership. Over their ${breed.lifespan}-year lifespan, total costs come to around ${formatCurrency(lifetimeTotal)}.`,
                },
                {
                  q: `How much does ${petType === "dog" ? "a puppy" : "a kitten"} ${breed.name} cost?`,
                  a: `A ${breed.name} ${petType === "dog" ? "puppy" : "kitten"} from a reputable breeder typically costs ${formatCurrency(breed.adoptionFee)}. Rescue or shelter adoption fees are usually ${formatCurrency(150)}–${formatCurrency(400)} and often include initial vaccinations and desexing. Remember the purchase price is just one part of the first-year cost of ${formatCurrency(firstYearTotal)}.`,
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-[#E8F5E9] pb-4 last:border-0 last:pb-0">
                  <h3 className="text-sm font-bold text-[#1B2B1B] mb-1.5">{q}</h3>
                  <p className="text-sm text-[#5a7a5a] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0">
            <h3 className="text-base font-bold mb-2">Get a personalised estimate</h3>
            <p className="text-green-200 text-sm mb-4">These are baseline costs. Your actual costs depend on your location, lifestyle, and choices.</p>
            <Link href={`/calculator?breedId=${breed.id}&petType=${petType}`} className="btn-green w-full text-sm text-center block">Start the Calculator</Link>
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
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-3">Compare {breed.name} with</h3>
            <div className="space-y-2">
              {[
                petType === "dog" ? "labrador-retriever" : "persian",
                petType === "dog" ? "golden-retriever" : "maine-coon",
                petType === "dog" ? "french-bulldog" : "ragdoll",
              ]
                .filter(id => id !== breed.id)
                .slice(0, 2)
                .map(otherId => {
                  const other = getBreedById(petType, otherId);
                  if (!other) return null;
                  const [a, b] = [breed.id, otherId].sort();
                  return (
                    <Link key={otherId} href={`/compare/${a}-vs-${b}`}
                      className="block text-sm text-[#2E7D32] hover:underline font-medium">
                      {breed.name} vs {other.name} →
                    </Link>
                  );
                })}
            </div>
            <Link href="/compare" className="btn-secondary w-full text-sm text-center block mt-3">All Comparisons</Link>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-3">Recommended gear for your {breed.name}</h3>
            <div className="space-y-2.5">
              <a href={amazonSearchLink(breedGearQuery(breed.name, petType, breed.size))} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#F1F8F1] border border-[#C8E6C9] p-3 hover:border-[#4CAF50] transition-all group">
                <div className="text-2xl">📦</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">Shop {breed.name} essentials</div>
                  <div className="text-xs text-slate-400">Food, bedding & supplies on Amazon</div>
                </div>
              </a>
              <a href={resolveLink(productLinks.chewy)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#F1F8F1] border border-[#C8E6C9] p-3 hover:border-[#4CAF50] transition-all group">
                <div className="text-2xl">🦴</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">Top-rated food on Chewy</div>
                  <div className="text-xs text-slate-400">Auto-ship saves up to 30%</div>
                </div>
              </a>
            </div>
          </div>

          {/* Ad — bottom of sidebar */}
          <AdUnit slot="6193847205" format="rectangle" className="mt-2" />
        </div>
      </div>
    </div>
    </>
  );
}

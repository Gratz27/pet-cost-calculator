import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Check, X } from "lucide-react";
import {
  getAllBreeds,
  getBreedById,
  getBreedFirstYearTotal,
  getBreedAnnualTotal,
  getBreedLifetimeTotal,
  type Breed,
} from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import AdUnit from "@/components/AdUnit";

interface Props { params: { slug: string } }

// Top breeds by search volume — used to generate the highest-value comparison pairs
const TOP_DOG_BREEDS = [
  "golden-retriever", "labrador-retriever", "french-bulldog", "german-shepherd-dog",
  "poodle-standard", "bulldog", "beagle", "rottweiler", "german-shorthaired-pointer",
  "dachshund", "pembroke-welsh-corgi", "yorkshire-terrier", "australian-shepherd",
  "boxer", "border-collie", "siberian-husky", "great-dane", "doberman-pinscher",
  "cavalier-king-charles-spaniel", "shih-tzu", "boston-terrier", "bernese-mountain-dog",
  "pomeranian", "miniature-schnauzer", "english-cocker-spaniel", "bichon-frise",
  "maltese", "weimaraner", "brittany", "english-setter",
];

const TOP_CAT_BREEDS = [
  "persian", "maine-coon", "ragdoll", "bengal", "siamese", "british-shorthair",
  "abyssinian", "russian-blue", "scottish-fold", "sphynx", "norwegian-forest",
  "devon-rex", "american-shorthair", "birman", "burmese",
];

export async function generateStaticParams() {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  // Build lookup sets of valid IDs
  const dogIds = new Set(dogs.map(d => d.id));
  const catIds = new Set(cats.map(c => c.id));

  const params: { slug: string }[] = [];
  const seen = new Set<string>();

  function addPair(a: string, b: string) {
    if (a === b) return;
    const key = [a, b].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    params.push({ slug: `${a}-vs-${b}` });
  }

  // 1. All pairs within top dog breeds (29×28/2 = 406 pairs)
  const validTopDogs = TOP_DOG_BREEDS.filter(id => dogIds.has(id));
  for (let i = 0; i < validTopDogs.length; i++) {
    for (let j = i + 1; j < validTopDogs.length; j++) {
      addPair(validTopDogs[i], validTopDogs[j]);
    }
  }

  // 2. All pairs within top cat breeds (15×14/2 = 105 pairs)
  const validTopCats = TOP_CAT_BREEDS.filter(id => catIds.has(id));
  for (let i = 0; i < validTopCats.length; i++) {
    for (let j = i + 1; j < validTopCats.length; j++) {
      addPair(validTopCats[i], validTopCats[j]);
    }
  }

  // 3. Each top dog vs the next 5 dogs in the full list (same-size pairs, adds ~100)
  const allDogIds = dogs.map(d => d.id);
  for (const topId of validTopDogs) {
    const idx = allDogIds.indexOf(topId);
    const neighbours = allDogIds.slice(idx + 1, idx + 6);
    for (const neighbour of neighbours) addPair(topId, neighbour);
  }

  // 4. Each top cat vs the next 4 cats (adds ~60)
  const allCatIds = cats.map(c => c.id);
  for (const topId of validTopCats) {
    const idx = allCatIds.indexOf(topId);
    const neighbours = allCatIds.slice(idx + 1, idx + 5);
    for (const neighbour of neighbours) addPair(topId, neighbour);
  }

  return params;
}

function parseSlug(slug: string): [string, string] | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}

function findBreed(id: string): { breed: Breed; petType: "dog" | "cat" } | null {
  const dog = getBreedById("dog", id);
  if (dog) return { breed: dog, petType: "dog" };
  const cat = getBreedById("cat", id);
  if (cat) return { breed: cat, petType: "cat" };
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parts = parseSlug(params.slug);
  if (!parts) return { title: "Breed Comparison" };
  const [id1, id2] = parts;
  const b1 = findBreed(id1);
  const b2 = findBreed(id2);
  if (!b1 || !b2) return { title: "Breed Comparison" };
  // Canonical always uses alphabetical order to avoid duplicate content
  const [sortedId1, sortedId2] = [id1, id2].sort();
  const canonicalSlug = `${sortedId1}-vs-${sortedId2}`;
  const title = `${b1.breed.name} vs ${b2.breed.name} – Cost Comparison`;
  const description = `Compare the full cost of owning a ${b1.breed.name} vs a ${b2.breed.name}. First-year costs, annual expenses, lifetime totals, and key differences.`;
  const url = `https://petcost-calculator.com/compare/${canonicalSlug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CompareSlugPage({ params }: Props) {
  const parts = parseSlug(params.slug);
  if (!parts) notFound();

  const [id1, id2] = parts;
  const result1 = findBreed(id1);
  const result2 = findBreed(id2);
  if (!result1 || !result2) notFound();

  const { breed: b1 } = result1;
  const { breed: b2 } = result2;

  // Use the canonical baseline helpers so the same breed shows identical
  // numbers on the homepage, breed pages, and these comparison pages.
  const baseAnnual1 = getBreedAnnualTotal(b1);
  const baseAnnual2 = getBreedAnnualTotal(b2);
  const firstYear1 = getBreedFirstYearTotal(b1);
  const firstYear2 = getBreedFirstYearTotal(b2);
  const lifetime1 = getBreedLifetimeTotal(b1);
  const lifetime2 = getBreedLifetimeTotal(b2);

  const cheaper = firstYear1 < firstYear2 ? b1 : b2;
  const saving = Math.abs(firstYear1 - firstYear2);

  // ── Derived comparison analysis (unique per breed pair) ──────────────
  const cheaperLifetime = lifetime1 <= lifetime2 ? b1 : b2;
  const pricierLifetime = cheaperLifetime.id === b1.id ? b2 : b1;
  const cheaperLifetimeVal = Math.min(lifetime1, lifetime2);
  const pricierLifetimeVal = Math.max(lifetime1, lifetime2);
  const lifetimeGap = Math.abs(lifetime1 - lifetime2);
  const lifetimePct = pricierLifetimeVal > 0 ? Math.round((lifetimeGap / pricierLifetimeVal) * 100) : 0;
  const monthly1 = Math.round(baseAnnual1 / 12);
  const monthly2 = Math.round(baseAnnual2 / 12);
  const emergencyFundFor = (b: Breed) => (b.size === "large" ? 3000 : b.size === "medium" ? 2500 : 2000);
  const maxEmergency = Math.max(emergencyFundFor(b1), emergencyFundFor(b2));
  const sizeRank = { small: 1, medium: 2, large: 3 } as const;
  const larger = sizeRank[b1.size] >= sizeRank[b2.size] ? b1 : b2;

  // Largest single annual cost driver behind the difference
  const annualCats = [
    { label: "food", v1: b1.annualFood, v2: b2.annualFood },
    { label: "vet care", v1: b1.annualVet, v2: b2.annualVet },
    { label: "grooming", v1: b1.annualGrooming, v2: b2.annualGrooming },
    { label: "insurance", v1: b1.annualInsurance, v2: b2.annualInsurance },
  ];
  const biggestDriver = annualCats
    .map((c) => ({ ...c, diff: Math.abs(c.v1 - c.v2) }))
    .sort((a, b) => b.diff - a.diff)[0];
  const driverPricier = biggestDriver.v1 > biggestDriver.v2 ? b1 : b2;

  // FAQ content (unique, data-driven) — also emitted as FAQPage JSON-LD
  const faqs = [
    {
      q: `Is a ${b1.name} or a ${b2.name} cheaper to own?`,
      a: `The ${cheaper.name} is cheaper in the first year (${formatCurrency(Math.min(firstYear1, firstYear2))} vs ${formatCurrency(Math.max(firstYear1, firstYear2))}). Over a full lifetime the ${cheaperLifetime.name} works out cheaper overall — about ${formatCurrency(cheaperLifetimeVal)} versus ${formatCurrency(pricierLifetimeVal)}, a difference of roughly ${formatCurrency(lifetimeGap)}.`,
    },
    {
      q: `How much does a ${b1.name} cost per month compared to a ${b2.name}?`,
      a: `After the first year, a ${b1.name} costs about ${formatCurrency(monthly1)}/month in ongoing expenses, while a ${b2.name} costs about ${formatCurrency(monthly2)}/month. These figures cover food, routine vet care, grooming, insurance and supplies, based on US national averages.`,
    },
    {
      q: `What's the biggest cost difference between a ${b1.name} and a ${b2.name}?`,
      a: `The largest single difference is ${biggestDriver.label}: a ${driverPricier.name} costs about ${formatCurrency(Math.max(biggestDriver.v1, biggestDriver.v2))} a year versus ${formatCurrency(Math.min(biggestDriver.v1, biggestDriver.v2))} for the other breed. ${
        b1.lifespan !== b2.lifespan
          ? `Lifespan also matters — the ${b1.lifespan > b2.lifespan ? b1.name : b2.name} typically lives longer (${Math.max(b1.lifespan, b2.lifespan)} vs ${Math.min(b1.lifespan, b2.lifespan)} years), which adds more years of ongoing costs.`
          : `Both breeds share a similar ${b1.lifespan}-year lifespan, so lifetime totals come down mainly to annual costs.`
      }`,
    },
    {
      q: `Do ${b1.name}s or ${b2.name}s cost more at the vet?`,
      a: `Routine annual vet care runs about ${formatCurrency(b1.annualVet)} for a ${b1.name} and ${formatCurrency(b2.annualVet)} for a ${b2.name}. Either way, we recommend an emergency fund of at least ${formatCurrency(maxEmergency)}, since a single emergency procedure can cost several thousand dollars regardless of breed.`,
    },
  ];

  const rows = [
    { label: "Size", v1: b1.size, v2: b2.size },
    { label: "Lifespan", v1: `${b1.lifespan} yrs`, v2: `${b2.lifespan} yrs` },
    { label: "Adoption/Purchase fee", v1: formatCurrency(b1.adoptionFee), v2: formatCurrency(b2.adoptionFee) },
    { label: "Initial vet costs", v1: formatCurrency(b1.initialVet), v2: formatCurrency(b2.initialVet) },
    { label: "Annual food", v1: formatCurrency(b1.annualFood), v2: formatCurrency(b2.annualFood) },
    { label: "Annual vet", v1: formatCurrency(b1.annualVet), v2: formatCurrency(b2.annualVet) },
    { label: "Annual grooming", v1: formatCurrency(b1.annualGrooming), v2: formatCurrency(b2.annualGrooming) },
    { label: "Annual insurance", v1: formatCurrency(b1.annualInsurance), v2: formatCurrency(b2.annualInsurance) },
    { label: "First year total (est.)", v1: formatCurrency(firstYear1), v2: formatCurrency(firstYear2), highlight: true },
    { label: "Annual ongoing (est.)", v1: formatCurrency(baseAnnual1), v2: formatCurrency(baseAnnual2), highlight: true },
    { label: "Lifetime total (est.)", v1: formatCurrency(lifetime1), v2: formatCurrency(lifetime2), highlight: true },
  ];

  // Related comparisons
  const allDogs = getAllBreeds("dog");
  const similar = allDogs
    .filter((d) => d.id !== b1.id && d.id !== b2.id && d.size === b1.size)
    .slice(0, 4);

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/compare" className="hover:text-[#2E7D32]">Compare</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium truncate max-w-[200px]">{b1.name} vs {b2.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10">
          <div className="badge badge-green mb-3">Breed Comparison</div>
          <h1 className="text-2xl md:text-4xl font-bold text-[#1B2B1B] mb-3">
            {b1.name} vs {b2.name}: Full Cost Comparison
          </h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Side-by-side cost breakdown — first year, annual ongoing expenses, and lifetime totals.
          </p>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl space-y-8">

        {/* Summary banner */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white p-6">
          <p className="text-green-200 text-sm mb-1">Bottom line</p>
          <p className="text-lg font-bold">
            The <span className="text-[#A5D6A7]">{cheaper.name}</span> is cheaper by{" "}
            <span className="text-[#A5D6A7]">{formatCurrency(saving)}</span> in the first year.
            Over a full lifetime, the difference is{" "}
            {formatCurrency(Math.abs(lifetime1 - lifetime2))}.
          </p>
        </div>

        {/* Comparison table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#E8F5E9]">
                <th className="text-left px-5 py-4 text-[#1B2B1B] font-semibold w-2/5">Cost Factor</th>
                <th className="text-center px-4 py-4 text-[#2E7D32] font-bold">{b1.name}</th>
                <th className="text-center px-4 py-4 text-[#2E7D32] font-bold">{b2.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, v1, v2, highlight }, i) => (
                <tr key={label} className={`${i % 2 === 0 ? "bg-white" : "bg-[#F8FBF8]"} ${highlight ? "font-semibold" : ""}`}>
                  <td className="px-5 py-3 text-[#5a7a5a] capitalize">{label}</td>
                  <td className={`px-4 py-3 text-center ${highlight ? "text-[#1B2B1B] font-bold" : "text-[#1B2B1B]"}`}>{v1}</td>
                  <td className={`px-4 py-3 text-center ${highlight ? "text-[#1B2B1B] font-bold" : "text-[#1B2B1B]"}`}>{v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ad — below comparison table */}
        <AdUnit slot="2847391056" format="horizontal" />

        {/* Cost analysis — unique narrative */}
        <div className="card p-6 space-y-4 text-[#1B2B1B] leading-relaxed">
          <h2 className="text-lg font-bold">{b1.name} vs {b2.name}: which costs more?</h2>
          <p>
            Over a typical lifespan, owning a {b1.name} works out to roughly {formatCurrency(lifetime1)}, while
            a {b2.name} comes to about {formatCurrency(lifetime2)}
            {lifetimeGap > 0 ? (
              <>
                {" "}— a difference of {formatCurrency(lifetimeGap)} ({lifetimePct}%). The {cheaperLifetime.name} is
                the more budget-friendly choice over the long run, though the gap is driven by a few specific
                expenses rather than across-the-board savings.
              </>
            ) : (
              <>. The two breeds cost almost exactly the same to own across their lifetimes.</>
            )}
          </p>
          <p>
            The biggest single difference is {biggestDriver.label}: a {driverPricier.name} costs about{" "}
            {formatCurrency(Math.max(biggestDriver.v1, biggestDriver.v2))} a year for {biggestDriver.label}, versus{" "}
            {formatCurrency(Math.min(biggestDriver.v1, biggestDriver.v2))} for the other breed.{" "}
            {b1.size !== b2.size ? (
              <>The larger {larger.name} generally needs more food and carries higher medication and insurance costs.</>
            ) : (
              <>Both are {b1.size}-sized breeds, so food and supply costs are broadly comparable.</>
            )}
          </p>
          <p>
            <strong>Which should you choose?</strong> If upfront budget matters most, the {cheaper.name} wins the
            first year by {formatCurrency(saving)}.{" "}
            {lifetimeGap > 0 ? (
              <>If you&apos;re planning for the long haul, the {cheaperLifetime.name} saves about {formatCurrency(lifetimeGap)} over its lifetime.</>
            ) : (
              <>Over a lifetime the two come out about even.</>
            )}{" "}
            Neither breed is cheap to own, so budget for an emergency fund of at least{" "}
            {formatCurrency(maxEmergency)} either way, and use the{" "}
            <Link href="/calculator" className="text-[#2E7D32] underline">cost calculator</Link> to tailor these
            figures to your city and lifestyle.
          </p>
        </div>

        {/* Key differences */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-[#1B2B1B] mb-4">Key Differences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { breed: b1, annual: baseAnnual1, first: firstYear1, lifetime: lifetime1 },
              { breed: b2, annual: baseAnnual2, first: firstYear2, lifetime: lifetime2 },
            ].map(({ breed, annual, first, lifetime }) => (
              <div key={breed.id} className="rounded-xl bg-[#F1F8F1] p-4">
                <h3 className="font-bold text-[#1B2B1B] mb-3">{breed.name}</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-[#5a7a5a]">Size</span><span className="capitalize font-medium">{breed.size}</span></div>
                  <div className="flex justify-between"><span className="text-[#5a7a5a]">Lifespan</span><span className="font-medium">{breed.lifespan} years</span></div>
                  <div className="flex justify-between"><span className="text-[#5a7a5a]">First year</span><span className="font-bold text-[#2E7D32]">{formatCurrency(first)}</span></div>
                  <div className="flex justify-between"><span className="text-[#5a7a5a]">Annual</span><span className="font-bold text-[#2E7D32]">{formatCurrency(annual)}</span></div>
                  <div className="flex justify-between"><span className="text-[#5a7a5a]">Lifetime</span><span className="font-bold text-[#2E7D32]">{formatCurrency(lifetime)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar breeds to compare */}
        {similar.length > 0 && (
          <div className="card p-6">
            <h2 className="text-base font-bold text-[#1B2B1B] mb-3">More {b1.size}-breed comparisons</h2>
            <div className="flex flex-wrap gap-2">
              {similar.map((alt) => (
                <Link key={alt.id} href={`/compare/${b1.id}-vs-${alt.id}`} className="rounded-xl border border-[#C8E6C9] bg-white px-4 py-2 text-sm font-medium text-[#2E7D32] hover:bg-[#E8F5E9] transition-all">
                  {b1.name} vs {alt.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ — unique, data-driven (matches FAQPage schema above) */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-[#1B2B1B] mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-[#1B2B1B]">{f.q}</h3>
                <p className="text-[#5a7a5a] mt-1 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={`/breeds/${b1.id}`} className="btn-secondary text-sm">Full {b1.name} breakdown</Link>
          <Link href={`/breeds/${b2.id}`} className="btn-secondary text-sm">Full {b2.name} breakdown</Link>
          <Link href="/calculator" className="btn-primary text-sm">Get my personalised estimate</Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, TrendingUp, Clock, Star, ChevronRight, Calculator, BarChart3, Users, Mail, BookOpen } from "lucide-react";
import { getAllBreeds, getBreedById, getBreedFirstYearTotal, getBreedAnnualTotal } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import EmailCapture from "@/components/EmailCapture";
import HeroSearch from "@/components/HeroSearch";
import BreedImage from "@/components/BreedImage";
import AdUnit from "@/components/AdUnit";

// First-year estimates are computed from breed data via getBreedFirstYearTotal
// so homepage, breed pages, and the calculator always agree on baseline costs.
const featuredBreedMeta = [
  { id: "golden-retriever",     name: "Golden Retriever",    tag: "Most Popular",      petType: "dog" as const },
  { id: "french-bulldog",       name: "French Bulldog",      tag: "Trending",          petType: "dog" as const },
  { id: "labrador-retriever",   name: "Labrador Retriever",  tag: "Family Favourite",  petType: "dog" as const },
  { id: "american-shorthair",   name: "American Shorthair",  tag: "Most Affordable",   petType: "cat" as const },
  { id: "german-shepherd-dog",  name: "German Shepherd",     tag: "Active Lifestyle",  petType: "dog" as const },
  { id: "ragdoll",              name: "Ragdoll Cat",         tag: "Indoor Cat",        petType: "cat" as const },
  { id: "beagle",               name: "Beagle",              tag: "Budget-Friendly",   petType: "dog" as const },
  { id: "maine-coon",           name: "Maine Coon",          tag: "Gentle Giant",      petType: "cat" as const },
  { id: "siberian-husky",       name: "Siberian Husky",      tag: "High Energy",       petType: "dog" as const },
  { id: "bengal",               name: "Bengal Cat",          tag: "Low Maintenance",   petType: "cat" as const },
  { id: "poodle-standard",      name: "Poodle",              tag: "Hypoallergenic",    petType: "dog" as const },
  { id: "border-collie",        name: "Border Collie",       tag: "Working Dog",       petType: "dog" as const },
];

const stats = [
  { value: "300+", label: "Breeds covered", icon: Calculator },
  { value: "3", label: "Countries supported", icon: BarChart3 },
  { value: "200+", label: "Vet clinics researched", icon: TrendingUp },
  { value: "June 2026", label: "Last data update", icon: Clock },
];

const trustFeatures = [
  { icon: Shield, title: "Verified Cost Data", description: "All estimates sourced from vet clinics, pet stores, and breeder surveys across the US, UK, and Australia." },
  { icon: TrendingUp, title: "Inflation Adjusted", description: "Costs updated regularly to reflect current market rates across all three supported countries." },
  { icon: Calculator, title: "Personalised Estimates", description: "Every calculation factors in your location, lifestyle, and living situation for accurate, relevant results." },
];

const steps = [
  { number: "01", title: "Pick your breed", description: "Search from 300+ dog and cat breeds. Each one has detailed cost profiles built from real market data." },
  { number: "02", title: "Tell us about yourself", description: "Answer a few questions about your location, lifestyle, and preferences. Takes under 2 minutes." },
  { number: "03", title: "Get your full cost report", description: "Receive a detailed breakdown: first-year costs, annual ongoing costs, lifetime total, and hidden expenses." },
];

const testimonials = [
  {
    name: "Sarah M.",
    initials: "SM",
    location: "Austin, TX",
    breed: "French Bulldog owner",
    date: "March 2026",
    text: "I was about to buy a French Bulldog without realising the first-year total would hit $5,200. This broke it down line by line — purchase, insurance, vet setup, food. I budgeted properly and didn't get blindsided.",
    rating: 5,
  },
  {
    name: "James K.",
    initials: "JK",
    location: "London, UK",
    breed: "Labrador owner",
    date: "January 2026",
    text: "Every other calculator I found used US dollars. This one gave me UK figures — £2,100/year for my Lab matches almost exactly what I actually spend. The insurance estimate was only £12/month off.",
    rating: 5,
  },
  {
    name: "Priya L.",
    initials: "PL",
    location: "Sydney, AU",
    breed: "Golden Retriever owner",
    date: "April 2026",
    text: "Compared a Golden Retriever, Poodle, and Border Collie side by side. The lifetime cost gap was over $14,000 between cheapest and most expensive. We went with the Poodle — great decision.",
    rating: 5,
  },
  {
    name: "Tom B.",
    initials: "TB",
    location: "Chicago, IL",
    breed: "First-time dog owner",
    date: "February 2026",
    text: "Solid tool. The vet cost estimates were slightly under what I paid in Chicago — city prices are higher — but it got me in the right ballpark and the insurance section is genuinely useful.",
    rating: 4,
  },
];

export default function HomePage() {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  // Resolve featured breeds against real data so prices match breed pages
  const featuredBreeds = featuredBreedMeta
    .map((meta) => {
      const breed = getBreedById(meta.petType, meta.id);
      return breed ? { ...meta, firstYearEstimate: getBreedFirstYearTotal(breed) } : null;
    })
    .filter((b): b is NonNullable<typeof b> => b !== null);

  // Comparison table rows computed from the same canonical data
  const comparisonRows = [
    { id: "golden-retriever",  petType: "dog" as const, emoji: "🐕" },
    { id: "french-bulldog",    petType: "dog" as const, emoji: "🐕" },
    { id: "labrador-retriever",petType: "dog" as const, emoji: "🐕" },
    { id: "maine-coon",        petType: "cat" as const, emoji: "🐈" },
    { id: "poodle-standard",   petType: "dog" as const, emoji: "🐕" },
  ]
    .map(({ id, petType, emoji }) => {
      const breed = getBreedById(petType, id);
      if (!breed) return null;
      const year1 = getBreedFirstYearTotal(breed);
      const annual = getBreedAnnualTotal(breed);
      return {
        name: breed.name,
        emoji,
        href: `/breeds/${breed.id}`,
        year1,
        annual,
        lifetime: year1 + annual * (breed.lifespan - 1),
        monthly: Math.round(annual / 12),
        years: breed.lifespan,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PetCost Calculator",
      "url": "https://petcost-calculator.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://petcost-calculator.com/breeds?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PetCost",
      "url": "https://petcost-calculator.com",
      "logo": "https://petcost-calculator.com/icon-512.png",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61583074795583",
        "https://www.instagram.com/petcost_calculator/",
        "https://www.tiktok.com/@petcostcalculator",
        "https://www.pinterest.com/petcostcalculator"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to own a dog per year?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The average annual cost of owning a dog in the US is around $2,600, covering food, vet care, grooming, insurance, and supplies. Costs vary significantly by breed — large breeds like Great Danes average $3,500+/yr while smaller breeds like Beagles average $2,000–$2,500/yr."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to own a cat per year?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The average annual cost of owning a cat in the US is around $1,400, including food, vet visits, litter, grooming, and insurance. First-year costs are higher due to vaccinations and spaying/neutering, typically totalling $1,800–$2,500."
          }
        },
        {
          "@type": "Question",
          "name": "What are the first-year costs of getting a dog?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "First-year dog ownership costs typically range from $2,500 to $6,000 depending on the breed. This includes the purchase or adoption fee, vaccinations, spaying/neutering, supplies, food, and training. Breeds like French Bulldogs can cost $5,000+ in the first year."
          }
        },
        {
          "@type": "Question",
          "name": "Which dog breed is the cheapest to own?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally the cheapest dog breeds to own include Beagles, Chihuahuas, and mixed-breed dogs. These breeds have lower purchase prices, fewer health issues, and modest grooming needs. Annual costs can be as low as $1,500–$2,000."
          }
        },
        {
          "@type": "Question",
          "name": "How much does pet insurance cost per month?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pet insurance typically costs $30–$70/month for dogs and $20–$40/month for cats in the US, depending on the breed, age, location, and coverage level. High-risk breeds like French Bulldogs can cost $80–$100/month to insure."
          }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero — calculator-first */}
      <section className="relative bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white overflow-hidden">
<div className="relative container-xl py-16 md:py-24 text-center lg:text-left lg:max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5 border border-white/20">
            <span className="h-2 w-2 rounded-full bg-[#A5D6A7] animate-pulse" />
            Updated June 2026 · 300+ breeds covered
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-4">
            Know the real cost before you commit.
          </h1>
          <p className="text-lg text-green-100 leading-relaxed mb-8 max-w-xl">
            Search any breed to see first-year, annual, and lifetime costs — personalised to your location. Free, no signup.
          </p>
          <HeroSearch />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#C8E6C9] bg-[#F1F8F1]">
        <div className="container-xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2E7D32]/10">
                  <Icon className="h-5 w-5 text-[#2E7D32]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#1B2B1B]">{value}</div>
                  <div className="text-xs text-[#5a7a5a]">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured breeds */}
      <section className="container-xl py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="badge badge-green mb-3 mx-auto">Popular Breeds</div>
          <h2 className="section-heading">Start with a popular breed</h2>
          <p className="section-subheading max-w-xl mx-auto">Click any breed for a full cost breakdown, or search for your specific breed above.</p>
        </div>

        {/* 2-up on mobile with compact cards keeps this section thumb-friendly */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {featuredBreeds.map((breed) => (
            <Link key={breed.id} href={`/breeds/${breed.id}`}
              className="card overflow-hidden group hover:border-[#4CAF50]/50">
              <div className="relative h-28 sm:h-40 lg:h-48 bg-[#E8F5E9] overflow-hidden">
                <BreedImage
                  breedId={breed.id}
                  petType={breed.petType}
                  alt={breed.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="group-hover:scale-105 transition-transform duration-300 p-2"
                />
                <span className="absolute top-2 right-2 badge badge-green shadow-sm text-[10px] sm:text-xs">{breed.tag}</span>
              </div>
              <div className="p-3 sm:p-4 flex items-center justify-between gap-1">
                <div className="min-w-0">
                  <h3 className="font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors text-xs sm:text-sm truncate">{breed.name}</h3>
                  <p className="text-[11px] sm:text-xs text-[#5a7a5a] mt-0.5">Year 1 ≈ {formatCurrency(breed.firstYearEstimate)}</p>
                </div>
                <ChevronRight className="hidden sm:block h-5 w-5 text-[#C8E6C9] group-hover:text-[#2E7D32] transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/breeds" className="btn-secondary">View All Breeds</Link>
        </div>
      </section>

      {/* Ad — below featured breeds */}
      <div className="container-xl py-2">
        <AdUnit slot="6193847205" format="horizontal" />
      </div>

      {/* Affordability Reality Check */}
      <section className="bg-white border-y border-[#C8E6C9] py-16 md:py-20">
        <div className="container-xl">
          <div className="text-center mb-10">
            <div className="badge badge-green mb-3 mx-auto">The Numbers Don&apos;t Lie</div>
            <h2 className="section-heading">What does a pet actually cost?</h2>
            <p className="section-subheading max-w-2xl mx-auto">
              Year 1 is always the most expensive — setup costs, initial vet visits, training, and supplies stack up fast. Here&apos;s what five of the most popular breeds actually cost.
            </p>
          </div>
          {/* Desktop: full table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#C8E6C9]">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#E8F5E9]">
                  <th className="text-left px-5 py-4 text-sm font-bold text-[#1B2B1B]">Breed</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Year 1 Total</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Annual (yr 2+)</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Lifetime</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Per Month</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((breed, i) => (
                  <tr key={breed.name} className={`border-t border-[#E8F5E9] hover:bg-[#F1F8F1] transition-colors ${i % 2 === 0 ? "" : "bg-[#F9FDF9]"}`}>
                    <td className="px-5 py-4">
                      <Link href={breed.href} className="flex items-center gap-2 group">
                        <span className="text-xl">{breed.emoji}</span>
                        <span className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors">{breed.name}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-[#1B2B1B]">{formatCurrency(breed.year1)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-semibold text-[#1B2B1B]">{formatCurrency(breed.annual)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm font-bold text-[#2E7D32]">{formatCurrency(breed.lifetime)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-sm text-[#5a7a5a]">{formatCurrency(breed.monthly)}/mo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards — no horizontal scrolling, nothing cut off */}
          <div className="md:hidden space-y-3">
            {comparisonRows.map((breed) => (
              <Link key={breed.name} href={breed.href} className="card p-4 block group">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors">
                    <span className="text-lg">{breed.emoji}</span> {breed.name}
                  </span>
                  <span className="text-xs font-semibold text-[#5a7a5a]">{formatCurrency(breed.monthly)}/mo</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-[#F1F8F1] py-2">
                    <div className="text-[10px] text-[#5a7a5a]">Year 1</div>
                    <div className="text-sm font-bold text-[#1B2B1B]">{formatCurrency(breed.year1)}</div>
                  </div>
                  <div className="rounded-lg bg-[#F1F8F1] py-2">
                    <div className="text-[10px] text-[#5a7a5a]">Annual yr 2+</div>
                    <div className="text-sm font-bold text-[#1B2B1B]">{formatCurrency(breed.annual)}</div>
                  </div>
                  <div className="rounded-lg bg-[#F1F8F1] py-2">
                    <div className="text-[10px] text-[#5a7a5a]">{breed.years}-yr Lifetime</div>
                    <div className="text-sm font-bold text-[#2E7D32]">{formatCurrency(breed.lifetime)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#5a7a5a] mt-3 text-center">
            Estimates based on national averages. Actual costs vary by location, lifestyle, and choices.{" "}
            <Link href="/methodology" className="underline hover:text-[#2E7D32]">See our methodology →</Link>
          </p>
          <div className="mt-8 text-center">
            <Link href="/calculator" className="btn-green">
              <Calculator className="h-4 w-4" /> Calculate My Costs
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F1F8F1] border-y border-[#C8E6C9] py-16 md:py-20">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-green mb-3 mx-auto">How It Works</div>
            <h2 className="section-heading">Your cost report in under 2 minutes</h2>
            <p className="section-subheading">No signup, no fluff. Accurate numbers for your specific situation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-5xl font-black text-[#2E7D32] mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-[#1B2B1B] mb-2">{step.title}</h3>
                <p className="text-[#5a7a5a] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="bg-[#1B5E20] py-12 md:py-16">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto text-center text-white">
            <Mail className="h-8 w-8 text-[#A5D6A7] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get the 2026 Pet Cost Data Summary</h2>
            <p className="text-green-200 mb-6 text-sm leading-relaxed">
              Cost tables for 50+ popular breeds, regional price comparisons across the US, UK, and Australia, and the hidden expenses most new owners miss. Free PDF, straight to your inbox.
            </p>
            <EmailCapture />
            <p className="mt-3 text-xs text-green-400">No spam. Unsubscribe any time.</p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container-xl py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge badge-green mb-3 mx-auto">Why Trust Us</div>
          <h2 className="section-heading">Built on real data, not guesswork</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustFeatures.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5E9] mx-auto mb-4">
                <Icon className="h-6 w-6 text-[#2E7D32]" />
              </div>
              <h3 className="text-base font-bold text-[#1B2B1B] mb-2">{title}</h3>
              <p className="text-sm text-[#5a7a5a] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/methodology" className="text-sm text-[#2E7D32] font-semibold hover:underline">
            Read our methodology →
          </Link>
        </div>
      </section>

      {/* Dog vs Cat */}
      <section className="bg-[#F1F8F1] border-y border-[#C8E6C9] py-16 md:py-20">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="badge badge-orange mb-3 mx-auto">Compare</div>
            <h2 className="section-heading">Dog or cat? Know the real costs first.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { type: "dog" as const, emoji: "🐕", label: "Dogs", count: dogs.length, first: "$2,800 – $5,500", annual: "$1,200 – $3,800", lifetime: "$15,000 – $45,000", href: "/breeds?type=dog" },
              { type: "cat" as const, emoji: "🐈", label: "Cats", count: cats.length, first: "$1,500 – $3,500", annual: "$800 – $2,000", lifetime: "$12,000 – $30,000", href: "/breeds?type=cat" },
            ].map((p) => (
              <Link key={p.type} href={p.href} className="card p-8 group hover:border-[#4CAF50]/50">
                <div className="text-5xl mb-4">{p.emoji}</div>
                <h3 className="text-xl font-bold text-[#1B2B1B] mb-1 group-hover:text-[#2E7D32] transition-colors">{p.label}</h3>
                <p className="text-[#5a7a5a] text-sm mb-4">{p.count}+ breeds covered</p>
                <div className="space-y-2 text-sm">
                  {[["First year (avg)", p.first], ["Annual ongoing", p.annual], ["Lifetime (avg)", p.lifetime]].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-[#5a7a5a]">{k}</span>
                      <span className="font-semibold text-[#1B2B1B]">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#2E7D32]">
                  Browse {p.label.toLowerCase()} <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-xl py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge badge-green mb-3 mx-auto">Reviews</div>
          <h2 className="section-heading">What pet owners say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 flex flex-col">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#5a7a5a] text-sm leading-relaxed mb-4 flex-1">{t.text}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E8F5E9]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E7D32] text-white text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1B2B1B]">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.location} · {t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad — below testimonials */}
      <div className="container-xl py-2">
        <AdUnit slot="7492038156" format="horizontal" />
      </div>

      {/* Insurance CTA */}
      <section className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] py-12 md:py-16">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-green-100 mb-4 border border-white/20">
                <Shield className="h-3.5 w-3.5" /> Financial Protection
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Emergency vet bills average $1,400 — are you covered?
              </h2>
              <p className="text-green-100 text-sm leading-relaxed mb-2">
                Most pet owners only find out how expensive emergency care is when they&apos;re already in the waiting room. Pet insurance for the average dog costs $40–80/month and can cover up to 90% of vet bills.
              </p>
              <p className="text-green-300 text-xs">We earn a commission if you purchase. This does not affect our recommendations.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <Link href="/tools/insurance-compare" className="rounded-xl bg-white text-[#2E7D32] font-bold text-sm px-6 py-3.5 text-center hover:bg-[#E8F5E9] transition-colors shadow-sm">
                Compare Insurance Plans
              </Link>
              <Link href="/guides" className="rounded-xl border border-white/30 text-white font-medium text-sm px-6 py-3 text-center hover:bg-white/10 transition-colors">
                Is insurance worth it? →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guides CTA */}
      <section className="bg-[#F1F8F1] border-y border-[#C8E6C9] py-12 md:py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: BookOpen, label: "Cost Guides", desc: "In-depth guides on every aspect of pet ownership costs.", href: "/guides", cta: "Browse guides" },
              { icon: Calculator, label: "Tools", desc: "Insurance comparator, budget tracker, and more free tools.", href: "/tools", cta: "View tools" },
              { icon: BarChart3, label: "Annual Report", desc: "Our 2026 Pet Cost Report — data from 300+ breeds worldwide.", href: "/report", cta: "Read report" },
            ].map(({ icon: Icon, label, desc, href, cta }) => (
              <Link key={label} href={href} className="card p-6 group hover:border-[#4CAF50]/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] mb-4">
                  <Icon className="h-5 w-5 text-[#2E7D32]" />
                </div>
                <h3 className="text-base font-bold text-[#1B2B1B] mb-1 group-hover:text-[#2E7D32] transition-colors">{label}</h3>
                <p className="text-sm text-[#5a7a5a] mb-3">{desc}</p>
                <span className="text-sm font-semibold text-[#2E7D32]">{cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white py-16 md:py-20">
        <div className="container-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find out the real cost?</h2>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            Free, no signup required. Takes under 2 minutes.
          </p>
          <Link href="/calculator" className="btn-green text-lg px-10 py-4 inline-flex items-center gap-2">
            Calculate My Costs <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

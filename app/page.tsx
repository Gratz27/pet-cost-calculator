import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, TrendingUp, Clock, Star, ChevronRight, Calculator, BarChart3, Users, Mail, BookOpen } from "lucide-react";
import { getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import HeroSearch from "@/components/HeroSearch";

const featuredBreeds = [
  { id: "golden-retriever",     name: "Golden Retriever",    firstYearEstimate: 4200, tag: "Most Popular",      img: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1743.jpg" },
  { id: "french-bulldog",       name: "French Bulldog",      firstYearEstimate: 5100, tag: "Trending",          img: "https://images.dog.ceo/breeds/bulldog-french/n02108915_4372.jpg" },
  { id: "labrador-retriever",   name: "Labrador Retriever",  firstYearEstimate: 3800, tag: "Family Favourite",  img: "https://images.dog.ceo/breeds/labrador/n02099712_4354.jpg" },
  { id: "german-shepherd-dog",  name: "German Shepherd",     firstYearEstimate: 4500, tag: "Active Lifestyle",  img: "https://images.dog.ceo/breeds/german-shepherd/n02106662_18113.jpg" },
  { id: "bengal",               name: "Bengal Cat",          firstYearEstimate: 3200, tag: "Low Maintenance",   img: "https://cdn2.thecatapi.com/images/IFXsxmXLm.jpg" },
  { id: "poodle-standard",      name: "Poodle",              firstYearEstimate: 4300, tag: "Hypoallergenic",    img: "https://images.dog.ceo/breeds/poodle-standard/n02113799_5975.jpg" },
  { id: "beagle",               name: "Beagle",              firstYearEstimate: 3100, tag: "Budget-Friendly",   img: "https://images.dog.ceo/breeds/beagle/n02088364_12973.jpg" },
  { id: "pembroke-welsh-corgi", name: "Corgi",               firstYearEstimate: 3900, tag: "Social Media Fave", img: "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_10535.jpg" },
  { id: "siberian-husky",       name: "Siberian Husky",      firstYearEstimate: 4100, tag: "High Energy",       img: "https://images.dog.ceo/breeds/husky/n02110185_1598.jpg" },
  { id: "ragdoll",              name: "Ragdoll Cat",         firstYearEstimate: 2800, tag: "Indoor Cat",        img: "https://cdn2.thecatapi.com/images/Sy9SgPE0B.jpg" },
  { id: "yorkshire-terrier",    name: "Yorkshire Terrier",   firstYearEstimate: 3600, tag: "Small & Loyal",     img: "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_2328.jpg" },
  { id: "australian-shepherd",  name: "Australian Shepherd", firstYearEstimate: 4000, tag: "Working Dog",       img: "https://images.dog.ceo/breeds/australian-shepherd/sadie.jpg" },
];

const stats = [
  { value: "300+", label: "Breeds covered", icon: Calculator },
  { value: "3", label: "Countries supported", icon: BarChart3 },
  { value: "50+", label: "Cost data points per breed", icon: TrendingUp },
  { value: "Monthly", label: "Data updates", icon: Clock },
];

const trustFeatures = [
  { icon: Shield, title: "Verified Cost Data", description: "All estimates sourced from vet clinics, pet stores, and breeder surveys across the US, UK, and Australia." },
  { icon: TrendingUp, title: "Inflation Adjusted", description: "Costs updated regularly to reflect current market rates across all three supported countries." },
  { icon: Calculator, title: "Personalised Estimates", description: "Every calculation factors in your location, lifestyle, and living situation for accurate, relevant results." },
];

const steps = [
  { number: "01", title: "Pick your breed", description: "Search from 200+ dog and cat breeds. Each one has detailed cost profiles built from real market data." },
  { number: "02", title: "Tell us about yourself", description: "Answer a few questions about your location, lifestyle, and preferences. Takes under 2 minutes." },
  { number: "03", title: "Get your full cost report", description: "Receive a detailed breakdown: first-year costs, annual ongoing costs, lifetime total, and hidden expenses." },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Austin, TX",
    breed: "French Bulldog owner",
    text: "I was about to buy a French Bulldog without realising the total first-year cost would be over $5,000. This tool showed me the full picture — vet bills, insurance, supplies. Saved me from a huge financial shock.",
    rating: 5,
  },
  {
    name: "James K.",
    location: "London, UK",
    breed: "Labrador owner",
    text: "Every other calculator uses US prices. This one uses UK data and it's genuinely accurate — my Labrador's ongoing costs match almost exactly what I actually spend each year.",
    rating: 5,
  },
  {
    name: "Priya L.",
    location: "Sydney, AU",
    breed: "Golden Retriever owner",
    text: "Used this to compare a Golden Retriever, a Poodle, and a Border Collie. The lifetime cost difference between them was over $12,000. Made our decision so much easier.",
    rating: 5,
  },
];

export default function HomePage() {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  return (
    <>
      {/* Hero — calculator-first */}
      <section className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white">
        <div className="container-xl py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5 border border-white/20">
            <span className="h-2 w-2 rounded-full bg-[#A5D6A7] animate-pulse" />
            Updated June 2026 · 200+ breeds covered
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-4 max-w-3xl mx-auto">
            Which pet are you considering?
          </h1>
          <p className="text-lg text-green-100 leading-relaxed mb-8 max-w-xl mx-auto">
            Search any breed to see monthly and lifetime costs before you decide. Free, no signup.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredBreeds.map((breed) => (
            <Link key={breed.id} href={`/breeds/${breed.id}`}
              className="card overflow-hidden group hover:border-[#4CAF50]/50">
              <div className="relative h-44 bg-[#E8F5E9] overflow-hidden">
                <Image src={breed.img} alt={breed.name} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                <span className="absolute top-3 right-3 badge badge-green shadow-sm text-xs">{breed.tag}</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors text-sm">{breed.name}</h3>
                  <p className="text-xs text-[#5a7a5a] mt-0.5">From {formatCurrency(breed.firstYearEstimate)}/yr 1</p>
                </div>
                <ChevronRight className="h-5 w-5 text-[#C8E6C9] group-hover:text-[#2E7D32] transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/breeds" className="btn-secondary mr-3">View All Breeds</Link>
          <Link href="/calculator" className="btn-primary">
            <Calculator className="h-4 w-4" /> Get My Full Cost Report
          </Link>
        </div>
      </section>

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
          <div className="overflow-x-auto rounded-2xl border border-[#C8E6C9]">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#E8F5E9]">
                  <th className="text-left px-5 py-4 text-sm font-bold text-[#1B2B1B]">Breed</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Year 1 Total</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Annual (yr 2+)</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">15-yr Lifetime</th>
                  <th className="text-right px-5 py-4 text-sm font-bold text-[#1B2B1B]">Per Month</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Golden Retriever", emoji: "🐕", year1: 4200, annual: 2800, years: 11, href: "/breeds/golden-retriever" },
                  { name: "French Bulldog",   emoji: "🐕", year1: 5100, annual: 3400, years: 10, href: "/breeds/french-bulldog" },
                  { name: "Labrador",         emoji: "🐕", year1: 3800, annual: 2600, years: 12, href: "/breeds/labrador-retriever" },
                  { name: "Maine Coon",       emoji: "🐈", year1: 2900, annual: 1800, years: 14, href: "/breeds/maine-coon" },
                  { name: "Poodle (Standard)",emoji: "🐕", year1: 4300, annual: 3200, years: 12, href: "/breeds/poodle-standard" },
                ].map((breed, i) => {
                  const lifetime = breed.year1 + breed.annual * (breed.years - 1);
                  const monthly = Math.round(breed.annual / 12);
                  return (
                    <tr key={breed.name} className={`border-t border-[#E8F5E9] hover:bg-[#F1F8F1] transition-colors ${i % 2 === 0 ? "" : "bg-[#F9FDF9]"}`}>
                      <td className="px-5 py-4">
                        <Link href={breed.href} className="flex items-center gap-2 group">
                          <span className="text-xl">{breed.emoji}</span>
                          <span className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors">{breed.name}</span>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-bold text-[#EF4444]">{formatCurrency(breed.year1)}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-semibold text-[#1B2B1B]">{formatCurrency(breed.annual)}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm font-bold text-[#2E7D32]">{formatCurrency(lifetime)}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm text-[#5a7a5a]">{formatCurrency(monthly)}/mo</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#5a7a5a] mt-3 text-center">
            Estimates based on national averages. Actual costs vary by location, lifestyle, and choices.{" "}
            <Link href="/methodology" className="underline hover:text-[#2E7D32]">See our methodology →</Link>
          </p>
          <div className="mt-8 text-center">
            <Link href="/calculator" className="btn-green">
              <Calculator className="h-4 w-4" /> Calculate Your Specific Cost
            </Link>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="bg-[#1B5E20] py-12 md:py-16">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto text-center text-white">
            <Mail className="h-8 w-8 text-[#A5D6A7] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get the Annual Pet Cost Report 2026</h2>
            <p className="text-green-200 mb-6 text-sm leading-relaxed">
              Our 2026 report covers cost trends across 200+ breeds, regional price differences across the US, UK, and Australia, and the most expensive hidden costs most owners miss.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-xl px-4 py-3 text-sm text-[#1B2B1B] bg-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#A5D6A7]"
              />
              <button type="submit" className="btn-green text-sm px-6 py-3 flex-shrink-0">
                Get Free Report
              </button>
            </form>
            <p className="mt-3 text-xs text-green-400">No spam. Unsubscribe any time.</p>
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
                <div className="text-5xl font-black text-[#C8E6C9] mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-[#1B2B1B] mb-2">{step.title}</h3>
                <p className="text-[#5a7a5a] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/calculator" className="btn-primary">
              Start the Calculator <ArrowRight className="h-4 w-4" />
            </Link>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#5a7a5a] text-sm leading-relaxed mb-4">{t.text}</p>
              <div>
                <div className="text-sm font-semibold text-[#1B2B1B]">{t.name}</div>
                <div className="text-xs text-slate-400">{t.location} · {t.breed}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance CTA */}
      <section className="bg-gradient-to-r from-[#1565C0] to-[#1976D2] py-12 md:py-16">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-blue-100 mb-4 border border-white/20">
                <Shield className="h-3.5 w-3.5" /> Financial Protection
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Emergency vet bills average $1,400 — are you covered?
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-2">
                Most pet owners only find out how expensive emergency care is when they&apos;re already in the waiting room. Pet insurance for the average dog costs $40–80/month and can cover up to 90% of vet bills.
              </p>
              <p className="text-blue-200 text-xs">We earn a commission if you purchase. This does not affect our recommendations.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <Link href="/tools/insurance-compare" className="rounded-xl bg-white text-[#1565C0] font-bold text-sm px-6 py-3.5 text-center hover:bg-blue-50 transition-colors shadow-sm">
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
              { icon: BarChart3, label: "Annual Report", desc: "Our 2026 Pet Cost Report — data from 200+ breeds worldwide.", href: "/report", cta: "Read report" },
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
            Start the Calculator <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

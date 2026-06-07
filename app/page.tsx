import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, Clock, Star, CheckCircle2, ChevronRight, Dog, Cat, Calculator, BarChart3, Users } from "lucide-react";
import { getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

const featuredDogs = [
  { id: "golden-retriever", name: "Golden Retriever", emoji: "🐕", firstYearEstimate: 4200, tag: "Most Popular" },
  { id: "french-bulldog", name: "French Bulldog", emoji: "🐶", firstYearEstimate: 5100, tag: "Trending" },
  { id: "labrador-retriever", name: "Labrador Retriever", emoji: "🦮", firstYearEstimate: 3800, tag: "Family Favourite" },
  { id: "german-shepherd", name: "German Shepherd", emoji: "🐕‍🦺", firstYearEstimate: 4500, tag: "Active Lifestyle" },
  { id: "bulldog", name: "Bulldog", emoji: "🐾", firstYearEstimate: 4800, tag: "Low Energy" },
  { id: "poodle", name: "Poodle", emoji: "🐩", firstYearEstimate: 4300, tag: "Hypoallergenic" },
];

const stats = [
  { value: "500K+", label: "Pet owners helped", icon: Users },
  { value: "200+", label: "Breeds covered", icon: Dog },
  { value: "10K+", label: "Cost data points", icon: BarChart3 },
  { value: "Monthly", label: "Data updates", icon: Clock },
];

const trustFeatures = [
  { icon: Shield, title: "Verified Cost Data", description: "All cost estimates sourced from vet clinics, pet stores, and breeder surveys across the US, UK, and Australia." },
  { icon: TrendingUp, title: "Inflation Adjusted", description: "Costs are updated monthly to reflect current market rates. Never work from outdated figures." },
  { icon: Calculator, title: "Personalised Estimates", description: "Every calculation factors in your location, lifestyle, and living situation for accurate results." },
];

const steps = [
  { number: "01", title: "Pick your breed", description: "Search from 200+ dog and cat breeds. Each one has detailed cost profiles built from real data." },
  { number: "02", title: "Tell us about yourself", description: "Answer a few questions about your location, lifestyle, and preferences. Takes under 2 minutes." },
  { number: "03", title: "Get your full cost report", description: "Receive a detailed breakdown: first-year costs, annual ongoing costs, lifetime total, and hidden expenses." },
];

const testimonials = [
  { name: "Sarah M.", location: "Austin, TX", text: "This calculator saved me from a huge financial surprise. I had no idea a French Bulldog would cost $5,000 in the first year.", rating: 5 },
  { name: "James K.", location: "London, UK", text: "Finally a tool that accounts for UK prices. Every other calculator just used US data. Really helpful.", rating: 5 },
  { name: "Priya L.", location: "Sydney, AU", text: "Used this to compare three breeds before making a decision. The comparison tool is brilliant.", rating: 5 },
];

export default function HomePage() {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1E3A5F] to-[#1e4080] text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-xl relative py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-200 mb-6 border border-white/20">
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              Updated June 2026 · 200+ breeds covered
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              Can you <span className="text-[#22C55E]">really afford</span> your dream pet?
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
              Stop guessing. Get a complete cost breakdown for any dog or cat breed — first-year costs, lifetime expenses, and the hidden costs nobody talks about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/calculator" className="btn-green text-base px-8 py-4 text-lg">
                Calculate My Costs
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/breeds" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 text-white font-semibold px-8 py-4 text-base transition-all hover:bg-white/10 hover:border-white/50">
                Browse Breeds
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> Free to use</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> No signup required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#22C55E]" /> 200+ breeds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#1E3A5F]/10">
                  <Icon className="h-5 w-5 text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#0f172a]">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick breed search */}
      <section className="container-xl py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="badge badge-blue mb-3">Popular Breeds</div>
            <h2 className="section-heading">What breed are you considering?</h2>
            <p className="section-subheading max-w-xl">Click any breed to see a full cost breakdown, or use the calculator for a personalised estimate.</p>
          </div>
          <Link href="/breeds" className="flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F] hover:underline whitespace-nowrap">
            View all breeds <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredDogs.map((breed) => (
            <Link
              key={breed.id}
              href={`/breeds/${breed.id}`}
              className="card p-5 flex items-center justify-between group hover:border-[#1E3A5F]/30"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{breed.emoji}</span>
                <div>
                  <div className="font-semibold text-[#0f172a] group-hover:text-[#1E3A5F] transition-colors">{breed.name}</div>
                  <div className="text-sm text-slate-500 mt-0.5">From {formatCurrency(breed.firstYearEstimate)}/year</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="badge badge-green text-xs">{breed.tag}</span>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#1E3A5F] transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/calculator" className="btn-primary">
            <Calculator className="h-4 w-4" />
            Get My Personalised Cost Report
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 md:py-20">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-green mb-3">How It Works</div>
            <h2 className="section-heading">Your cost report in under 2 minutes</h2>
            <p className="section-subheading">No signup, no fluff. Just accurate numbers for your specific situation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-5xl font-black text-slate-100 mb-4 leading-none">{step.number}</div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
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

      {/* Trust features */}
      <section className="container-xl py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge badge-blue mb-3">Why Trust Us</div>
          <h2 className="section-heading">Built on real data, not guesswork</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustFeatures.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E3A5F]/10 mb-4">
                <Icon className="h-6 w-6 text-[#1E3A5F]" />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-2">{title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dog vs Cat section */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 md:py-20">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-orange mb-3">Compare</div>
            <h2 className="section-heading">Dog or cat? Know the real costs first.</h2>
            <p className="section-subheading">The average first-year cost varies significantly between species and breeds.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/breeds?type=dog" className="card p-8 group hover:border-[#1E3A5F]/30">
              <div className="text-5xl mb-4">🐕</div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-[#1E3A5F] transition-colors">Dogs</h3>
              <p className="text-slate-500 text-sm mb-4">{dogs.length}+ breeds covered</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">First year (avg)</span><span className="font-semibold text-[#0f172a]">$2,800 – $5,500</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Annual ongoing</span><span className="font-semibold text-[#0f172a]">$1,200 – $3,800</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Lifetime (avg)</span><span className="font-semibold text-[#0f172a]">$15,000 – $45,000</span></div>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F]">
                Browse dog breeds <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
            <Link href="/breeds?type=cat" className="card p-8 group hover:border-[#1E3A5F]/30">
              <div className="text-5xl mb-4">🐈</div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-[#1E3A5F] transition-colors">Cats</h3>
              <p className="text-slate-500 text-sm mb-4">{cats.length}+ breeds covered</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">First year (avg)</span><span className="font-semibold text-[#0f172a]">$1,500 – $3,500</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Annual ongoing</span><span className="font-semibold text-[#0f172a]">$800 – $2,000</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Lifetime (avg)</span><span className="font-semibold text-[#0f172a]">$12,000 – $30,000</span></div>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F]">
                Browse cat breeds <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-xl py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge badge-green mb-3">Reviews</div>
          <h2 className="section-heading">Trusted by pet owners worldwide</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <div className="text-sm font-semibold text-[#0f172a]">{t.name}</div>
                <div className="text-xs text-slate-400">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1E3A5F] text-white py-16 md:py-20">
        <div className="container-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find out the real cost?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Get your personalised pet cost report in under 2 minutes. Free, no signup required.
          </p>
          <Link href="/calculator" className="btn-green text-base px-10 py-4 text-lg inline-flex items-center gap-2">
            Start the Calculator
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

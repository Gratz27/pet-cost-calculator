import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, TrendingUp, Clock, Star, CheckCircle2, ChevronRight, Calculator, BarChart3, Users } from "lucide-react";
import { getAllBreeds } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

const featuredBreeds = [
  { id: "golden-retriever", name: "Golden Retriever", firstYearEstimate: 4200, tag: "Most Popular", img: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1722.jpg" },
  { id: "french-bulldog", name: "French Bulldog", firstYearEstimate: 5100, tag: "Trending", img: "https://images.dog.ceo/breeds/bulldog-french/n02108915_4362.jpg" },
  { id: "labrador-retriever", name: "Labrador Retriever", firstYearEstimate: 3800, tag: "Family Favourite", img: "https://images.dog.ceo/breeds/retriever-labrador/n02099712_4323.jpg" },
  { id: "german-shepherd", name: "German Shepherd", firstYearEstimate: 4500, tag: "Active Lifestyle", img: "https://images.dog.ceo/breeds/germanshepherd/n02106662_26173.jpg" },
  { id: "bulldog", name: "Bulldog", firstYearEstimate: 4800, tag: "Low Energy", img: "https://images.dog.ceo/breeds/bulldog-english/triton_1.jpeg" },
  { id: "poodle", name: "Poodle", firstYearEstimate: 4300, tag: "Hypoallergenic", img: "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg" },
];

const stats = [
  { value: "500K+", label: "Pet owners helped", icon: Users },
  { value: "200+", label: "Breeds covered", icon: Calculator },
  { value: "10K+", label: "Cost data points", icon: BarChart3 },
  { value: "Monthly", label: "Data updates", icon: Clock },
];

const trustFeatures = [
  { icon: Shield, title: "Verified Cost Data", description: "All estimates sourced from vet clinics, pet stores, and breeder surveys across the US, UK, and Australia." },
  { icon: TrendingUp, title: "Inflation Adjusted", description: "Costs are updated monthly to reflect current market rates. Never work from outdated figures." },
  { icon: Calculator, title: "Personalised Estimates", description: "Every calculation factors in your location, lifestyle, and living situation for accurate results." },
];

const steps = [
  { number: "01", title: "Pick your breed", description: "Search from 200+ dog and cat breeds. Each one has detailed cost profiles built from real data." },
  { number: "02", title: "Tell us about yourself", description: "Answer a few questions about your location, lifestyle, and preferences. Takes under 2 minutes." },
  { number: "03", title: "Get your full cost report", description: "Receive a detailed breakdown: first-year costs, annual ongoing costs, lifetime total, and hidden expenses." },
];

const testimonials = [
  { name: "Sarah M.", location: "Austin, TX", text: "This calculator saved me from a huge financial surprise. I had no idea a French Bulldog would cost so much in the first year.", rating: 5 },
  { name: "James K.", location: "London, UK", text: "Finally a tool that accounts for UK prices. Every other calculator just used US data. Really helpful.", rating: 5 },
  { name: "Priya L.", location: "Sydney, AU", text: "Used this to compare three breeds before making a decision. The comparison tool is brilliant.", rating: 5 },
];

export default function HomePage() {
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white">
        <div className="container-xl py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-6 border border-white/20">
            <span className="h-2 w-2 rounded-full bg-[#A5D6A7] animate-pulse" />
            Updated June 2026 · 200+ breeds covered
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6 max-w-4xl mx-auto">
            Can you <span className="text-[#A5D6A7]">really afford</span> your dream pet?
          </h1>
          <p className="text-lg md:text-xl text-green-100 leading-relaxed mb-8 max-w-2xl mx-auto">
            Stop guessing. Get a complete cost breakdown for any dog or cat breed — first-year costs, lifetime expenses, and the hidden costs nobody talks about.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator" className="btn-green text-lg px-8 py-4">
              Calculate My Costs <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/breeds" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 text-white font-semibold px-8 py-4 text-base hover:bg-white/10 hover:border-white/50 transition-all">
              Browse Breeds
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-green-200">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#A5D6A7]" /> Free to use</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#A5D6A7]" /> No signup required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#A5D6A7]" /> 200+ breeds</span>
          </div>
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
          <h2 className="section-heading">What breed are you considering?</h2>
          <p className="section-subheading max-w-xl mx-auto">Click any breed to see a full cost breakdown, or use the calculator for a personalised estimate.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredBreeds.map((breed) => (
            <Link key={breed.id} href={`/breeds/${breed.id}`}
              className="card overflow-hidden group hover:border-[#4CAF50]/50">
              <div className="relative h-48 bg-[#E8F5E9] overflow-hidden">
                <Image src={breed.img} alt={breed.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="absolute top-3 right-3 badge badge-green shadow-sm">{breed.tag}</span>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors">{breed.name}</h3>
                  <p className="text-sm text-[#5a7a5a] mt-0.5">From {formatCurrency(breed.firstYearEstimate)}/first year</p>
                </div>
                <ChevronRight className="h-5 w-5 text-[#C8E6C9] group-hover:text-[#2E7D32] transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/breeds" className="btn-secondary mr-3">View All Breeds</Link>
          <Link href="/calculator" className="btn-primary">
            <Calculator className="h-4 w-4" /> Get My Personalised Cost Report
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#F1F8F1] border-y border-[#C8E6C9] py-16 md:py-20">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-green mb-3 mx-auto">How It Works</div>
            <h2 className="section-heading">Your cost report in under 2 minutes</h2>
            <p className="section-subheading">No signup, no fluff. Just accurate numbers for your specific situation.</p>
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
              <p className="text-[#5a7a5a] text-sm leading-relaxed mb-4">{t.text}</p>
              <div>
                <div className="text-sm font-semibold text-[#1B2B1B]">{t.name}</div>
                <div className="text-xs text-slate-400">{t.location}</div>
              </div>
            </div>
          ))}
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

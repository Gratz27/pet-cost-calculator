import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, MapPin, BarChart3, Download, Shield, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works – Pet Cost Calculator",
  description: "Learn how PetCost Calculator generates personalised pet ownership cost estimates in under 2 minutes.",
};

const steps = [
  {
    step: "Step 1",
    icon: Calculator,
    title: "Choose your pet type and breed",
    description: "Select from 300+ dog and cat breeds. Each breed has its own cost profile built from thousands of real-world data points. Can't decide? Browse breeds or use our comparison tool.",
  },
  {
    step: "Step 2",
    icon: MapPin,
    title: "Tell us your location and lifestyle",
    description: "Pet ownership costs vary significantly by location — a vet visit in Manhattan costs up to 3× more than in a regional city. We also factor in your work schedule, travel habits, and living situation.",
  },
  {
    step: "Step 3",
    icon: BarChart3,
    title: "Set your cost preferences",
    description: "Do you want insurance? Premium food? Regular professional grooming? We adjust every estimate to match your actual planned spending — not some arbitrary average.",
  },
  {
    step: "Step 4",
    icon: Download,
    title: "Get your full cost report",
    description: "In seconds, you'll see a complete breakdown: first-year total, annual ongoing costs, lifetime ownership cost, hidden expenses, a 10-year inflation forecast, and money-saving recommendations.",
  },
];

const faqs = [
  { q: "How accurate are the estimates?", a: "Our estimates are based on verified data from vet practices, pet stores, and breeders across the US, UK, and Australia. They are planning guides, not guarantees — actual costs vary by individual pet and local provider." },
  { q: "Does it cost anything?", a: "No. The calculator and all tools on PetCost-Calculator are completely free to use with no signup required." },
  { q: "What locations are supported?", a: "We support all US cities and regions, the United Kingdom, Australia, Canada, Singapore, and Western Europe. Enter your nearest major city for the most accurate results." },
  { q: "How often is the data updated?", a: "Food and supply prices are updated monthly. Vet and grooming costs are reviewed quarterly. Insurance premiums are reviewed annually." },
  { q: "Do I need to create an account?", a: "No. There is no sign-up, login, or personal information required. You can run the calculator as many times as you like, completely anonymously." },
  { q: "Can I use it to compare two breeds before deciding?", a: "Yes. Run the calculator once for each breed you are considering, or use our comparison pages for a side-by-side cost breakdown. Seeing the difference in lifetime cost is one of the most useful ways to choose a breed that fits your budget." },
  { q: "Does it work for both puppies/kittens and adult pets?", a: "Yes. The report separates first-year costs (which are higher for a young pet that needs vaccinations, neutering, and setup) from steady annual costs, so it is useful whether you are getting a puppy, a kitten, or adopting an adult." },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function HowItWorksPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {/* Hero — green palette */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white py-16 md:py-20">
        <div className="container-xl max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-green-100 mb-5 border border-white/20">
            Simple Process
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-green-200 text-xl">Your personalised pet cost report in under 2 minutes.</p>
        </div>
      </div>

      {/* Steps */}
      <div className="container-xl max-w-3xl py-16">
        <div className="space-y-5">
          {steps.map(({ step, icon: Icon, title, description }) => (
            <div key={step} className="card p-6 md:p-8 flex gap-6 items-start">
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5E9]">
                  <Icon className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wide whitespace-nowrap">{step}</span>
              </div>
              <div className="pt-1">
                <h2 className="text-xl font-bold text-[#1B2B1B] mb-2">{title}</h2>
                <p className="text-[#5a7a5a] leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What you get */}
        <div className="mt-10 card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">What your report includes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, label: "First-year breakdown", sub: "Every setup and first-year cost itemised" },
              { icon: BarChart3, label: "Annual ongoing costs", sub: "Year 2+ expenses by category" },
              { icon: Calculator, label: "Lifetime total", sub: "Full ownership cost over breed lifespan" },
              { icon: Shield, label: "Emergency fund guidance", sub: "How much to set aside for vet emergencies" },
              { icon: TrendingUp, label: "10-year inflation forecast", sub: "Costs projected with adjustable inflation rate" },
              { icon: Download, label: "Hidden cost warnings", sub: "Boarding, furniture, cleaning — the extras" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl bg-[#F1F8F1] p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F5E9] flex-shrink-0">
                  <Icon className="h-4 w-4 text-[#2E7D32]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1B2B1B]">{label}</div>
                  <div className="text-xs text-[#5a7a5a]">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why personalised */}
        <div className="mt-10 card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">Why a Personalised Estimate Beats a National Average</h2>
          <p className="text-[#5a7a5a] leading-relaxed">
            Most &quot;cost of owning a pet&quot; figures you&apos;ll find online are a single national average —
            one number meant to cover a Chihuahua and a Great Dane, a city apartment and a rural farm. In
            reality, the cost of a pet is driven by factors that average hides completely: the breed&apos;s size
            and health risks, your location, whether you insure, how you feed and groom, and whether you need
            paid walking or boarding. By asking a few quick questions, the calculator replaces a vague average
            with a figure that actually reflects your situation — which is what you need to budget responsibly.
          </p>
        </div>

        {/* Understanding results */}
        <div className="mt-6 card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">Understanding Your Results: First-Year vs Annual vs Lifetime</h2>
          <p className="text-[#5a7a5a] leading-relaxed mb-3">
            Your report separates costs into three views, because each answers a different question:
          </p>
          <ul className="text-[#5a7a5a] leading-relaxed space-y-2 list-disc pl-5">
            <li><strong className="text-[#1B2B1B]">First-year cost</strong> answers &quot;how much do I need up front?&quot; — the purchase or adoption price plus setup, vaccinations, and neutering. It&apos;s almost always the most expensive year.</li>
            <li><strong className="text-[#1B2B1B]">Annual ongoing cost</strong> answers &quot;what does this add to my monthly budget?&quot; — the steady year-2-onward spend on food, insurance, routine vet care, and grooming.</li>
            <li><strong className="text-[#1B2B1B]">Lifetime total</strong> answers &quot;what am I really committing to?&quot; — the full cost across the breed&apos;s typical lifespan, including the more expensive senior years.</li>
          </ul>
        </div>

        {/* Who it's for */}
        <div className="mt-6 card p-8">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">Who Should Use This Calculator</h2>
          <p className="text-[#5a7a5a] leading-relaxed">
            It&apos;s built for anyone weighing up a pet decision: first-time owners checking whether they can
            realistically afford a dog or cat, families comparing two breeds to find one that fits their budget,
            and current owners planning ahead for insurance, senior care, or a move to a new city. Because it
            takes under two minutes and requires no sign-up, it&apos;s also a quick sanity check before you fall
            in love with a particular breed at the breeder or shelter — far better to know the numbers first.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="card p-5">
                <h3 className="text-sm font-bold text-[#1B2B1B] mb-1.5">{q}</h3>
                <p className="text-sm text-[#5a7a5a] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to see your numbers?</h2>
          <p className="text-green-200 mb-6">Free, no signup required. Takes under 2 minutes.</p>
          <Link href="/calculator" className="btn-green inline-flex items-center gap-2">
            Start the Calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

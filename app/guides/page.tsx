import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Pet Cost Guides – Budgeting, Insurance & Breed Guides | PetCost-Calculator",
  description: "Evergreen how-to guides on budgeting for a pet, understanding pet insurance, grooming costs, vet costs, and breed-by-breed cost guides.",
};

const categories = [
  {
    title: "Budgeting & Planning",
    description: "Plan your pet budget before you bring them home — and avoid the surprises that catch most owners off guard.",
    image: "/blog/puppy-budget.png",
    color: "from-green-600 to-green-800",
    slugs: [
      "how-to-budget-for-a-new-pet",
      "first-year-pet-costs-everything",
      "emergency-pet-fund-how-much",
      "rescue-vs-breeder-cost-comparison",
      "how-pet-costs-change-with-age",
    ],
  },
  {
    title: "Pet Insurance",
    description: "Is it worth it? What does it actually cover? Everything you need to make an informed decision.",
    image: "/blog/pet-insurance.png",
    color: "from-blue-600 to-blue-800",
    slugs: [
      "is-pet-insurance-worth-it",
      "what-pet-insurance-doesnt-cover",
      "best-time-to-get-pet-insurance",
      "pet-insurance-uk-us-australia",
    ],
  },
  {
    title: "Vet Costs",
    description: "Real procedure prices, how to reduce bills, and what to do when the emergency arrives.",
    image: "/blog/vet-costs.png",
    color: "from-red-600 to-red-800",
    slugs: [
      "average-vet-costs-by-procedure",
      "how-to-reduce-vet-bills",
      "vet-visit-vs-home-treatment",
      "emergency-vet-costs-what-to-expect",
    ],
  },
  {
    title: "Grooming",
    description: "Professional vs DIY, breed-specific needs, and how to stop overpaying for coat maintenance.",
    image: "/breeds/poodle-standard.png",
    color: "from-purple-600 to-purple-800",
    slugs: [
      "professional-vs-diy-grooming-costs",
      "high-maintenance-coat-breeds-cost",
      "how-often-to-groom-dog-by-breed",
    ],
  },
  {
    title: "Choosing the Right Breed",
    description: "Which breeds are genuinely affordable, which ones look cheap but aren't, and the hidden costs nobody warns you about.",
    image: "/blog/dog-vs-cat.png",
    color: "from-orange-600 to-orange-800",
    slugs: [
      "cheap-vs-expensive-dog-breeds",
      "dog-vs-cat-which-is-cheaper",
      "small-dog-vs-large-dog-cost",
      "most-expensive-cat-breeds",
      "hidden-costs-popular-breeds",
    ],
  },
];

// Featured guides — one per category, the most broadly useful
const featuredSlugs = [
  "how-to-budget-for-a-new-pet",
  "is-pet-insurance-worth-it",
  "average-vet-costs-by-procedure",
  "cheap-vs-expensive-dog-breeds",
];

const featuredImages: Record<string, string> = {
  "how-to-budget-for-a-new-pet": "/blog/puppy-budget.png",
  "is-pet-insurance-worth-it": "/blog/pet-insurance.png",
  "average-vet-costs-by-procedure": "/blog/vet-costs.png",
  "cheap-vs-expensive-dog-breeds": "/blog/dog-vs-cat.png",
};

export default function GuidesPage() {
  const totalGuides = guides.length;

  const featuredGuides = featuredSlugs
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter(Boolean) as typeof guides;

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Cost Guides</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12">
          <div className="badge badge-green mb-3">Evergreen Guides</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Pet Cost Guides</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl mb-6">
            {totalGuides} in-depth guides covering every financial aspect of pet ownership — written to be factual, specific, and genuinely useful.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-[#5a7a5a]">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-[#2E7D32]" />
              {totalGuides} guides across 5 topics
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#2E7D32]" />
              5–10 min reads
            </span>
            <span className="flex items-center gap-1.5">
              <ChevronRight className="h-4 w-4 text-[#2E7D32]" />
              Updated June 2026
            </span>
          </div>
        </div>
      </div>

      <div className="container-xl py-10">

        {/* Featured guides */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">Most popular guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group card overflow-hidden hover:border-[#4CAF50]/50 transition-all"
              >
                <div className="relative aspect-square bg-[#E8F5E9] overflow-hidden">
                  <Image
                    src={featuredImages[guide.slug] ?? "/blog/puppy-budget.png"}
                    alt={guide.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <span className="badge badge-green mb-2 inline-block text-xs">{guide.category}</span>
                  <h3 className="text-sm font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors leading-snug mb-2 line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-[#5a7a5a] leading-relaxed line-clamp-2 mb-2">{guide.description}</p>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {guide.readMins} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Category sections */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catGuides = cat.slugs
              .map((slug) => guides.find((g) => g.slug === slug))
              .filter(Boolean) as typeof guides;

            return (
              <div key={cat.title}>
                {/* Category header */}
                <div className="bg-white rounded-2xl border border-[#C8E6C9] overflow-hidden mb-5">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="relative aspect-video md:aspect-auto bg-[#E8F5E9] overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className={`md:col-span-2 bg-gradient-to-br ${cat.color} p-6 md:p-8 flex flex-col justify-center`}>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{cat.title}</h2>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">{cat.description}</p>
                      <span className="text-white/60 text-xs">{catGuides.length} guides</span>
                    </div>
                  </div>
                </div>

                {/* Guide cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="card p-5 group hover:border-[#4CAF50]/50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-[#2E7D32]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] leading-snug mb-1.5 transition-colors line-clamp-2">
                            {guide.title}
                          </h3>
                          <p className="text-xs text-[#5a7a5a] leading-relaxed line-clamp-2 mb-2">
                            {guide.description}
                          </p>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {guide.readMins} min read
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Ready to calculate your actual costs?</h2>
          <p className="text-green-200 text-sm mb-5">
            Use our calculator for a personalised estimate based on your breed, location, and lifestyle.
          </p>
          <Link href="/calculator" className="btn-green inline-flex items-center gap-1.5">
            Start the Calculator <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

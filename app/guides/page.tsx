import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Pet Cost Guides – Budgeting, Insurance & Breed Guides | PetCost-Calculator",
  description: "Evergreen how-to guides on budgeting for a pet, understanding pet insurance, grooming costs, vet costs, and breed-by-breed cost guides.",
};

// Image for every guide slug
const guideImages: Record<string, string> = {
  // Budgeting & Planning
  "how-to-budget-for-a-new-pet":        "/blog/puppy-budget.png",
  "first-year-pet-costs-everything":    "/blog/first-year-costs.png",
  "emergency-pet-fund-how-much":        "/blog/holiday-emergency.png",
  "rescue-vs-breeder-cost-comparison":  "/blog/rescue-adoption.png",
  "how-pet-costs-change-with-age":      "/blog/puppy-vs-adult.png",
  // Pet Insurance
  "is-pet-insurance-worth-it":          "/blog/pet-insurance.png",
  "what-pet-insurance-doesnt-cover":    "/blog/hidden-costs.png",
  "best-time-to-get-pet-insurance":     "/blog/pet-insurance.png",
  "pet-insurance-uk-us-australia":      "/blog/costs-by-location.png",
  // Vet Costs
  "average-vet-costs-by-procedure":     "/blog/vet-costs.png",
  "how-to-reduce-vet-bills":            "/blog/vet-by-breed.png",
  "vet-visit-vs-home-treatment":        "/blog/emergency-vet.png",
  "emergency-vet-costs-what-to-expect": "/blog/holiday-emergency.png",
  // Grooming
  "professional-vs-diy-grooming-costs": "/breeds/poodle-standard.png",
  "high-maintenance-coat-breeds-cost":  "/breeds/golden-retriever.png",
  "how-often-to-groom-dog-by-breed":    "/breeds/shih-tzu.png",
  // Choosing the Right Breed
  "cheap-vs-expensive-dog-breeds":      "/blog/dog-vs-cat.png",
  "dog-vs-cat-which-is-cheaper":        "/blog/dog-vs-cat.png",
  "small-dog-vs-large-dog-cost":        "/blog/small-vs-large.png",
  "most-expensive-cat-breeds":          "/blog/cat-costs.png",
  "hidden-costs-popular-breeds":        "/blog/hidden-costs.png",
};

const categories = [
  {
    title: "Budgeting & Planning",
    description: "Plan your pet budget before you bring them home — and avoid the surprises that catch most owners off guard.",
    image: "/blog/puppy-budget.png",
    gradient: "from-[#1B5E20] to-[#2E7D32]",
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
    gradient: "from-[#1a3d2b] to-[#2E7D5A]",
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
    gradient: "from-[#33691E] to-[#558B2F]",
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
    gradient: "from-[#1B5E20] to-[#388E3C]",
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
    gradient: "from-[#37471F] to-[#558B2F]",
    slugs: [
      "cheap-vs-expensive-dog-breeds",
      "dog-vs-cat-which-is-cheaper",
      "small-dog-vs-large-dog-cost",
      "most-expensive-cat-breeds",
      "hidden-costs-popular-breeds",
    ],
  },
];

// Featured — one per category
const featuredSlugs = [
  "how-to-budget-for-a-new-pet",
  "is-pet-insurance-worth-it",
  "average-vet-costs-by-procedure",
  "cheap-vs-expensive-dog-breeds",
];

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
                    src={guideImages[guide.slug] ?? "/blog/puppy-budget.png"}
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
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-56 h-44 md:h-auto flex-shrink-0 bg-[#E8F5E9]">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 768px) 100vw, 224px"
                      />
                    </div>
                    <div className={`flex-1 bg-gradient-to-br ${cat.gradient} p-6 md:p-8 flex flex-col justify-center`}>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{cat.title}</h2>
                      <p className="text-white/80 text-sm leading-relaxed mb-3">{cat.description}</p>
                      <span className="text-white/60 text-xs">{catGuides.length} guides</span>
                    </div>
                  </div>
                </div>

                {/* Guide cards with images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group card overflow-hidden hover:border-[#4CAF50]/50 transition-all"
                    >
                      <div className="relative h-36 bg-[#E8F5E9] overflow-hidden">
                        <Image
                          src={guideImages[guide.slug] ?? "/blog/puppy-budget.png"}
                          alt={guide.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
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

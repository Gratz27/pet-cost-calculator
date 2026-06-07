import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, DollarSign, Heart, Shield, Scissors, Syringe } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Cost Guides – Budgeting, Insurance & Breed Guides | PetCost-Calculator",
  description: "Evergreen how-to guides on budgeting for a pet, understanding pet insurance, grooming costs, vet costs, and breed-by-breed cost guides.",
};

const guideCategories = [
  {
    icon: DollarSign,
    title: "Budgeting & Planning",
    color: "bg-green-100 text-green-700",
    guides: [
      { title: "How to Budget for a New Pet: The Complete Checklist", slug: "how-to-budget-for-a-new-pet", mins: 8 },
      { title: "First-Year Pet Costs: Everything You Need to Know", slug: "first-year-pet-costs-everything", mins: 10 },
      { title: "Building an Emergency Pet Fund: How Much Is Enough?", slug: "emergency-pet-fund-how-much", mins: 6 },
      { title: "The Real Cost of a Rescue vs a Breeder", slug: "rescue-vs-breeder-cost-comparison", mins: 7 },
      { title: "How Pet Ownership Costs Change as Your Pet Ages", slug: "how-pet-costs-change-with-age", mins: 9 },
    ],
  },
  {
    icon: Shield,
    title: "Pet Insurance",
    color: "bg-blue-100 text-blue-700",
    guides: [
      { title: "Is Pet Insurance Worth It? A Cost-Benefit Analysis", slug: "is-pet-insurance-worth-it", mins: 9 },
      { title: "What Pet Insurance Doesn't Cover (Read Before Buying)", slug: "what-pet-insurance-doesnt-cover", mins: 7 },
      { title: "The Best Time to Get Pet Insurance (Hint: It's Early)", slug: "best-time-to-get-pet-insurance", mins: 5 },
      { title: "Pet Insurance in the UK vs US vs Australia: Key Differences", slug: "pet-insurance-uk-us-australia", mins: 8 },
    ],
  },
  {
    icon: Syringe,
    title: "Vet Costs",
    color: "bg-red-100 text-red-700",
    guides: [
      { title: "Average Vet Costs by Procedure (2026 Updated Prices)", slug: "average-vet-costs-by-procedure", mins: 10 },
      { title: "How to Reduce Vet Bills Without Cutting Corners", slug: "how-to-reduce-vet-bills", mins: 7 },
      { title: "When Is a Vet Visit Worth It vs Home Treatment?", slug: "vet-visit-vs-home-treatment", mins: 6 },
      { title: "Emergency Vet Costs: What to Expect and How to Prepare", slug: "emergency-vet-costs-what-to-expect", mins: 8 },
    ],
  },
  {
    icon: Scissors,
    title: "Grooming",
    color: "bg-purple-100 text-purple-700",
    guides: [
      { title: "Professional Grooming vs DIY: A Full Cost Comparison", slug: "professional-vs-diy-grooming-costs", mins: 6 },
      { title: "High-Maintenance Coat Breeds and What They Really Cost", slug: "high-maintenance-coat-breeds-cost", mins: 7 },
      { title: "How Often Should You Groom Your Dog? A Breed Guide", slug: "how-often-to-groom-dog-by-breed", mins: 5 },
    ],
  },
  {
    icon: Heart,
    title: "Choosing the Right Breed",
    color: "bg-orange-100 text-orange-700",
    guides: [
      { title: "Cheap vs Expensive Dog Breeds: The Full Cost Breakdown", slug: "cheap-vs-expensive-dog-breeds", mins: 9 },
      { title: "Dog vs Cat: Which Is Cheaper to Own?", slug: "dog-vs-cat-which-is-cheaper", mins: 7 },
      { title: "Small Dog vs Large Dog: Which Costs More Lifetime?", slug: "small-dog-vs-large-dog-cost", mins: 6 },
      { title: "The 10 Most Expensive Cat Breeds to Own", slug: "most-expensive-cat-breeds", mins: 7 },
      { title: "Hidden Costs of Popular Breeds Nobody Talks About", slug: "hidden-costs-popular-breeds", mins: 8 },
    ],
  },
];

export default function GuidesPage() {
  const totalGuides = guideCategories.reduce((sum, c) => sum + c.guides.length, 0);

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
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            {totalGuides} in-depth guides on every aspect of pet ownership costs — from first-year budgeting to insurance, grooming, and breed-specific cost breakdowns.
          </p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="space-y-10">
          {guideCategories.map(({ icon: Icon, title, color, guides }) => (
            <div key={title}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-[#1B2B1B]">{title}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="card p-5 group hover:border-[#4CAF50]/50"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-4 w-4 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-[#1B2B1B] group-hover:text-[#2E7D32] leading-snug mb-1 transition-colors">
                          {guide.title}
                        </h3>
                        <span className="text-xs text-slate-400">{guide.mins} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Ready to calculate your actual costs?</h2>
          <p className="text-green-200 text-sm mb-5">Use our calculator for a personalised estimate based on your breed, location, and lifestyle.</p>
          <Link href="/calculator" className="btn-green inline-flex items-center gap-1.5">
            Start the Calculator <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

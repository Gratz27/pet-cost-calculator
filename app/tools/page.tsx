import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, DollarSign, Calculator, BarChart3, ShoppingBag } from "lucide-react";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Free Pet Cost Tools – Insurance Compare, Budget Tracker | PetCost-Calculator",
  description: "Free tools for pet owners: insurance comparator, monthly budget tracker, breed cost calculator, and more.",
};

const tools = [
  {
    icon: Calculator,
    title: "Pet Cost Calculator",
    description: "Get a full personalised cost report for any dog or cat breed based on your location and lifestyle. The most comprehensive pet cost calculator available.",
    href: "/calculator",
    cta: "Start Calculator",
    badge: "Most popular",
    badgeColor: "badge-green",
  },
  {
    icon: Shield,
    title: "Pet Insurance Comparator",
    description: "See what pet insurance typically costs for your breed and get guidance on whether it's worth it based on your situation.",
    href: "/tools/insurance-compare",
    cta: "Compare Insurance",
    badge: "Free",
    badgeColor: "badge-blue",
  },
  {
    icon: DollarSign,
    title: "Monthly Budget Tracker",
    description: "Plan your monthly pet budget with our interactive tracker. Set targets for food, vet, grooming, and more — and see where you're over or under.",
    href: "/tools/budget-tracker",
    cta: "Open Tracker",
    badge: "Free",
    badgeColor: "badge-blue",
  },
  {
    icon: BarChart3,
    title: "Breed Cost Comparison",
    description: "Compare the full costs of two breeds side-by-side. See first-year, annual, and lifetime cost differences at a glance.",
    href: "/compare",
    cta: "Compare Breeds",
    badge: "Free",
    badgeColor: "badge-blue",
  },
  {
    icon: ShoppingBag,
    title: "Pet Essentials",
    description: "The essentials every owner needs — crates, beds, food, litter, grooming, and more, with the current top picks on Amazon.",
    href: "/tools/gear",
    cta: "Browse Essentials",
    badge: "New",
    badgeColor: "badge-green",
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Tools</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12">
          <div className="badge badge-green mb-3">Free Tools</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Pet Cost Tools</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Free tools to help you budget for, compare, and plan pet ownership costs. No signup required.
          </p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {tools.map(({ icon: Icon, title, description, href, cta, badge, badgeColor }) => (
            <div key={title} className="card p-7 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5E9]">
                  <Icon className="h-6 w-6 text-[#2E7D32]" />
                </div>
                <span className={`badge ${badgeColor}`}>{badge}</span>
              </div>
              <h2 className="text-lg font-bold text-[#1B2B1B] mb-2">{title}</h2>
              <p className="text-sm text-[#5a7a5a] leading-relaxed mb-5 flex-1">{description}</p>
              <Link href={href} className="btn-primary text-sm w-full text-center">
                {cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* SEO / educational content — server-rendered */}
        <div className="max-w-4xl mt-10 bg-white border border-[#C8E6C9] rounded-xl p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How These Tools Work Together</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              Each tool answers a different question about the cost of owning a pet, and they&apos;re designed to
              be used together. Start with the <Link href="/calculator" className="text-[#2E7D32] underline">cost
              calculator</Link> to get a personalised first-year, annual, and lifetime estimate for your breed and
              location. Use the <Link href="/tools/insurance-compare" className="text-[#2E7D32] underline">insurance
              comparator</Link> to decide whether to insure and what a policy should cost. Once your pet is home,
              the <Link href="/tools/budget-tracker" className="text-[#2E7D32] underline">budget tracker</Link> keeps
              your real spending on plan month to month. And if you&apos;re still choosing, the
              <Link href="/compare" className="text-[#2E7D32] underline"> breed comparison</Link> tool shows two
              breeds&apos; costs side by side. All of them are free and require no sign-up.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Understanding the True Cost of Pet Ownership</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              The purchase or adoption price is only a small fraction of what a pet really costs. Over a lifetime,
              the big numbers are the ongoing ones: food, routine and emergency veterinary care, insurance,
              grooming, and the higher costs of the senior years. A typical dog costs $20,000–$55,000 over its
              life and a typical cat $10,000–$25,000 — figures that vary widely by breed, location, and the
              choices you make. These tools exist to turn those abstract ranges into a concrete plan you can
              actually budget around, so you can take on a pet with confidence rather than financial surprise.
            </p>
          </section>
        </div>

        {/* Ad — below tools grid */}
        <div className="max-w-4xl mt-8">
          <AdUnit slot="2847391056" format="horizontal" />
        </div>
      </div>
    </div>
  );
}

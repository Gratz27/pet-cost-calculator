import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, DollarSign, Calculator, BarChart3 } from "lucide-react";

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
      </div>
    </div>
  );
}

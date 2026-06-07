import Link from "next/link";
import { Calculator, Heart } from "lucide-react";

const footerLinks = {
  Tools: [
    { label: "Cost Calculator", href: "/calculator" },
    { label: "Breed Comparison", href: "/compare" },
    { label: "Insurance Compare", href: "/tools/insurance-compare" },
    { label: "Budget Tracker", href: "/tools/budget-tracker" },
    { label: "All Tools", href: "/tools" },
  ],
  "Guides & Data": [
    { label: "Cost Guides", href: "/guides" },
    { label: "Blog & Articles", href: "/blog" },
    { label: "Annual Report 2026", href: "/report" },
    { label: "Our Methodology", href: "/methodology" },
  ],
  Breeds: [
    { label: "All Breeds", href: "/breeds" },
    { label: "Dogs", href: "/breeds?type=dog" },
    { label: "Cats", href: "/breeds?type=cat" },
    { label: "Compare Breeds", href: "/compare" },
  ],
  "Regional Costs": [
    { label: "US National Average", href: "/costs/us/national-average" },
    { label: "New York", href: "/costs/us/new-york" },
    { label: "London, UK", href: "/costs/uk/london" },
    { label: "Sydney, AU", href: "/costs/au/sydney" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1B2B1B] text-slate-300">
      <div className="container-xl py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CAF50] text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white">
                PetCost<span className="text-[#81C784]">-Calculator</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The definitive platform for pet ownership cost planning. Helping pet owners make informed decisions.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <span>Data updated regularly</span>
              <span>·</span>
              <span>200+ breeds</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-[#81C784] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliate disclosure */}
        <div className="mb-6 rounded-xl bg-[#1B5E20]/30 border border-[#2E7D32]/20 px-4 py-3">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Affiliate disclosure:</span> Some links on this site are affiliate links. If you purchase a product or service through one of these links, we may earn a commission at no additional cost to you. This does not influence our recommendations, cost data, or editorial content. We only link to products and services we believe are genuinely useful to pet owners.
          </p>
        </div>

        <div className="pt-6 border-t border-[#2E7D32]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PetCost-Calculator.com. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-400 fill-red-400" /> for pet owners worldwide
          </p>
          <p className="text-xs text-slate-600 max-w-md text-center">
            Cost estimates are for informational purposes only. Actual costs vary by location, provider, and individual pet needs.
          </p>
        </div>
      </div>
    </footer>
  );
}

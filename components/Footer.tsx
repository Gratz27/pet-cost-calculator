import Link from "next/link";
import { Calculator, Heart } from "lucide-react";

const footerLinks = {
  Tools: [
    { label: "Cost Calculator", href: "/calculator" },
    { label: "Breed Comparison", href: "/compare" },
    { label: "All Breeds", href: "/breeds" },
  ],
  "Cost Guides": [
    { label: "Dog Cost Guides", href: "/blog" },
    { label: "Cat Cost Guides", href: "/blog" },
    { label: "All Articles", href: "/blog" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1B2B1B] text-slate-300">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CAF50] text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white">
                PetCost<span className="text-[#81C784]">-Calculator</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The definitive platform for pet ownership cost planning. Helping over 500,000 pet owners make informed decisions.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <span>Data updated monthly</span>
              <span>·</span>
              <span>10,000+ cost data points</span>
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

        <div className="mt-12 pt-8 border-t border-[#2E7D32]/30 flex flex-col md:flex-row items-center justify-between gap-4">
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

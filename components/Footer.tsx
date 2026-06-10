import Link from "next/link";
import { PawPrint, Heart, Instagram, Facebook } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.7-.61-1.16-1.46-1.27-2.42h-3.07v13.13a2.6 2.6 0 1 1-1.84-2.49V10.9a5.7 5.7 0 1 0 4.91 5.65V9.27a6.66 6.66 0 0 0 3.84 1.21V7.41a3.86 3.86 0 0 1-2.57-1.59z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2.01.04-2.88.19-.79 1.21-5.03 1.21-5.03s-.31-.62-.31-1.53c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.43-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.22-1.92 3.22-4.7 0-2.46-1.77-4.18-4.29-4.18-2.92 0-4.64 2.19-4.64 4.45 0 .88.34 1.83.76 2.34a.3.3 0 0 1 .07.29c-.08.32-.25 1.02-.29 1.16-.04.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.27 2.38-6.28 6.86-6.28 3.6 0 6.4 2.57 6.4 6 0 3.58-2.26 6.46-5.39 6.46-1.05 0-2.04-.55-2.38-1.19l-.65 2.46c-.23.9-.87 2.02-1.29 2.71.97.3 2 .46 3.07.46 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61583074795583", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/petcost_calculator/", icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@petcostcalculator", icon: TikTokIcon },
  { label: "Pinterest", href: "https://www.pinterest.com/petcostcalculator", icon: PinterestIcon },
];

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
    { label: "News & Articles", href: "/blog" },
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
                <PawPrint className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white">
                Pet<span className="text-[#81C784]">Cost</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The definitive platform for pet ownership cost planning. Helping pet owners make informed decisions.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <span>Data updated regularly</span>
              <span>·</span>
              <span>300+ breeds</span>
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B5E20]/30 text-slate-300 hover:bg-[#2E7D32] hover:text-white transition-colors"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
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

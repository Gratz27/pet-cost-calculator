"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Calculator, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Calculator", href: "/calculator" },
  {
    label: "Breeds",
    href: "/breeds",
    children: [
      { label: "All Breeds", href: "/breeds" },
      { label: "Compare Breeds", href: "/compare" },
      { label: "Dogs", href: "/breeds?type=dog" },
      { label: "Cats", href: "/breeds?type=cat" },
    ],
  },
  {
    label: "Learn",
    href: "/guides",
    children: [
      { label: "Cost Guides", href: "/guides" },
      { label: "News & Articles", href: "/blog" },
      { label: "Annual Report 2026", href: "/report" },
      { label: "Our Methodology", href: "/methodology" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "All Tools", href: "/tools" },
      { label: "Insurance Compare", href: "/tools/insurance-compare" },
      { label: "Budget Tracker", href: "/tools/budget-tracker" },
    ],
  },
  {
    label: "Costs",
    href: "/costs/us/national-average",
    children: [
      { label: "US National Average", href: "/costs/us/national-average" },
      { label: "New York", href: "/costs/us/new-york" },
      { label: "Los Angeles", href: "/costs/us/los-angeles" },
      { label: "London, UK", href: "/costs/uk/london" },
      { label: "Sydney, AU", href: "/costs/au/sydney" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C8E6C9] bg-white/95 backdrop-blur shadow-sm">
      <div className="container-xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2E7D32] text-white transition-transform group-hover:scale-105">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-[#1B2B1B]">
              Pet<span className="text-[#4CAF50]">Cost</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[#5a7a5a] hover:bg-[#E8F5E9] hover:text-[#2E7D32] transition-colors">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" style={{ transform: openDropdown === link.label ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-[#C8E6C9] bg-white py-2 shadow-lg z-50">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-[#5a7a5a] hover:bg-[#E8F5E9] hover:text-[#2E7D32]">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#5a7a5a] hover:bg-[#E8F5E9] hover:text-[#2E7D32] transition-colors">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/calculator" className="btn-green text-sm px-4 py-2">
              Calculate My Costs
            </Link>
          </div>

          <button className="md:hidden rounded-lg p-2 text-[#5a7a5a] hover:bg-[#E8F5E9]"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#C8E6C9] bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#5a7a5a] hover:bg-[#E8F5E9] hover:text-[#2E7D32]"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
              {link.children && (
                <div className="ml-3 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link key={child.href} href={child.href}
                      className="block rounded-lg px-3 py-2 text-xs text-[#5a7a5a] hover:bg-[#E8F5E9] hover:text-[#2E7D32]"
                      onClick={() => setMobileOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2">
            <Link href="/calculator" className="btn-green w-full text-sm" onClick={() => setMobileOpen(false)}>
              Calculate My Costs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

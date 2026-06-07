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
  { label: "Cost Guides", href: "/blog" },
  { label: "How It Works", href: "/how-it-works" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container-xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E3A5F] text-white transition-transform group-hover:scale-105">
              <Calculator className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-[#0f172a]">
              PetCost<span className="text-[#16A34A]">Calculator</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1E3A5F]">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform" style={{ transform: openDropdown === link.label ? "rotate(180deg)" : "none" }} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-lg">
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#1E3A5F]">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#1E3A5F]"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/calculator" className="btn-green text-sm px-4 py-2">
              Calculate My Costs
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#1E3A5F]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
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

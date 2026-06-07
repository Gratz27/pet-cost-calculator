import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InsuranceCompareClient from "./InsuranceCompareClient";

export const metadata: Metadata = {
  title: "Pet Insurance Comparison Guide 2026 | PetCost-Calculator",
  description: "Is pet insurance worth it? Compare pet insurance costs by breed and country. Filter by US, UK, or Australia to find the best provider for your pet.",
};

export default function InsuranceComparePage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-[#2E7D32]">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Insurance Compare</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12 max-w-4xl">
          <div className="badge badge-blue mb-3">Insurance Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-4">Pet Insurance Comparison 2026</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Filter by country and pet type to compare providers side-by-side. See what&apos;s covered, average monthly costs by breed, and which policy offers the best value.
          </p>
          <p className="text-xs text-slate-400 mt-4">Updated June 2026 · <span className="font-medium">Affiliate disclosure:</span> some links are affiliate links that help fund this site at no cost to you.</p>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl">
        <InsuranceCompareClient />
        <div className="mt-8 text-center">
          <Link href="/calculator" className="btn-primary">Calculate My Full Pet Costs →</Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CompareClient from "@/components/CompareClient";

export const metadata: Metadata = {
  title: "Compare Breed Costs Side-by-Side | PetCost-Calculator",
  description: "Compare the costs of two dog or cat breeds side-by-side. See first-year costs, annual expenses, and lifetime totals at a glance.",
};

export default function ComparePage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Compare Breeds</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 text-center">
          <div className="badge badge-green mb-3 mx-auto">Comparison Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Compare Breed Costs</h1>
          <p className="text-[#5a7a5a] text-lg max-w-xl mx-auto">
            Select two breeds to see a full side-by-side cost comparison.
          </p>
        </div>
      </div>

      <div className="container-xl py-8">
        <CompareClient />
      </div>
    </div>
  );
}

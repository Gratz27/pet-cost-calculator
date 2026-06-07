import type { Metadata } from "next";
import CompareClient from "@/components/CompareClient";

export const metadata: Metadata = {
  title: "Compare Breed Costs Side-by-Side",
  description: "Compare the costs of two or more dog or cat breeds side-by-side. See first-year costs, annual expenses, and lifetime totals at a glance.",
};

export default function ComparePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-xl">
        <div className="text-center mb-8">
          <div className="badge badge-blue mb-3 mx-auto">Comparison Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">Compare Breed Costs</h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Select two breeds to see a full side-by-side cost comparison.
          </p>
        </div>
        <CompareClient />
      </div>
    </div>
  );
}

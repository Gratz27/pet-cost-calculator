import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BudgetTrackerClient from "./BudgetTrackerClient";

export const metadata: Metadata = {
  title: "Pet Monthly Budget Tracker | PetCost-Calculator",
  description: "Set monthly budgets for food, vet, grooming, and more. Track your actual vs planned pet spending month by month.",
};

export default function BudgetTrackerPage() {
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
            <span className="text-[#1B2B1B] font-medium">Budget Tracker</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 max-w-3xl">
          <div className="badge badge-green mb-3">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Pet Monthly Budget Tracker</h1>
          <p className="text-[#5a7a5a] text-lg">
            Set your monthly budget for each cost category, enter actual spending, and see at a glance where you&apos;re over or under.
          </p>
        </div>
      </div>

      <div className="container-xl py-8 max-w-3xl">
        <BudgetTrackerClient />
        <div className="mt-8 text-center">
          <p className="text-sm text-[#5a7a5a] mb-3">Want a more precise estimate based on your breed?</p>
          <Link href="/calculator" className="btn-primary">Use the Full Calculator →</Link>
        </div>
      </div>
    </div>
  );
}

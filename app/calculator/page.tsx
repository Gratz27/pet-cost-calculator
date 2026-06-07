import type { Metadata } from "next";
import CalculatorClient from "@/components/Calculator/CalculatorClient";

export const metadata: Metadata = {
  title: "Pet Cost Calculator – Personalised Cost Report",
  description: "Calculate the complete cost of owning a dog or cat. First-year costs, annual expenses, lifetime total, and hidden costs — personalised to your breed, location, and lifestyle.",
};

export default function CalculatorPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 max-w-4xl text-center">
          <div className="badge badge-green mb-3 mx-auto">Free Tool</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Pet Cost Calculator</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl mx-auto">
            Answer a few questions and get a complete cost breakdown for your chosen breed and lifestyle. Takes under 2 minutes.
          </p>
        </div>
      </div>
      <div className="container-xl max-w-4xl py-8">
        <CalculatorClient />
      </div>
    </div>
  );
}

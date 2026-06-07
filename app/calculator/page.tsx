import type { Metadata } from "next";
import CalculatorClient from "@/components/Calculator/CalculatorClient";

export const metadata: Metadata = {
  title: "Pet Cost Calculator",
  description: "Calculate the complete cost of owning a dog or cat. First-year costs, annual expenses, lifetime total, and hidden costs — personalised to your breed, location, and lifestyle.",
};

export default function CalculatorPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-xl max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">Pet Cost Calculator</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Answer a few questions and get a complete cost breakdown for your chosen breed and lifestyle.
          </p>
        </div>
        <CalculatorClient />
      </div>
    </div>
  );
}

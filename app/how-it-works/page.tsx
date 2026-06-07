import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, MapPin, BarChart3, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how PetCost Calculator generates personalised pet ownership cost estimates in under 2 minutes.",
};

const steps = [
  {
    number: "01",
    icon: Calculator,
    title: "Choose your pet type and breed",
    description: "Select from 200+ dog and cat breeds. Each breed has its own cost profile built from thousands of real-world data points. Can't decide? Browse breeds or use our comparison tool.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Tell us your location and lifestyle",
    description: "Pet ownership costs vary significantly by location — a vet visit in Manhattan costs 3× more than in rural Kansas. We also factor in your work schedule, travel habits, and living situation.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Set your preferences",
    description: "Do you want insurance? Premium food? Regular grooming? We adjust every estimate to match your actual planned spending — not some arbitrary average.",
  },
  {
    number: "04",
    icon: Download,
    title: "Get your full cost report",
    description: "In seconds, you'll see a complete breakdown: first-year total, annual ongoing costs, lifetime ownership cost, hidden expenses, and money-saving recommendations.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1E3A5F] text-white py-16 md:py-20">
        <div className="container-xl max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-blue-200 text-xl">Your personalised pet cost report in under 2 minutes.</p>
        </div>
      </div>

      <div className="container-xl max-w-3xl py-16">
        <div className="space-y-10">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A5F]/10">
                  <Icon className="h-6 w-6 text-[#1E3A5F]" />
                </div>
              </div>
              <div className="pt-1">
                <div className="text-xs font-bold text-[#16A34A] mb-1">{number}</div>
                <h2 className="text-xl font-bold text-[#0f172a] mb-2">{title}</h2>
                <p className="text-slate-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-3">Ready to see your numbers?</h2>
          <p className="text-slate-600 mb-6">Free, no signup required. Takes under 2 minutes.</p>
          <Link href="/calculator" className="btn-primary">
            Start the Calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

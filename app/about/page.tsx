import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, RefreshCw, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About PetCost Calculator",
  description: "Learn how PetCost Calculator builds accurate pet ownership cost estimates using verified data from vets, breeders, and pet stores worldwide.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1E3A5F] text-white py-16 md:py-20">
        <div className="container-xl max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About PetCost Calculator</h1>
          <p className="text-blue-200 text-xl leading-relaxed">
            We believe every future pet owner deserves honest, accurate cost information before making one of the biggest commitments of their lives.
          </p>
        </div>
      </div>

      <div className="container-xl max-w-3xl py-16 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Too many pets are surrendered to shelters because their owners were unprepared for the real financial cost. We built PetCost Calculator to solve that problem — giving prospective pet owners a clear, honest picture of what ownership actually costs before they bring a pet home.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Our goal is to be the most trusted, most accurate, and most useful pet cost resource in the world — not because it makes us money, but because it helps animals find permanent, loving homes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6">How We Build Our Cost Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Database, title: "10,000+ Data Points", description: "We survey vet clinics, pet stores, breeders, and groomers across the US, UK, Australia, and Canada to build accurate cost profiles." },
              { icon: RefreshCw, title: "Monthly Updates", description: "Pet care costs change with inflation. We update our data every month to ensure our estimates reflect current market rates." },
              { icon: Globe, title: "Location Adjustments", description: "A Golden Retriever costs very different amounts in New York vs rural Texas. Our location multipliers account for local market conditions." },
              { icon: Shield, title: "Transparent Methodology", description: "We show exactly what's included in every estimate. No hidden assumptions, no inflated numbers to drive insurance clicks." },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-200 p-5">
                <Icon className="h-5 w-5 text-[#1E3A5F] mb-3" />
                <h3 className="text-base font-bold text-[#0f172a] mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Important Disclaimers</h2>
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800 space-y-2">
            <p>All cost estimates are for informational purposes only and represent average figures. Your actual costs will vary based on your specific pet, location, health circumstances, and lifestyle choices.</p>
            <p>PetCost Calculator does not provide veterinary, financial, or professional advice. Always consult qualified professionals for decisions about your pet's health and your personal finances.</p>
          </div>
        </section>

        <div className="text-center pt-4">
          <Link href="/calculator" className="btn-primary">
            Try the Calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Database, RefreshCw, Globe, ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About PetCost-Calculator",
  description: "Learn how PetCost-Calculator builds accurate pet ownership cost estimates using verified data from vets, breeders, and pet stores worldwide.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">About</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white py-16 md:py-20">
        <div className="container-xl max-w-3xl">
          <div className="badge bg-white/20 text-green-100 mb-4 inline-block">Our Mission</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About PetCost-Calculator</h1>
          <p className="text-green-200 text-xl leading-relaxed max-w-2xl">
            We believe every future pet owner deserves honest, accurate cost information before making one of the biggest commitments of their lives.
          </p>
        </div>
      </div>

      <div className="container-xl max-w-3xl py-12 space-y-8">
        {/* Mission */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[#1B2B1B] mb-4">Our Mission</h2>
          <p className="text-[#5a7a5a] leading-relaxed">
            Too many pets are surrendered to shelters because their owners were unprepared for the real financial cost. We built PetCost-Calculator to solve that problem — giving prospective pet owners a clear, honest picture of what ownership actually costs before they bring a pet home.
          </p>
          <p className="text-[#5a7a5a] leading-relaxed mt-4">
            Our goal is to be the most trusted, most accurate, and most useful pet cost resource in the world — not because it makes us money, but because it helps animals find permanent, loving homes.
          </p>
        </div>

        {/* How we build data */}
        <div>
          <h2 className="text-2xl font-bold text-[#1B2B1B] mb-5">How We Build Our Cost Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Database, title: "Verified Data Sources", description: "We survey vet clinics, pet stores, breeders, and groomers across the US, UK, Australia, and Canada to build accurate cost profiles for every breed." },
              { icon: RefreshCw, title: "Regular Updates", description: "Pet care costs change with inflation. We update our data regularly to ensure estimates reflect current market rates in each region." },
              { icon: Globe, title: "Location Adjustments", description: "A Golden Retriever costs very different amounts in New York vs regional Australia. Our regional multipliers account for local market conditions." },
              { icon: Shield, title: "Transparent Methodology", description: "We show exactly what's included in every estimate. No hidden assumptions, no inflated numbers. Read our full methodology page for details." },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] mb-3">
                  <Icon className="h-5 w-5 text-[#2E7D32]" />
                </div>
                <h3 className="text-base font-bold text-[#1B2B1B] mb-2">{title}</h3>
                <p className="text-sm text-[#5a7a5a] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/methodology" className="text-sm text-[#2E7D32] font-semibold hover:underline">
              Read our full methodology →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-sm text-amber-800 space-y-2">
          <h3 className="font-bold text-amber-900 mb-2">Important Disclaimers</h3>
          <p>All cost estimates are for informational purposes only and represent average figures. Your actual costs will vary based on your specific pet, location, health circumstances, and lifestyle choices.</p>
          <p>PetCost-Calculator does not provide veterinary, financial, or professional advice. Always consult qualified professionals for decisions about your pet&apos;s health and your personal finances.</p>
        </div>

        <div className="text-center pt-2">
          <Link href="/calculator" className="btn-primary">
            Try the Calculator <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

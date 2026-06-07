import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service – PetCost-Calculator",
  description: "Terms of service for PetCost-Calculator.com",
};

export default function TermsPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Terms of Service</span>
          </nav>
        </div>
      </div>

      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 max-w-3xl">
          <h1 className="text-3xl font-bold text-[#1B2B1B] mb-2">Terms of Service</h1>
          <p className="text-[#5a7a5a] text-sm">Last updated: June 2026</p>
        </div>
      </div>

      <div className="container-xl max-w-3xl py-10">
        <div className="card p-8 space-y-7 article-content">
          <section>
            <h2>Use of Service</h2>
            <p>PetCost-Calculator provides pet ownership cost estimates for informational and planning purposes only. By using this service, you agree that the estimates provided are guides, not guarantees, and that actual costs will vary significantly based on your specific pet, location, and circumstances.</p>
          </section>
          <section>
            <h2>Accuracy Disclaimer</h2>
            <p>While we strive to maintain accurate and up-to-date cost data, we make no representations or warranties about the accuracy, completeness, or suitability of the information provided. Do not rely solely on our estimates for major financial decisions.</p>
          </section>
          <section>
            <h2>No Professional Advice</h2>
            <p>Nothing on this site constitutes veterinary, financial, legal, or professional advice. Always consult qualified professionals for decisions about your pet&apos;s health and your personal finances.</p>
          </section>
          <section>
            <h2>Affiliate Relationships</h2>
            <p>PetCost-Calculator participates in affiliate programmes. Some links on this site are affiliate links. These links are clearly labelled or disclosed where required. Our cost estimates and editorial content are not influenced by these commercial relationships.</p>
          </section>
          <section>
            <h2>Limitation of Liability</h2>
            <p>PetCost-Calculator shall not be liable for any losses or damages arising from your use of this service or reliance on the cost estimates provided. Use this service at your own risk.</p>
          </section>
          <section>
            <h2>Intellectual Property</h2>
            <p>All content on this site, including cost data, articles, tools, and design, is the property of PetCost-Calculator.com. You may not reproduce, distribute, or create derivative works without express written permission.</p>
          </section>
          <section>
            <h2>Changes to Terms</h2>
            <p>We may update these terms periodically. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-xl max-w-3xl py-16">
      <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Terms of Service</h1>
      <p className="text-slate-500 text-sm mb-8">Last updated: June 2026</p>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Use of Service</h2>
          <p>PetCost Calculator provides pet ownership cost estimates for informational purposes only. By using this service, you agree that the estimates provided are guides, not guarantees, and that actual costs will vary.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Accuracy Disclaimer</h2>
          <p>While we strive to maintain accurate and up-to-date cost data, we make no representations or warranties about the accuracy, completeness, or suitability of the information provided. Do not rely solely on our estimates for major financial decisions.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">No Professional Advice</h2>
          <p>Nothing on this site constitutes veterinary, financial, or professional advice. Always consult qualified professionals for decisions about your pet's health and your personal finances.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Limitation of Liability</h2>
          <p>PetCost Calculator shall not be liable for any losses or damages arising from your use of this service or reliance on the cost estimates provided.</p>
        </section>
      </div>
    </div>
  );
}

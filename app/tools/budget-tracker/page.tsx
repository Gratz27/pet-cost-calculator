import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BudgetTrackerClient from "./BudgetTrackerClient";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Pet Monthly Budget Tracker | PetCost-Calculator",
  description: "Set monthly budgets for food, vet, grooming, and more. Track your actual vs planned pet spending month by month.",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much should I budget per month for a pet?", acceptedAnswer: { "@type": "Answer", text: "Most dog owners spend $115–$285 a month and most cat owners $60–$140 a month once food, routine vet care, insurance, grooming, and supplies are included. Large or flat-faced breeds sit at the top of the range. Set aside a little extra each month for an emergency fund on top of these running costs." } },
    { "@type": "Question", name: "What pet expenses should I track?", acceptedAnswer: { "@type": "Answer", text: "Track food, routine vet care and preventatives, pet insurance, grooming, treats and toys, and any boarding or daycare. Keeping a separate line for an emergency fund helps you prepare for unexpected vet bills rather than being caught out." } },
    { "@type": "Question", name: "Why is my pet costing more than I expected?", acceptedAnswer: { "@type": "Answer", text: "The most commonly underestimated costs are insurance, professional grooming, parasite prevention, and boarding or dog walking. Emergency vet visits and the higher costs of the senior years also surprise many owners. Tracking actual versus planned spending each month is the quickest way to find where the money is going." } },
  ],
};

export default function BudgetTrackerPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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

        {/* Ad — below budget tracker */}
        <div className="my-8">
          <AdUnit slot="6193847205" format="horizontal" />
        </div>

        {/* SEO / educational content — server-rendered */}
        <div className="mt-8 bg-white border border-[#C8E6C9] rounded-xl p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How to Budget for a Pet</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              A good pet budget starts with the running costs you can predict and then adds a buffer for the ones
              you can&apos;t. The predictable side — food, insurance, routine vet care, grooming, and supplies —
              is steady month to month and easy to plan. The unpredictable side — an emergency vet visit, a
              chronic diagnosis, the rising costs of the senior years — is where most owners get caught out. The
              tracker above helps with the first part; a dedicated emergency fund handles the second.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Typical Monthly Pet Budget</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-[#C8E6C9] rounded-lg overflow-hidden">
                <thead className="bg-[#E8F5E9]">
                  <tr>
                    <th className="p-3 text-[#1B2B1B] font-semibold">Category</th>
                    <th className="p-3 text-[#1B2B1B] font-semibold">Dog / month</th>
                    <th className="p-3 text-[#1B2B1B] font-semibold">Cat / month</th>
                  </tr>
                </thead>
                <tbody className="text-[#5a7a5a]">
                  <tr className="border-t border-[#C8E6C9]"><td className="p-3">Food &amp; treats</td><td className="p-3">$40–$80</td><td className="p-3">$20–$45</td></tr>
                  <tr className="border-t border-[#C8E6C9]"><td className="p-3">Pet insurance</td><td className="p-3">$30–$70</td><td className="p-3">$15–$35</td></tr>
                  <tr className="border-t border-[#C8E6C9]"><td className="p-3">Routine vet &amp; preventatives</td><td className="p-3">$20–$40</td><td className="p-3">$12–$25</td></tr>
                  <tr className="border-t border-[#C8E6C9]"><td className="p-3">Grooming</td><td className="p-3">$0–$55</td><td className="p-3">$0–$15</td></tr>
                  <tr className="border-t border-[#C8E6C9]"><td className="p-3">Toys, supplies, litter</td><td className="p-3">$15–$40</td><td className="p-3">$15–$30</td></tr>
                  <tr className="border-t border-[#C8E6C9]"><td className="p-3 font-semibold text-[#1B2B1B]">Typical total</td><td className="p-3 font-semibold text-[#1B2B1B]">$115–$285</td><td className="p-3 font-semibold text-[#1B2B1B]">$60–$140</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#5a7a5a] leading-relaxed mt-4">
              These are running costs only. On top of them, aim to set aside an extra $20–$50 a month toward an
              emergency fund of $1,000–$3,000 — the buffer that keeps an unexpected vet bill from becoming a
              financial crisis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Why Tracking Actual vs Planned Spending Helps</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              Budgets drift. Treats, impulse toys, an extra grooming session, or a creeping food upgrade quietly
              push real spending above plan. Comparing what you budgeted against what you actually spent each
              month makes those drifts visible early, so you can adjust before they become a habit. It also
              builds an accurate picture of your pet&apos;s true cost — invaluable if you&apos;re deciding whether
              you can afford a second pet, a bigger breed, or a move to a higher-cost city.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Tips to Stay on Budget</h2>
            <ul className="text-[#5a7a5a] leading-relaxed space-y-2 list-disc pl-5">
              <li>Buy food and parasite prevention in bulk or by subscription to cut 20–30% off recurring costs.</li>
              <li>Learn basic grooming and nail trims at home between professional sessions.</li>
              <li>Keep your pet lean — it&apos;s the cheapest way to reduce long-term vet costs.</li>
              <li>Insure early so a big bill is a claim, not a crisis.</li>
              <li>Automate a small monthly transfer to a dedicated pet emergency fund.</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#5a7a5a] mb-3">Want a more precise estimate based on your breed?</p>
          <Link href="/calculator" className="btn-primary">Use the Full Calculator →</Link>
        </div>
      </div>
    </div>
  );
}

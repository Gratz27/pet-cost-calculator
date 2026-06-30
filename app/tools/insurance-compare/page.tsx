import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InsuranceCompareClient from "./InsuranceCompareClient";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Pet Insurance Comparison Guide 2026 | PetCost-Calculator",
  description: "Is pet insurance worth it? Compare pet insurance costs by breed and country. Filter by US, UK, or Australia to find the best provider for your pet.",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is pet insurance worth it?", acceptedAnswer: { "@type": "Answer", text: "For most owners, yes — pet insurance turns an unpredictable, potentially crippling vet bill into a manageable monthly cost. It's most worthwhile for breeds prone to expensive conditions and for owners without a large emergency fund. A single surgery or cancer diagnosis can cost several thousand pounds or dollars, far more than years of premiums." } },
    { "@type": "Question", name: "How much does pet insurance cost?", acceptedAnswer: { "@type": "Answer", text: "Typical premiums run $30–$70/month for dogs and $15–$35/month for cats, but vary widely by breed, age, location, and coverage level. Flat-faced breeds and large dogs cost the most to insure because of their higher claim likelihood." } },
    { "@type": "Question", name: "What does pet insurance cover?", acceptedAnswer: { "@type": "Answer", text: "Accident-and-illness policies cover unexpected injuries and illnesses, including diagnostics, surgery, hospitalisation, and medication, usually reimbursing 70–90% after your deductible. Routine care like vaccinations and check-ups is generally excluded unless you add a wellness plan, and pre-existing conditions are not covered." } },
    { "@type": "Question", name: "When should I get pet insurance?", acceptedAnswer: { "@type": "Answer", text: "As early as possible, while your pet is young and healthy. Once a condition appears it becomes pre-existing and is excluded from future cover, so insuring a puppy or kitten in the first weeks locks in the broadest protection at the lowest premium." } },
    { "@type": "Question", name: "What is the difference between lifetime and annual pet insurance?", acceptedAnswer: { "@type": "Answer", text: "Lifetime policies renew cover for ongoing conditions every year, so a chronic illness stays covered for life. Annual (time-limited) policies stop covering a condition after 12 months or once a payout cap is hit. Lifetime cover costs more but is far more valuable for breeds prone to chronic conditions." } },
  ],
};

export default function InsuranceComparePage() {
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
            <span className="text-[#1B2B1B] font-medium">Insurance Compare</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12 max-w-4xl">
          <div className="badge badge-blue mb-3">Insurance Guide</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-4">Pet Insurance Comparison 2026</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Filter by country and pet type to compare providers side-by-side. See what&apos;s covered, average monthly costs by breed, and which policy offers the best value.
          </p>
          <p className="text-xs text-slate-400 mt-4">Updated June 2026 · <span className="font-medium">Affiliate disclosure:</span> some links are affiliate links that help fund this site at no cost to you.</p>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl">
        <InsuranceCompareClient />

        {/* Ad — below insurance comparison */}
        <div className="my-8">
          <AdUnit slot="5038291746" format="horizontal" />
        </div>

        {/* SEO / educational content — server-rendered */}
        <div className="mt-8 bg-white border border-[#C8E6C9] rounded-xl p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Is Pet Insurance Worth It?</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              Pet insurance exists to do one thing: turn a large, unpredictable vet bill into a small,
              predictable monthly cost. Whether it&apos;s &quot;worth it&quot; depends on your finances and your
              pet. The case is strongest for breeds prone to expensive conditions — flat-faced breeds with
              airway problems, large breeds with joint disease, and breeds with high cancer rates — and for
              owners who couldn&apos;t comfortably absorb a sudden $3,000–$8,000 bill. A single emergency surgery
              or a cancer diagnosis can cost more than a decade of premiums, which is why most owners who&apos;ve
              faced one are glad they were covered. If you have a large emergency fund and a low-risk pet, you
              might reasonably choose to self-insure instead.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">What Pet Insurance Covers</h2>
            <p className="text-[#5a7a5a] leading-relaxed mb-3">
              Most policies are &quot;accident and illness&quot; cover. Understanding what&apos;s in and out is
              the key to choosing well:
            </p>
            <ul className="text-[#5a7a5a] leading-relaxed space-y-2 list-disc pl-5">
              <li><strong className="text-[#1B2B1B]">Usually covered:</strong> accidents and injuries, illnesses, diagnostics (bloodwork, X-rays, scans), surgery, hospitalisation, and prescription medication — typically reimbursed at 70–90% after your deductible.</li>
              <li><strong className="text-[#1B2B1B]">Usually optional (add-on):</strong> routine and wellness care such as vaccinations, dental cleaning, and flea/worming, via a separate wellness plan.</li>
              <li><strong className="text-[#1B2B1B]">Usually excluded:</strong> pre-existing conditions, elective procedures, and breeding costs. Some breeds also carry specific exclusions for known hereditary conditions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How Much Does Pet Insurance Cost?</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              As a rough guide, expect <strong>$30–$70 a month for a dog</strong> and <strong>$15–$35 a month
              for a cat</strong>, though premiums vary widely. The biggest drivers are breed (flat-faced and
              large breeds cost the most), age (premiums rise as pets get older), your location, and the
              coverage level you choose — your reimbursement percentage, annual limit, and deductible. Lower
              deductibles and higher limits raise the premium but reduce what you pay at claim time. The
              comparison tool above lets you filter by country and pet type to see typical figures for your
              situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Lifetime vs Annual Policies: The Most Important Choice</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              The single most important distinction is between lifetime and time-limited cover. A
              <strong> lifetime policy</strong> renews cover for ongoing conditions every year, so a chronic
              illness diagnosed at age three stays covered for the rest of your pet&apos;s life. A
              <strong> time-limited or maximum-benefit policy</strong> stops covering each condition after 12
              months or once a payout cap is reached — which is precisely when a chronic condition becomes
              expensive. Lifetime cover costs more up front but is far more valuable for any breed prone to
              long-term conditions. For most owners insuring a young pet, lifetime cover is the safer choice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How to Choose the Right Policy</h2>
            <ul className="text-[#5a7a5a] leading-relaxed space-y-2 list-disc pl-5">
              <li><strong className="text-[#1B2B1B]">Insure early</strong> — before any condition becomes pre-existing.</li>
              <li><strong className="text-[#1B2B1B]">Prefer lifetime cover</strong> for breeds prone to chronic or hereditary conditions.</li>
              <li><strong className="text-[#1B2B1B]">Check the annual limit</strong> is high enough to cover a major surgery (aim for a meaningful five-figure limit).</li>
              <li><strong className="text-[#1B2B1B]">Read the exclusions</strong> for your specific breed&apos;s known conditions.</li>
              <li><strong className="text-[#1B2B1B]">Balance premium vs deductible</strong> against what you could afford to pay at claim time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Does pet insurance cover pre-existing conditions?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">No. Any condition that showed signs before your policy started (or during a waiting period) is excluded. This is why insuring early, while your pet is healthy, matters so much.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Can I use any vet with pet insurance?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">In the US, UK, and Australia, most pet insurers let you use any licensed vet — you pay the bill and claim reimbursement afterwards, rather than being tied to a network.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Is it too late to insure an older pet?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">You can still insure older pets, but premiums are higher and any existing conditions are excluded. Some insurers also cap the age at which a new policy can start, so it&apos;s worth checking before you assume cover is available.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/calculator" className="btn-primary">Calculate My Full Pet Costs →</Link>
        </div>
      </div>
    </div>
  );
}

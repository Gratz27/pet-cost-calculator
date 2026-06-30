import type { Metadata } from "next";
import { Suspense } from "react";
import CalculatorClient from "@/components/Calculator/CalculatorClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pet Cost Calculator",
  url: "https://petcost-calculator.com/calculator",
  description: "Calculate the complete cost of owning a dog or cat. First-year costs, annual expenses, lifetime total, and hidden costs — personalised to your breed, location, and lifestyle.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "PetCost-Calculator", url: "https://petcost-calculator.com" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is the pet cost calculator free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes. The calculator is completely free, with no sign-up required, and you can run it as many times as you like for different breeds or scenarios." } },
    { "@type": "Question", name: "How accurate are the cost estimates?", acceptedAnswer: { "@type": "Answer", text: "Estimates are based on national average pricing for adoption fees, veterinary care, food, grooming, and insurance, adjusted for the breed you select and your location. Actual costs vary by region and individual pet, so use the results as a planning guide rather than an exact quote." } },
    { "@type": "Question", name: "Can I compare costs for more than one breed?", acceptedAnswer: { "@type": "Answer", text: "Yes. Run the calculator separately for each breed you are considering, or visit our breed comparison pages to see side-by-side cost breakdowns for popular dog and cat breeds." } },
    { "@type": "Question", name: "Does the calculator include pet insurance costs?", acceptedAnswer: { "@type": "Answer", text: "Yes. If you indicate you would like to budget for insurance, we include an estimated annual premium based on the breed's size and typical health risks, and you can explore real quotes on our insurance comparison tool." } },
    { "@type": "Question", name: "Does it cover the cost of a puppy or kitten as well as an adult?", acceptedAnswer: { "@type": "Answer", text: "Yes. The first-year results reflect the higher cost of raising a puppy or kitten, including the vaccination series, neutering, and setup supplies, while the annual figures reflect the steadier cost of an adult pet." } },
    { "@type": "Question", name: "Do the estimates work outside the US?", acceptedAnswer: { "@type": "Answer", text: "Yes. The calculator includes location options for the US, UK, and Australia, applying region-appropriate pricing so the estimate reflects local costs rather than a single-country average." } },
  ],
};

export const metadata: Metadata = {
  title: "Pet Cost Calculator – Personalised Cost Report",
  description: "Calculate the complete cost of owning a dog or cat. First-year costs, annual expenses, lifetime total, and hidden costs — personalised to your breed, location, and lifestyle.",
  alternates: { canonical: "https://petcost-calculator.com/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-[#5a7a5a]">Loading calculator…</div>}>
          <CalculatorClient />
        </Suspense>
      </div>

      {/* SEO content block — server-rendered so crawlers see real text */}
      <div className="container-xl max-w-4xl py-8">
        <div className="bg-white border border-[#C8E6C9] rounded-xl p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How the Pet Cost Calculator Works</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              Our calculator builds a personalised cost estimate in three quick steps. First, choose whether
              you&apos;re calculating for a dog or a cat, then select the specific breed (or closest match)
              from our database of 300+ breeds. Next, answer a short set of lifestyle and location questions
              — things like where you live, whether you plan to get pet insurance, and how you&apos;ll handle
              grooming. Finally, we generate a full cost report: first-year costs (adoption or purchase price,
              initial vet visits, supplies, and training), ongoing annual costs (food, routine vet care,
              grooming, insurance, and other supplies), and a lifetime cost projection based on the
              breed&apos;s typical lifespan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">What&apos;s Included in Your Results</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              Your personalised report includes a detailed cost breakdown table covering every major expense
              category, a 10-year cost projection chart so you can see how expenses compound over your
              pet&apos;s life, and tailored recommendations — including links to pet insurance comparisons
              and, where relevant, lower-cost breed alternatives with similar temperaments. All figures are
              based on current average pricing data and can vary depending on your location, the individual
              animal&apos;s health, and the choices you make around food quality, insurance coverage, and
              grooming frequency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How Much Does It Cost to Own a Dog or Cat?</h2>
            <p className="text-[#5a7a5a] leading-relaxed mb-4">
              Pet ownership costs fall into three buckets: the up-front first-year cost (which includes the
              purchase or adoption price and one-off setup), the ongoing annual cost, and the total lifetime
              cost over the animal&apos;s lifespan. The calculator personalises all three to your breed and
              location, but the typical ranges below show what most owners can expect as a starting point.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-[#C8E6C9] rounded-lg overflow-hidden">
                <thead className="bg-[#E8F5E9]">
                  <tr>
                    <th className="p-3 text-[#1B2B1B] font-semibold">Cost type</th>
                    <th className="p-3 text-[#1B2B1B] font-semibold">Typical dog</th>
                    <th className="p-3 text-[#1B2B1B] font-semibold">Typical cat</th>
                  </tr>
                </thead>
                <tbody className="text-[#5a7a5a]">
                  <tr className="border-t border-[#C8E6C9]">
                    <td className="p-3">First-year cost</td>
                    <td className="p-3">$1,500–$5,500</td>
                    <td className="p-3">$800–$2,500</td>
                  </tr>
                  <tr className="border-t border-[#C8E6C9]">
                    <td className="p-3">Annual ongoing cost</td>
                    <td className="p-3">$1,400–$3,400</td>
                    <td className="p-3">$700–$1,700</td>
                  </tr>
                  <tr className="border-t border-[#C8E6C9]">
                    <td className="p-3">Lifetime total</td>
                    <td className="p-3">$20,000–$55,000</td>
                    <td className="p-3">$10,000–$25,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#5a7a5a] leading-relaxed mt-4">
              Where you land within these ranges depends heavily on breed size, health predispositions,
              your location, and choices around insurance, food quality, and grooming. Large breeds and
              flat-faced breeds (such as French Bulldogs) sit at the top of every range, while smaller,
              healthier breeds and adopted pets sit near the bottom.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">What&apos;s Included in Pet Ownership Costs</h2>
            <p className="text-[#5a7a5a] leading-relaxed mb-3">
              A realistic pet budget goes well beyond food. The calculator accounts for every major category
              so nothing comes as a surprise:
            </p>
            <ul className="text-[#5a7a5a] leading-relaxed space-y-2 list-disc pl-5">
              <li><strong className="text-[#1B2B1B]">Purchase or adoption</strong> — breeder price or shelter fee (which often bundles in neutering and vaccinations).</li>
              <li><strong className="text-[#1B2B1B]">Initial setup</strong> — crate, bed, bowls, collar, lead, and toys for a new pet.</li>
              <li><strong className="text-[#1B2B1B]">Veterinary care</strong> — the puppy/kitten vaccination series, neutering, microchipping, annual check-ups, and parasite prevention.</li>
              <li><strong className="text-[#1B2B1B]">Food and treats</strong> — sized to the breed&apos;s weight and energy needs.</li>
              <li><strong className="text-[#1B2B1B]">Pet insurance</strong> — an estimated premium based on breed size and health risk.</li>
              <li><strong className="text-[#1B2B1B]">Grooming</strong> — from minimal for short-coated breeds to regular professional sessions for high-maintenance coats.</li>
              <li><strong className="text-[#1B2B1B]">Training</strong> — puppy classes and ongoing behavioural work, especially for high-drive breeds.</li>
              <li><strong className="text-[#1B2B1B]">Boarding and walking</strong> — paid care for when you travel or work long hours.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">How We Calculate Your Estimate</h2>
            <p className="text-[#5a7a5a] leading-relaxed">
              Every figure is built from current average pricing for each cost category, then adjusted for the
              specific breed you select (its size, typical lifespan, grooming needs, and known health risks)
              and for your location using region-specific multipliers on services like vet care, grooming, and
              boarding. Lifetime totals are projected across the breed&apos;s typical lifespan. The result is a
              planning estimate, not an exact quote — your real costs will depend on your individual pet and the
              choices you make. For a full explanation of our data sources and assumptions, see our{" "}
              <a href="/methodology" className="text-[#2E7D32] underline">methodology page</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1B2B1B] mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Is the calculator free to use?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">
                  Yes. The calculator is completely free, with no sign-up required, and you can run it as many
                  times as you like for different breeds or scenarios.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">How accurate are the cost estimates?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">
                  Estimates are based on national average pricing for adoption fees, veterinary care, food,
                  grooming, and insurance, adjusted for the breed you select. Actual costs will vary by region,
                  individual pet, and the quality of products and services you choose — use the results as a
                  planning guide rather than an exact quote.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Can I compare costs for more than one breed?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">
                  Yes. Run the calculator separately for each breed you&apos;re considering, or visit our{" "}
                  <a href="/compare" className="text-[#2E7D32] underline">
                    breed comparison pages
                  </a>{" "}
                  to see side-by-side cost breakdowns for popular dog and cat breeds.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Does the calculator include pet insurance costs?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">
                  Yes. If you indicate you&apos;d like to budget for insurance, we include an estimated annual
                  premium based on the breed&apos;s size and typical health risks, and you can explore real
                  quotes on our{" "}
                  <a href="/tools/insurance-compare" className="text-[#2E7D32] underline">
                    insurance comparison tool
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Does it cover the cost of a puppy or kitten as well as an adult?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">
                  Yes. The first-year results reflect the higher cost of raising a puppy or kitten — including
                  the vaccination series, neutering, and setup supplies — while the annual figures reflect the
                  steadier cost of an adult pet. The first year is almost always the most expensive.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2B1B] mb-1">Do the estimates work outside the US?</h3>
                <p className="text-[#5a7a5a] leading-relaxed">
                  Yes. The calculator includes location options for the US, UK, and Australia, applying
                  region-appropriate pricing so the estimate reflects local costs rather than a single-country
                  average.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}

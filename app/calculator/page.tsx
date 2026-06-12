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

export const metadata: Metadata = {
  title: "Pet Cost Calculator – Personalised Cost Report",
  description: "Calculate the complete cost of owning a dog or cat. First-year costs, annual expenses, lifetime total, and hidden costs — personalised to your breed, location, and lifestyle.",
};

export default function CalculatorPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}

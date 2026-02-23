import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Clock, Dog, Cat, PawPrint } from 'lucide-react';
import { Link } from 'wouter';
import CalculatorForm from '@/components/CalculatorFormNew';
import Results from '@/components/ResultsNew';
import FooterDisclaimer from '@/components/FooterDisclaimer';
import FAQ, { faqData } from '@/components/FAQ';
import SEO from '@/components/SEO';
import { trackButtonClick } from '@/lib/analytics';
import type { CalculatorInputs, CostBreakdown } from '@/lib/calculator';

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [results, setResults] = useState<CostBreakdown | null>(null);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);

  const handleCalculate = (calculatorInputs: CalculatorInputs, breakdown: CostBreakdown) => {
    setInputs(calculatorInputs);
    setResults(breakdown);
  };

  const handleRecalculate = () => {
    setResults(null);
    setShowCalculator(true);
  };

  if (results && inputs) {
    return <Results inputs={inputs} results={results} onRecalculate={handleRecalculate} />;
  }

  if (showCalculator) {
    return <CalculatorForm onCalculate={handleCalculate} />;
  }

  return (
    <>
      <SEO
        title="Pet Adoption Cost Reality Calculator - Free Pet Cost Estimator"
        description="Free pet cost calculator with breed-specific data. Get accurate estimates for adoption fees, vet care, food, grooming, and lifetime costs. Used by 50,000+ prospective pet owners."
        keywords="pet cost calculator, dog cost calculator, cat cost calculator, pet ownership costs, pet adoption costs, lifetime pet costs, petcost-calculator"
        canonical="https://petcost-calculator.com"
        isHomepage={true}
        faqSchema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
      <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">PetCost-Calculator.com</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find Out the True Lifetime Cost of Your Future Pet
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a personalized cost breakdown for any breed. Free, instant, and comprehensive—including the hidden expenses most people forget. <Link href="/how-it-works" className="text-primary hover:underline">Learn how it works</Link>.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => {
                trackButtonClick('Calculate Your Pet Costs', 'Hero Section');
                setShowCalculator(true);
              }}
            >
              Calculate Your Pet Costs
            </Button>
                  <p className="text-sm text-muted-foreground">Free tool for prospective pet owners worldwide</p>
          </div>
        </div>
      </section>

      {/* Introduction Content Section - AdSense Compliance */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Understanding the True Cost of Pet Ownership</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bringing a pet into your home is one of life's most rewarding experiences, but it's also a significant financial commitment that extends far beyond the initial adoption fee. Whether you're in London, Singapore, Sydney, or New York, the reality is the same: pet ownership involves substantial ongoing costs. Annual expenses typically range from £1,200-£2,000 in the UK, $2,000-$3,500 AUD in Australia, $2,500-$4,000 SGD in Singapore, or $1,500-$2,500 USD in the United States, depending on your pet's size and needs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many prospective pet owners underestimate the long-term financial responsibility, focusing primarily on upfront costs like adoption fees and initial supplies. The reality is that veterinary care, quality food, grooming, training, insurance, and unexpected medical emergencies add up significantly over your pet's lifetime. A large breed dog living 10-12 years could cost £15,000-£40,000 total in the UK, $25,000-$60,000 AUD in Australia, or $20,000-$55,000 USD in the US. Smaller breeds and cats typically cost less but still represent a substantial multi-year financial commitment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That's where our Pet Cost Calculator becomes a useful planning tool. We use breed-specific data, regional cost variations, and comprehensive expense categories to provide personalized estimates based on your location and circumstances. We factor in everything from routine vet visits and vaccinations to less obvious costs like pet deposits for rental properties, boarding fees during travel, and grooming requirements. By entering your postal code or ZIP code, you'll receive estimates adjusted for your region's typical costs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our goal is to help prospective pet owners make informed, responsible decisions by providing transparent, realistic cost projections. Understanding the financial commitment upfront leads to better outcomes for both pets and their families, reducing the number of animals surrendered to shelters due to unexpected expenses. This free tool is available to anyone worldwide who wants to understand what pet ownership will cost in their specific situation before making this important decision.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Dog className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Breed-Specific Data</h2>
              <p className="text-muted-foreground">
                Accurate cost estimates based on your chosen breed's size, grooming needs, and common health issues.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Hidden Costs Included</h2>
              <p className="text-muted-foreground">
                We account for expenses most calculators miss—pet deposits, boarding, furniture damage, and more.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Lifetime Projections</h2>
              <p className="text-muted-foreground">
                See the full financial picture with first-year, annual, and lifetime cost breakdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Use Our Calculator?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Make Informed Decisions</h3>
                  <p className="text-muted-foreground">
                    Understand the financial commitment before bringing a pet home to ensure you can provide the best care.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Plan Your Budget</h3>
                  <p className="text-muted-foreground">
                    Get a clear picture of monthly and annual expenses to budget effectively for your new family member.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Dog className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Compare Breeds</h3>
                  <p className="text-muted-foreground">
                    See how costs vary between different breeds to find the perfect match for your lifestyle and budget.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cat className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Avoid Surprises</h3>
                  <p className="text-muted-foreground">
                    Learn about hidden costs like emergency vet visits and pet deposits that often catch owners off guard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-semibold">PetCost-Calculator.com</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <p className="text-sm text-muted-foreground">
                © 2025 PetCost-Calculator.com. Helping pet owners make informed decisions.
              </p>
            </div>
          </div>
          <FooterDisclaimer />
        </div>
      </footer>
    </div>
    </>
  );
}

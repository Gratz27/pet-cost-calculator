import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Clock, Dog, Cat, PawPrint } from 'lucide-react';
import { Link } from 'wouter';
import CalculatorForm from '@/components/CalculatorFormNew';
import Results from '@/components/ResultsNew';
import FooterDisclaimer from '@/components/FooterDisclaimer';
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
              Get a personalized cost breakdown for any breed. Free, instant, and comprehensive—including the hidden expenses most people forget.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => setShowCalculator(true)}
            >
              Calculate Your Pet Costs
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Used by 50,000+ prospective pet owners
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Dog className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Breed-Specific Data</h3>
              <p className="text-muted-foreground">
                Accurate cost estimates based on your chosen breed's size, grooming needs, and common health issues.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hidden Costs Included</h3>
              <p className="text-muted-foreground">
                We account for expenses most calculators miss—pet deposits, boarding, furniture damage, and more.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lifetime Projections</h3>
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
                  <p className="text-muted-foreground text-sm">
                    Understand the true financial commitment before adopting to avoid surprises and ensure you can provide the best care.
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
                  <h3 className="font-semibold mb-2">Compare Breeds</h3>
                  <p className="text-muted-foreground text-sm">
                    Explore different breeds to find one that fits your budget and lifestyle without compromising on quality of care.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Budget Confidently</h3>
                  <p className="text-muted-foreground text-sm">
                    Plan your finances with detailed breakdowns of one-time and recurring costs over your pet's lifetime.
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
                  <h3 className="font-semibold mb-2">Trusted by Shelters</h3>
                  <p className="text-muted-foreground text-sm">
                    Partnered with animal shelters nationwide to help prospective owners make responsible adoption decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Calculate Your Pet Costs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get your personalized estimate in less than 2 minutes.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => setShowCalculator(true)}
            >
              Start Free Calculation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-semibold">PetCost-Calculator.com</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PetCost-Calculator.com. Helping pet owners make informed decisions.
            </p>
          </div>
          <FooterDisclaimer />
        </div>
      </footer>
    </div>
  );
}


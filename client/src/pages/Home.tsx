import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Clock, Dog, Cat, PawPrint } from 'lucide-react';
import { Link } from 'wouter';
import CalculatorForm from '@/components/CalculatorFormNew';
import Results from '@/components/ResultsNew';
import FooterDisclaimer from '@/components/FooterDisclaimer';
import FAQ from '@/components/FAQ';
import AdSense from '@/components/AdSense';
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
            <p className="text-sm text-muted-foreground mt-4">
              Used by 50,000+ prospective pet owners
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Content Section - AdSense Compliance */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Understanding the True Cost of Pet Ownership</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bringing a pet into your home is one of life's most rewarding experiences, but it's also a significant financial commitment that extends far beyond the initial adoption fee. According to the American Pet Products Association, Americans spent over $136 billion on their pets in 2022, with the average dog owner spending between $1,500 to $2,500 annually on their furry companion. However, these figures often don't tell the complete story of what pet ownership truly costs over a lifetime.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many prospective pet owners underestimate the long-term financial responsibility, focusing primarily on the upfront costs like adoption fees and initial supplies. The reality is that veterinary care, quality food, grooming, training, pet insurance, and unexpected medical emergencies can add up to tens of thousands of dollars over your pet's lifetime. A large breed dog living 10-12 years could cost anywhere from $20,000 to $55,000 in total expenses, while smaller breeds and cats typically range from $15,000 to $35,000.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That's where our Pet Adoption Cost Reality Calculator becomes an invaluable tool. Unlike generic pet cost calculators that provide rough estimates, our calculator uses breed-specific data, regional cost variations, and comprehensive expense categories to give you an accurate, personalized breakdown of what you can expect to spend. We factor in everything from routine vet visits and vaccinations to less obvious costs like pet deposits for rental properties, boarding fees for vacations, and even the wear and tear on your furniture and belongings.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our mission is simple: to help prospective pet owners make informed, responsible decisions by providing transparent, realistic cost projections. We believe that understanding the financial commitment upfront leads to better outcomes for both pets and their families, reducing the heartbreaking number of animals surrendered to shelters due to unexpected expenses. With over 50,000 users and partnerships with animal shelters nationwide, we're proud to be the most trusted resource for pet cost planning.
            </p>
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

      {/* How Our Calculator Works - Detailed Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">How Our Pet Cost Calculator Delivers Accurate Estimates</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our calculator stands apart from basic pet cost estimators by incorporating comprehensive, breed-specific data collected from veterinarians, pet insurance companies, and thousands of real pet owners. When you enter your chosen breed, location, and lifestyle preferences, our algorithm analyzes over 50 different cost factors to generate a personalized financial projection that reflects your unique situation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The calculation process takes just two minutes and covers eight essential categories: initial adoption costs, first-year setup expenses, routine veterinary care, food and treats, grooming and maintenance, training and socialization, pet insurance or emergency funds, and miscellaneous expenses like toys, boarding, and replacement items. Each category is adjusted based on your pet's breed size, coat type, common health issues, and your geographic location, since costs can vary dramatically between rural and urban areas.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What makes our calculator particularly valuable is its inclusion of hidden costs that catch many new pet owners off guard. These include pet deposits and monthly pet rent for apartment dwellers (averaging $200-$500 deposits and $25-$50 monthly), professional dog walking or daycare services for working owners ($15-$30 per day), travel costs including boarding or pet-sitting ($25-$75 per day), and home repairs from chewing, scratching, or accidents that can total hundreds or thousands of dollars over time.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The results provide three critical views of your financial commitment: first-year costs (typically the highest due to initial setup), average annual costs for subsequent years, and total lifetime costs based on your pet's expected lifespan. This comprehensive breakdown empowers you to budget effectively, compare different breeds within your financial comfort zone, and make confident decisions about pet insurance, emergency funds, and long-term financial planning for your future companion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
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

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expert Pet Care Guides & Tips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive guides on pet costs, breed-specific information, and money-saving tips.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/blog/golden-retriever-lifetime-costs" className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <img 
                  src="/blog-images/golden-retriever.jpg" 
                  alt="Golden Retriever Cost Guide"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Breed Guide</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    Golden Retriever Lifetime Costs
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete breakdown of Golden Retriever ownership costs from puppyhood to senior years.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/blog/budget-friendly-pet-care-tips" className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <img 
                  src="/blog-images/budget-pet-care.jpg" 
                  alt="Budget Pet Care Tips"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Cost-Saving Tips</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    15 Budget-Friendly Pet Care Tips
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Save money on pet care without compromising quality or your pet's happiness.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/blog/dog-vs-cat-costs" className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <img 
                  src="/blog-images/dog-vs-cat.jpg" 
                  alt="Dog vs Cat Costs"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Comparison</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    Dog vs Cat: Which Costs More?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive cost comparison to help you choose the right pet for your budget.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Ad Section - Content-rich page */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <AdSense />
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


import { PawPrint, CheckCircle2, TrendingUp, Download, Share2, Calculator, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import AdSense from '@/components/AdSense';

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="How Our Pet Cost Calculator Works - Step-by-Step Guide"
        description="Learn how to use our free pet cost calculator to get accurate breed-specific estimates for adoption fees, vet care, food, grooming, and lifetime pet ownership costs in 8 simple steps."
        keywords="how pet cost calculator works, pet cost estimator guide, calculate pet expenses, pet budgeting steps"
        breadcrumbs={[
          { name: "Home", url: "https://petcost-calculator.com" },
          { name: "How It Works", url: "https://petcost-calculator.com/how-it-works" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get accurate, personalized pet cost estimates in 8 simple steps. No signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Choose Your Pet Type</h3>
                  <p className="text-lg text-muted-foreground">
                    Select whether you're considering a dog or cat. Each has different cost profiles based on size, care needs, and lifespan. <Link href="/" className="text-primary hover:underline">Start your calculation</Link>.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Select Your Breed</h3>
                  <p className="text-lg text-muted-foreground">
                    Choose from 32 dog breeds or 11 cat breeds, including specific varieties like English Bulldog, French Bulldog, etc. Our database includes breed-specific cost data for accurate estimates.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Enter Your Location</h3>
                  <p className="text-lg text-muted-foreground">
                    Provide your postal/ZIP code. We'll verify your location and adjust cost estimates based on regional price differences for vet care, grooming, and services.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Describe Your Living Situation</h3>
                  <p className="text-lg text-muted-foreground">
                    Tell us if you own or rent, and whether you're in an apartment or house. This helps us account for pet deposits and space-related costs.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Provide Initial Cost Details</h3>
                  <p className="text-lg text-muted-foreground">
                    Enter your actual adoption/purchase fee, decide on pet insurance, training plans, and initial vet care budget. If you don't know exact costs, we'll use breed averages.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  6
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Share Your Lifestyle</h3>
                  <p className="text-lg text-muted-foreground">
                    Tell us about your work schedule, travel frequency, and activity level. This helps estimate costs for daycare, boarding, and exercise-related needs.
                  </p>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  7
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Select Ongoing Services</h3>
                  <p className="text-lg text-muted-foreground">
                    Choose your food type (premium or standard), grooming frequency, daycare needs, and dental care preferences. These choices directly impact your annual costs.
                  </p>
                </div>
              </div>

              {/* Step 8 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  8
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Review & Calculate</h3>
                  <p className="text-lg text-muted-foreground">
                    Review all your inputs in a summary screen. Make any changes needed, then hit "Calculate My Costs" to see your personalized breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* What You Get Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 text-center">What You'll Get</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-lg p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">First-Year Cost Breakdown</h3>
                  <p className="text-muted-foreground">
                    See exactly what you'll spend in year one, including adoption fee, initial vet care, supplies, training, insurance, food, and grooming—with interactive pie chart visualization.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Annual Ongoing Costs</h3>
                  <p className="text-muted-foreground">
                    Understand your recurring expenses for food, vet care, grooming, insurance, and supplies—with bar chart showing cost distribution.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Lifetime Projection</h3>
                  <p className="text-muted-foreground">
                    See the total cost over your pet's expected lifespan, plus recommended emergency fund amount for unexpected expenses.
                  </p>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Hidden Costs Alert</h3>
                  <p className="text-muted-foreground">
                    Learn about often-overlooked expenses like boarding, furniture damage, cleaning supplies, and pet deposits that many calculators miss.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Calculate your personalized pet costs in less than 2 minutes. <Link href="/about" className="text-primary hover:underline">Learn more about us</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> with questions.
              </p>
              <Link href="/">
                <Button size="lg" className="text-lg px-8">
                  Start Free Calculation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section - Content-rich page */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <AdSense />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold">PetCost-Calculator.com</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PetCost-Calculator.com. Helping pets find forever homes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


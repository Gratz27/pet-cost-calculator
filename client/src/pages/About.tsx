import { PawPrint, Heart, Target, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import AdSense from '@/components/AdSense';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="About Pet Cost Calculator - Helping Pet Owners Budget Wisely"
        description="Learn about PetCost-Calculator.com and our mission to help prospective pet owners make informed financial decisions about pet adoption and ownership costs."
        keywords="about pet cost calculator, pet budgeting tool, pet ownership planning, responsible pet adoption"
        breadcrumbs={[
          { name: "Home", url: "https://petcost-calculator.com" },
          { name: "About", url: "https://petcost-calculator.com/about" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              About Pet Cost Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Helping prospective pet owners make informed, responsible adoption decisions through transparent cost information.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Heart className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that every pet deserves a loving, stable home—and every prospective owner deserves to know the true financial commitment before adopting. Our mission is to reduce pet surrenders by providing transparent, accurate <Link href="/" className="text-primary hover:underline">cost information</Link> that helps people make responsible decisions.
                </p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Why We Built This</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Too many pets are surrendered to shelters because owners didn't anticipate the full cost of ownership. We created this <Link href="/how-it-works" className="text-primary hover:underline">calculator</Link> to shine a light on both obvious and hidden expenses—from adoption fees to emergency vet care—so families can plan confidently and commit for life.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-card border rounded-lg p-8 md:p-12 mb-16">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">294</div>
                  <p className="text-muted-foreground">Dog & Cat Breeds</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Global</div>
                  <p className="text-muted-foreground">Regional Cost Adjustments</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Free & No Registration</p>
                </div>
              </div>
            </div>

            {/* Detailed Story Section - AdSense Compliance */}
            <div className="prose prose-lg max-w-none mb-16">
              <h2 className="text-3xl font-bold mb-6">Why Pet Cost Calculator Exists</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pet Cost Calculator was created to address a critical gap in pet adoption resources: transparent, comprehensive cost information. Around the world, pets are surrendered to shelters every year because owners didn't fully understand the financial commitment involved. Whether you're in London, Singapore, Sydney, or New York, the reality is the same—pet ownership comes with significant ongoing expenses that extend far beyond the initial adoption fee. We believe prospective pet owners deserve access to realistic cost estimates before making this life-changing decision.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This calculator is designed as a free educational tool to help you understand the full financial picture of pet ownership in your specific region. We've built a system that considers breed characteristics, regional cost variations, and lifestyle factors to provide personalized estimates. While we can't predict every expense you'll encounter, our goal is to give you a realistic starting point for budgeting and financial planning. We want to help reduce the number of pets surrendered due to unexpected costs by ensuring prospective owners go in with their eyes open.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What makes this tool useful is its focus on transparency and detail. We break down expenses by category—from food and veterinary care to grooming, training, and supplies—so you can see exactly where your money will go. We also highlight often-overlooked costs like pet deposits for renters, boarding during travel, and emergency veterinary care. Whether you're considering a small cat or a large breed dog, our calculator helps you understand the specific financial implications of your choice based on your location and lifestyle.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This is a free resource available to anyone, anywhere in the world who wants to make an informed decision about pet ownership. We don't require registration, we don't sell your data, and we don't have hidden agendas. Our mission is simple: provide accessible, honest cost information to help prospective pet owners budget responsibly, leading to better outcomes for both pets and their families. Every pet deserves a stable, loving home, and every owner deserves to know what they're committing to financially.
              </p>
            </div>

            {/* Methodology Section */}
            <div className="prose prose-lg max-w-none mb-16">
              <h2 className="text-3xl font-bold mb-6">How Our Calculator Works</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our calculator uses publicly available data and research on pet ownership costs to generate estimates. We've compiled information from veterinary associations, pet insurance companies, pet care industry reports, and published surveys of pet owners to build a comprehensive database of typical expenses. The calculator considers factors like breed size, grooming requirements, expected lifespan, and common health issues to provide breed-specific projections. We aim to give you a realistic range of costs rather than exact figures, since every pet and owner's situation is unique.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Regional cost variations are significant when it comes to pet ownership. Veterinary care in London or Singapore costs substantially more than in rural areas, while grooming services in Sydney may be priced differently than in Manchester or Auckland. When you enter your postal code or ZIP code, our system attempts to adjust cost estimates based on general regional cost-of-living data. These adjustments are approximations—actual costs in your specific area may vary depending on your choice of veterinarian, groomer, and service providers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The calculator also accounts for lifestyle factors you provide, such as whether you rent or own your home, your work schedule, and your travel frequency. These details help estimate costs like pet deposits, daycare, and boarding. We break down expenses into categories—initial costs, annual recurring expenses, and lifetime projections—so you can see where your money will go over time. Remember that these are estimates based on typical scenarios; your actual costs may be higher or lower depending on your pet's health, your choices, and unexpected circumstances.
              </p>
            </div>

            {/* Values Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <p className="text-muted-foreground">
                    We show you exactly how costs are calculated and what factors influence them. No hidden agendas, no surprises.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
                  <p className="text-muted-foreground">
                    Our estimates are based on real-world data from veterinarians, pet owners, and industry research.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-muted-foreground">
                    This tool is completely free and requires no signup. Everyone deserves access to this information.
                  </p>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Compassion</h3>
                  <p className="text-muted-foreground">
                    We support responsible pet ownership and work with shelters to help more pets find forever homes.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Calculate Your Pet Costs?</h2>
              <p className="text-muted-foreground mb-6">
                Get your personalized estimate in less than 2 minutes. <Link href="/how-it-works" className="text-primary hover:underline">Learn how it works</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> with questions.
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
              © 2025 PetCost-Calculator.com. Helping pet owners make informed decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


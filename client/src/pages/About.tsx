import { PawPrint, Heart, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2">
                <PawPrint className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">PetCost-Calculator.com</span>
              </a>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about">
                <a className="text-sm font-medium text-foreground transition-colors">
                  About
                </a>
              </Link>
              <Link href="/how-it-works">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

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
                  We believe that every pet deserves a loving, stable home—and every prospective owner deserves to know the true financial commitment before adopting. Our mission is to reduce pet surrenders by providing transparent, accurate cost information that helps people make responsible decisions.
                </p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Why We Built This</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Too many pets are surrendered to shelters because owners didn't anticipate the full cost of ownership. We created this calculator to shine a light on both obvious and hidden expenses—from adoption fees to emergency vet care—so families can plan confidently and commit for life.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-card border rounded-lg p-8 md:p-12 mb-16">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                  <p className="text-muted-foreground">Calculations Completed</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">38</div>
                  <p className="text-muted-foreground">Breeds Covered</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Free to Use</p>
                </div>
              </div>
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
                Get your personalized estimate in less than 2 minutes.
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


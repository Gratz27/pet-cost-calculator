import Header from '@/components/Header';
import SEO from '@/components/SEO';
import CostMap from '@/components/CostMap';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function CostMapPage() {
  return (
    <>
      <SEO
        title="Interactive Pet Cost Map - Local Vet & Service Prices"
        description="Explore estimated veterinary and pet service costs in your area. Compare prices for exams, vaccines, spay/neuter, and dental cleaning across different regions."
        keywords="pet cost map, vet prices by city, dog spay cost map, cat neuter cost map, veterinary fees usa, veterinary fees uk, veterinary fees australia"
        canonical="https://petcost-calculator.com/cost-map"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-grow container py-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4 pl-0 hover:pl-2 transition-all">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Calculator
                </Link>
              </Button>
              
              <h1 className="text-4xl font-bold mb-4">Regional Pet Cost Heatmap</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Veterinary and pet service costs vary significantly by location. Use our interactive map to explore estimated price ranges for common procedures in major cities.
              </p>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-1 mb-12">
              <CostMap />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-muted/30 p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">High Cost Areas</h3>
                <p className="text-sm text-muted-foreground">
                  Major metropolitan areas like New York, San Francisco, and London typically have 30-50% higher veterinary fees due to higher real estate and labor costs.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">Rural vs. Urban</h3>
                <p className="text-sm text-muted-foreground">
                  Rural clinics often charge less for routine care but may refer complex cases to urban specialists, which can add travel costs to your budget.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-2">Emergency Care</h3>
                <p className="text-sm text-muted-foreground">
                  Emergency clinics operate 24/7 and typically charge 2-3x more than regular daytime clinics. Always keep an emergency fund ready.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Want a Personalized Estimate?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our main calculator factors in your specific breed, age, and location to give you a detailed lifetime cost projection.
              </p>
              <Button size="lg" asChild>
                <Link href="/">Go to Cost Calculator</Link>
              </Button>
            </div>
          </div>
        </main>

        <footer className="border-t py-8 bg-muted/30 text-center text-sm text-muted-foreground">
          <div className="container">
            <p>© 2025 PetCost-Calculator.com. Map data © OpenStreetMap contributors.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

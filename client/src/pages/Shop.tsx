import Header from '@/components/Header';
import SEO from '@/components/SEO';
import ProductList from '@/components/ProductList';

export default function Shop() {

  return (
    <>
      <SEO 
        title="Curated Pet Essentials - PetCost Calculator Shop"
        description="Shop our hand-picked selection of high-quality pet essentials. From orthopedic beds to professional grooming kits, find the best value for your pet."
        canonical="https://www.petcost-calculator.com/shop"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-grow container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Pet Essentials</h1>
              <p className="text-muted-foreground max-w-2xl">
                Curated products to help you manage costs without compromising on quality.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-primary/10 border border-primary/20 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">🐾 New Pet Parent Starter Kit</h2>
              <p className="text-muted-foreground text-sm">Everything you need for your new dog or cat — curated for value and longevity.</p>
            </div>
            <a
              href="https://shop.petcost-calculator.com/collections/new-pet-parent-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Shop the Kit →
            </a>
          </div>

          <ProductList />
        </main>
      </div>
    </>
  );
}

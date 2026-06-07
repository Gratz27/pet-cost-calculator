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

          <ProductList />
        </main>
      </div>
    </>
  );
}

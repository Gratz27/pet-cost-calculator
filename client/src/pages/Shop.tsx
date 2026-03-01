import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { CartDrawer } from '@/components/CartDrawer';
import { useCart } from '@/contexts/CartContext';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { setIsCartOpen, totalItems } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <>
      <SEO 
        title="Curated Pet Essentials - PetCost Calculator Shop"
        description="Shop our hand-picked selection of high-quality pet essentials. From orthopedic beds to professional grooming kits, find the best value for your pet."
        keywords="pet shop, dog beds, cat toys, grooming supplies, pet essentials"
        canonical="https://petcost-calculator.com/shop"
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
            
            <Button 
              onClick={() => setIsCartOpen(true)} 
              className="relative"
              variant="outline"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8 sticky top-20 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search essentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or category filter.
              </p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </main>

        <CartDrawer />
      </div>
    </>
  );
}

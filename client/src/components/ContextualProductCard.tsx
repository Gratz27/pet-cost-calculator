import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { getProducts, createCheckout } from '@/lib/shopify';
import { toast } from 'sonner';

interface ContextualProductCardProps {
  category: string;
  searchQuery: string;
}

export default function ContextualProductCard({ category, searchQuery }: ContextualProductCardProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // Fetch products and try to find one that matches the search query
        const products = await getProducts();
        
        // Simple matching logic: find a product whose title or tags match the query
        const matchedProduct = products.find((p: any) => {
          if (!p || !p.title) return false;
          const titleMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
          const tagMatch = p.tags && Array.isArray(p.tags) && p.tags.some((tag: string) => 
            tag && typeof tag === 'string' && tag.toLowerCase() === searchQuery.toLowerCase()
          );
          return titleMatch || tagMatch;
        });

        // If no exact match, just use the first product as a fallback for demonstration
        setProduct(matchedProduct || products[0]);
      } catch (error) {
        console.error('Error fetching contextual product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [searchQuery]);

  const handleBuyNow = async () => {
    if (!product || !product.variants || product.variants.length === 0) return;
    
    try {
      setCheckingOut(true);
      const variantId = product.variants[0].id;
      const checkoutUrl = await createCheckout(variantId, 1);
      
      if (checkoutUrl) {
        // Open checkout in a new tab to avoid iframe/security issues
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
      } else {
        toast.error('Failed to generate checkout link');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout');
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4 mt-2 bg-muted/30 flex items-center justify-center min-h-[100px]">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!product) return null;

  return (
    <Card className="p-4 mt-2 bg-gradient-to-r from-primary/5 to-transparent border-primary/20 flex flex-col sm:flex-row items-center gap-4">
      <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-white border border-border">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0].url} 
            alt={product.images[0].altText || product.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
            No image
          </div>
        )}
      </div>
      
      <div className="flex-grow text-center sm:text-left">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          Recommended for {category}
        </div>
        <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h4>
        <div className="font-bold text-sm">
          {product.priceRange?.minVariantPrice?.amount 
            ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
            : 'Price unavailable'}
        </div>
      </div>
      
      <Button 
        onClick={handleBuyNow} 
        disabled={checkingOut}
        size="sm"
        className="w-full sm:w-auto shrink-0 gap-2"
      >
        {checkingOut ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
        Buy Now
      </Button>
    </Card>
  );
}

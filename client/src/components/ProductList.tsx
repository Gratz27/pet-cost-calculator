import { useEffect, useState } from "react";
import { getProducts } from "@/lib/shopify";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No products found. Please check your Shopify store.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(({ node: product }) => {
        const price = product.priceRange.minVariantPrice;
        const image = product.images.edges[0]?.node;

        return (
          <Card key={product.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square relative overflow-hidden bg-muted">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText || product.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <CardContent className="flex-grow p-4">
              <h3 className="font-semibold text-lg line-clamp-2 mb-2">{product.title}</h3>
              <p className="text-muted-foreground font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(parseFloat(price.amount))}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                className="flex-1 gap-2"
                onClick={() => {
                  const variantId = product.variants?.edges[0]?.node.id;
                  addItem({
                    id: product.id,
                    name: product.title,
                    description: product.description || '',
                    price: parseFloat(price.amount),
                    category: 'essentials',
                    image: image?.url || '',
                    rating: 0,
                    reviews: 0,
                    shopifyVariantId: variantId,
                  });
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Link href={`/products/${product.handle}`}>
                <Button variant="outline" size="icon" title="View product details">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

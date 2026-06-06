import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { getProduct, createCheckout } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProductPage() {
  const [match, params] = useRoute("/products/:handle");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (params?.handle) {
        try {
          const fetchedProduct = await getProduct(params.handle);
          setProduct(fetchedProduct);
          if (fetchedProduct?.images?.edges?.length > 0) {
            setActiveImage(fetchedProduct.images.edges[0].node.url);
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProduct();
  }, [params?.handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link href="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const price = product.priceRange.minVariantPrice;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-xl bg-muted border">
            {activeImage ? (
              <img
                src={activeImage}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>
          
          {product.images.edges.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.edges.map(({ node: image }: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(image.url)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === image.url ? "border-primary" : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
          
          <div className="text-2xl font-semibold text-primary mb-6">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(parseFloat(price.amount))}
          </div>

          <div className="prose prose-sm sm:prose-base max-w-none mb-8 text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          <div className="mt-auto pt-8 border-t">
            <Button 
              size="lg" 
              className="w-full md:w-auto text-lg px-8"
              disabled={isCheckingOut}
              onClick={async () => {
                setIsCheckingOut(true);
                try {
                  const variantId = product.variants.edges[0]?.node.id;
                  if (variantId) {
                    const checkoutUrl = await createCheckout([{ variantId, quantity: 1 }]);
                    if (checkoutUrl) {
                      // Open checkout in a new tab to avoid iframe/security issues
                      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      alert("Failed to create checkout session. Please try again.");
                    }
                  }
                } catch (error) {
                  console.error("Checkout error:", error);
                  alert("An error occurred during checkout.");
                } finally {
                  setIsCheckingOut(false);
                }
              }}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Now"
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
              You will be redirected to our secure checkout to complete your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="space-y-2">
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? "Your cart is currently empty." 
              : `You have ${items.length} item${items.length === 1 ? '' : 's'} in your cart.`}
          </SheetDescription>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 my-4">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="h-24 w-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-medium line-clamp-2">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border rounded-md p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-accent rounded-sm"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-accent rounded-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t mt-auto">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Shipping and taxes calculated at checkout.
              </p>
              <Button className="w-full size-lg text-lg" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-muted/50 p-6 rounded-full">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-muted-foreground max-w-xs">
              Looks like you haven't added any essentials yet. Browse our curated collection to find the best for your pet.
            </p>
            <Button onClick={() => setIsCartOpen(false)} className="mt-4">
              Start Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

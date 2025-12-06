import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StorefrontCart() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updated);
    localStorage.setItem('sf_cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const removeItem = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('sf_cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('sf_cart', JSON.stringify([]));
    setTotal(0);
  };

  const shipping = total > 50 ? 0 : 10;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  return (
    <div className="w-full px-4 py-16 md:max-w-7xl md:mx-auto">
      {cart.length > 0 ? (
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-5xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Shopping Cart</h1>
            <p className="text-lg text-muted-foreground">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <Card key={item.id} className="p-6 border-0 shadow-sm hover:shadow-md transition">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.category}</p>
                      <p className="text-2xl font-bold text-purple-600">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-4 items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                      <div className="flex items-center gap-3 bg-muted px-3 py-2 rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-lg font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full h-12 text-base mt-6" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-8 border-0 shadow-sm sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Order Summary</h2>

                <div className="space-y-3 pb-6 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₦${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-semibold">₦{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold text-purple-600">₦{finalTotal.toLocaleString()}</span>
                  </div>
                  {total > 50 && (
                    <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      ✓ Free shipping applied!
                    </p>
                  )}
                </div>

                <Button
                  className="w-full h-12 text-base gap-2"
                  onClick={() => window.location.href = '/storefront/checkout'}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => window.location.href = '/storefront/products'}
                >
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 space-y-6">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-20" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Your cart is empty</h2>
            <p className="text-lg text-muted-foreground">Start shopping to add items to your cart</p>
          </div>
          <Button
            size="lg"
            className="h-12 px-8 text-base gap-2 mx-auto"
            onClick={() => window.location.href = '/storefront/products'}
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

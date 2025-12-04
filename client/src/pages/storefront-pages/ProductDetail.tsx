import { useState } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Star, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const allProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 201495, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium comfort.' },
  { id: 2, name: 'Smart Watch Pro', price: 387485, rating: 4.9, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', description: 'Advanced smartwatch with health tracking, fitness modes, and seamless connectivity.' },
  { id: 3, name: 'Portable Speaker Max', price: 139485, rating: 4.7, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', description: 'Compact portable speaker with 360° sound and waterproof design.' },
  { id: 4, name: 'Premium USB-C Cable', price: 38735, rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'Durable USB-C cable with fast charging support up to 100W.' },
  { id: 5, name: 'Wireless Charging Pad', price: 78945, rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'Fast wireless charging pad compatible with all Qi-enabled devices.' },
  { id: 6, name: 'USB Hub Pro', price: 56735, rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'Multi-port USB hub with high-speed data transfer.' },
  { id: 7, name: 'Screen Protector Set', price: 28945, rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'Tempered glass screen protectors for maximum device protection.' },
  { id: 8, name: 'Phone Mount Stand', price: 35485, rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'Adjustable phone mount stand for hands-free viewing.' },
  { id: 9, name: 'Bluetooth Earbuds', price: 145295, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', description: 'True wireless earbuds with premium sound and active noise cancellation.' },
  { id: 10, name: 'Power Bank 30000mAh', price: 89365, rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'High-capacity power bank with fast charging technology.' },
  { id: 11, name: 'Laptop Stand Aluminum', price: 125485, rating: 4.9, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop', description: 'Premium aluminum laptop stand for ergonomic workspace setup.' },
  { id: 12, name: 'Keyboard Mechanical', price: 185945, rating: 4.6, image: 'https://images.unsplash.com/photo-1587829191301-2a38e75e0f51?w=400&h=400&fit=crop', description: 'Professional mechanical keyboard with customizable switches.' },
  { id: 13, name: 'Gaming Mouse Pro', price: 98765, rating: 4.8, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop', description: 'High-precision gaming mouse with programmable buttons.' },
  { id: 14, name: 'Webcam 4K Ultra', price: 156485, rating: 4.7, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop', description: '4K webcam with auto-focus and built-in microphone.' },
];

export default function ProductDetail() {
  const [match, params] = useRoute('/storefront/product/:id');
  const productId = params?.id ? parseInt(params.id) : null;
  const product = productId ? allProducts.find(p => p.id === productId) : null;

  const addToCart = (product: typeof allProducts[0]) => {
    const cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('sf_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    toast.success('Added to cart!');
  };

  if (!match || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="md:hidden px-4 py-4 pb-32">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
        data-testid="button-back"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back</span>
      </button>

      {/* Product Image */}
      <div className="w-full h-80 rounded-lg overflow-hidden mb-6 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          data-testid="img-product"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Title */}
        <h1
          className="text-2xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: 'Plus Jakarta Sans' }}
          data-testid="text-product-name"
        >
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground" data-testid="text-rating">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Price</p>
          <p className="text-3xl font-bold text-purple-600" data-testid="text-price">
            ₦{product.price.toLocaleString()}
          </p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed" data-testid="text-description">
            {product.description}
          </p>
        </div>

        {/* Features (mock) */}
        <div>
          <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Features
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold mt-1">✓</span>
              <span className="text-sm text-gray-700">Premium quality materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold mt-1">✓</span>
              <span className="text-sm text-gray-700">30-day money-back guarantee</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold mt-1">✓</span>
              <span className="text-sm text-gray-700">Free shipping on orders over ₦50,000</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold mt-1">✓</span>
              <span className="text-sm text-gray-700">1-year warranty included</span>
            </li>
          </ul>
        </div>

        {/* Add to Cart Button */}
        <div className="space-y-3 pt-4">
          <Button
            className="w-full gap-2 h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            onClick={() => addToCart(product)}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 font-semibold"
            onClick={() => window.location.href = '/storefront/products'}
            data-testid="button-continue-shopping"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

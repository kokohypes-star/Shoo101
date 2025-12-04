import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Star, Plus, ShoppingCart, Truck, Shield, RotateCcw, Heart, Share2, Minus, ChevronRight, Zap } from 'lucide-react';
import { toast } from 'sonner';

const allProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 201495, category: 'Audio', rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium comfort.', specs: { brand: 'AudioMax', model: 'WH-1000XM5', connectivity: 'Bluetooth 5.2', battery: '30 hours', weight: '250g' } },
  { id: 2, name: 'Smart Watch Pro', price: 387485, category: 'Wearables', rating: 4.9, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', description: 'Advanced smartwatch with health tracking, fitness modes, and seamless connectivity. Features include heart rate monitoring, GPS tracking, sleep analysis, and over 100 workout modes.', specs: { brand: 'TechWear', model: 'Pro Series 8', display: 'AMOLED 1.9"', battery: '7 days', waterproof: '5ATM' } },
  { id: 3, name: 'Portable Speaker Max', price: 139485, category: 'Audio', rating: 4.7, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop', description: 'Compact portable speaker with 360° sound and waterproof design.', specs: { brand: 'SoundMax', model: 'Boom 360', power: '40W', battery: '20 hours', waterproof: 'IP67' } },
  { id: 4, name: 'Premium USB-C Cable', price: 38735, category: 'Cables', rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'Durable USB-C cable with fast charging support up to 100W.', specs: { brand: 'CableX', model: 'Pro 100W', length: '2m', material: 'Braided Nylon', warranty: '2 years' } },
  { id: 5, name: 'Wireless Charging Pad', price: 78945, category: 'Chargers', rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'Fast wireless charging pad compatible with all Qi-enabled devices.', specs: { brand: 'PowerMax', model: 'Qi Pro', power: '15W', compatibility: 'Universal Qi', led: 'Smart LED indicator' } },
  { id: 6, name: 'USB Hub Pro', price: 56735, category: 'Accessories', rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'Multi-port USB hub with high-speed data transfer.', specs: { brand: 'HubMax', model: '7-in-1', ports: '7 USB ports', speed: 'USB 3.0', power: 'Powered hub' } },
  { id: 7, name: 'Screen Protector Set', price: 28945, category: 'Accessories', rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'Tempered glass screen protectors for maximum device protection.', specs: { brand: 'GuardMax', model: 'Ultra Clear', hardness: '9H', thickness: '0.33mm', pieces: '3 pack' } },
  { id: 8, name: 'Phone Mount Stand', price: 35485, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'Adjustable phone mount stand for hands-free viewing.', specs: { brand: 'MountPro', model: 'Flex 360', rotation: '360°', compatibility: 'Universal', material: 'Aluminum' } },
  { id: 9, name: 'Bluetooth Earbuds', price: 145295, category: 'Audio', rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', description: 'True wireless earbuds with premium sound and active noise cancellation.', specs: { brand: 'AudioMax', model: 'Pods Pro', battery: '8 hours', anc: 'Active Noise Cancelling', waterproof: 'IPX5' } },
  { id: 10, name: 'Power Bank 30000mAh', price: 89365, category: 'Chargers', rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'High-capacity power bank with fast charging technology.', specs: { brand: 'PowerMax', model: 'Ultra 30K', capacity: '30000mAh', output: '65W PD', ports: '3 ports' } },
  { id: 11, name: 'Laptop Stand Aluminum', price: 125485, category: 'Accessories', rating: 4.9, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop', description: 'Premium aluminum laptop stand for ergonomic workspace setup.', specs: { brand: 'DeskPro', model: 'Elite Stand', material: 'Aluminum', adjustable: 'Yes', maxWeight: '15kg' } },
  { id: 12, name: 'Keyboard Mechanical', price: 185945, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1587829191301-2a38e75e0f51?w=800&h=800&fit=crop', description: 'Professional mechanical keyboard with customizable switches.', specs: { brand: 'KeyMax', model: 'Pro RGB', switches: 'Cherry MX', layout: 'Full Size', backlight: 'RGB' } },
  { id: 13, name: 'Gaming Mouse Pro', price: 98765, category: 'Accessories', rating: 4.8, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop', description: 'High-precision gaming mouse with programmable buttons.', specs: { brand: 'GameMax', model: 'Elite Pro', dpi: '25000 DPI', buttons: '8 programmable', weight: 'Adjustable' } },
  { id: 14, name: 'Webcam 4K Ultra', price: 156485, category: 'Accessories', rating: 4.7, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop', description: '4K webcam with auto-focus and built-in microphone.', specs: { brand: 'CamPro', model: '4K Ultra', resolution: '4K 30fps', microphone: 'Dual stereo', fov: '90°' } },
];

const relatedProducts = allProducts.slice(0, 6);

export default function ProductDetail() {
  const [match, params] = useRoute('/storefront/product/:id');
  const productId = params?.id ? parseInt(params.id) : null;
  const product = productId ? allProducts.find(p => p.id === productId) : null;
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const addToCart = (product: typeof allProducts[0], qty: number = 1) => {
    const cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    
    localStorage.setItem('sf_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    toast.success(`${qty} x ${product.name} added to cart!`);
  };

  if (!match || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  const productImages = [product.image, product.image.replace('w=800', 'w=600'), product.image.replace('w=800', 'w=700')];

  return (
    <>
      {/* Mobile View */}
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
          <h1 className="text-2xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }} data-testid="text-product-name">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground" data-testid="text-rating">({product.rating})</span>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Price</p>
            <p className="text-3xl font-bold text-purple-600" data-testid="text-price">₦{product.price.toLocaleString()}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Description</h2>
            <p className="text-gray-700 leading-relaxed" data-testid="text-description">{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold mt-1">✓</span><span className="text-sm text-gray-700">Premium quality materials</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold mt-1">✓</span><span className="text-sm text-gray-700">30-day money-back guarantee</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold mt-1">✓</span><span className="text-sm text-gray-700">Free shipping on orders over ₦50,000</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold mt-1">✓</span><span className="text-sm text-gray-700">1-year warranty included</span></li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <Button className="w-full gap-2 h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold" onClick={() => addToCart(product)} data-testid="button-add-to-cart">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" className="w-full h-12 font-semibold" onClick={() => window.location.href = '/storefront/products'} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop View - Advanced Technology System */}
      <div className="hidden md:block">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <a href="/storefront" className="text-muted-foreground hover:text-purple-600 transition">Home</a>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <a href="/storefront/products" className="text-muted-foreground hover:text-purple-600 transition">Products</a>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Main Product Section */}
          <div className="grid grid-cols-2 gap-12 mb-16">
            {/* Left Column - Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">{product.category}</span>
                </div>
              </div>
              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${selectedImageIndex === idx ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">({product.rating}) · 128 reviews</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <Zap className="h-4 w-4" /> In Stock
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-purple-600">₦{product.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-400 line-through">₦{(product.price * 1.2).toLocaleString()}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">20% OFF</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">or 4 interest-free payments of ₦{(product.price / 4).toLocaleString()} with Klarna</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-gray-100 transition"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-gray-100 transition"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  className="flex-1 gap-2 h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg rounded-xl"
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-14 font-semibold text-lg rounded-xl border-2 hover:border-purple-600 hover:text-purple-600"
                  onClick={() => {
                    addToCart(product, quantity);
                    window.location.href = '/storefront/cart';
                  }}
                >
                  Buy Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders ₦50K+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">1 Year Warranty</p>
                    <p className="text-xs text-gray-500">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-500">30-day guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t pt-10">
            <div className="flex gap-8 border-b mb-8">
              {(['description', 'specs', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-semibold capitalize transition ${activeTab === tab ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab === 'specs' ? 'Specifications' : tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> Premium quality materials</li>
                      <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> Advanced technology integration</li>
                      <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> Ergonomic design</li>
                      <li className="flex items-center gap-2"><span className="text-purple-600">✓</span> Industry-leading performance</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2"><span className="text-purple-600">•</span> {product.name}</li>
                      <li className="flex items-center gap-2"><span className="text-purple-600">•</span> User Manual</li>
                      <li className="flex items-center gap-2"><span className="text-purple-600">•</span> Warranty Card</li>
                      <li className="flex items-center gap-2"><span className="text-purple-600">•</span> Carrying Case</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                  <div className="space-y-3">
                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900">{product.rating}</p>
                    <div className="flex justify-center gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">128 reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-12">{stars} stars</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          <div className="mt-16 pt-10 border-t">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Plus Jakarta Sans' }}>You May Also Like</h2>
            <div className="grid grid-cols-6 gap-4">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 6).map(relProd => (
                <a
                  key={relProd.id}
                  href={`/storefront/product/${relProd.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img src={relProd.image} alt={relProd.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-1">{relProd.name}</h3>
                      <p className="text-sm font-bold text-purple-600">₦{relProd.price.toLocaleString()}</p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

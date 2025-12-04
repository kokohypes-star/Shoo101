import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Star, ChevronDown, ShoppingCart, ChevronLeft, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

const allProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 201495, category: 'Audio', rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Smart Watch Pro', price: 387485, category: 'Wearables', rating: 4.9, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 3, name: 'Portable Speaker Max', price: 139485, category: 'Audio', rating: 4.7, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 4, name: 'Premium USB-C Cable', price: 38735, category: 'Cables', rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 5, name: 'Premium Phone Stand', price: 61985, category: 'Accessories', rating: 4.5, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 6, name: 'Tempered Glass Screen Protector', price: 23235, category: 'Accessories', rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 7, name: 'Premium Phone Case', price: 54235, category: 'Accessories', rating: 4.7, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop' },
  { id: 8, name: 'Wireless Charging Pad', price: 77485, category: 'Chargers', rating: 4.6, image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=400&h=400&fit=crop' },
  { id: 9, name: 'Noise Cancelling Earbuds', price: 247985, category: 'Audio', rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 10, name: 'Fitness Tracker Band', price: 309985, category: 'Wearables', rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 11, name: 'Bluetooth Speaker Pro', price: 185985, category: 'Audio', rating: 4.6, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 12, name: 'Lightning Cable Set', price: 46485, category: 'Cables', rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 13, name: 'Magnetic Phone Mount', price: 69735, category: 'Accessories', rating: 4.4, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 14, name: 'Anti-glare Screen Protector', price: 30985, category: 'Accessories', rating: 4.3, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 15, name: 'Slim Protective Case', price: 46485, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop' },
  { id: 16, name: 'Fast Charging Dock', price: 92985, category: 'Chargers', rating: 4.7, image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=400&h=400&fit=crop' },
  { id: 17, name: 'Studio Quality Microphone', price: 309985, category: 'Audio', rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 18, name: 'Smart Ring Ultra', price: 464985, category: 'Wearables', rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 19, name: 'Compact Travel Speaker', price: 116235, category: 'Audio', rating: 4.5, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 20, name: 'Multi-Device Charging Cable', price: 30985, category: 'Cables', rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 21, name: 'Desktop Phone Holder', price: 54235, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 22, name: 'Premium Tempered Glass', price: 26335, category: 'Accessories', rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 23, name: 'Rugged Protective Case', price: 61985, category: 'Accessories', rating: 4.7, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop' },
  { id: 24, name: 'Rapid Charging Pad Pro', price: 108485, category: 'Chargers', rating: 4.8, image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=400&h=400&fit=crop' },
  { id: 25, name: 'Professional Headphones', price: 279485, category: 'Audio', rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 26, name: 'Activity Watch', price: 279485, category: 'Wearables', rating: 4.6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 27, name: 'Waterproof Speaker', price: 154985, category: 'Audio', rating: 4.6, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 28, name: 'Premium Type-C Cable', price: 43385, category: 'Cables', rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 29, name: 'Car Phone Mount', price: 51135, category: 'Accessories', rating: 4.5, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 30, name: 'Crystal Clear Screen Protector', price: 20135, category: 'Accessories', rating: 4.3, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 31, name: 'Leather Phone Case', price: 69735, category: 'Accessories', rating: 4.8, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop' },
  { id: 32, name: 'Dual Device Charger', price: 123985, category: 'Chargers', rating: 4.7, image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=400&h=400&fit=crop' },
  { id: 33, name: 'Conference Microphone', price: 232485, category: 'Audio', rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 34, name: 'Sports Band', price: 232485, category: 'Wearables', rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 35, name: 'Outdoor Portable Speaker', price: 170485, category: 'Audio', rating: 4.6, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 36, name: 'Braided Charging Cable', price: 35635, category: 'Cables', rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 37, name: 'Dashboard Phone Mount', price: 58885, category: 'Accessories', rating: 4.6, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 38, name: 'Mirror Screen Protector', price: 29435, category: 'Accessories', rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 39, name: 'Clear TPU Case', price: 41785, category: 'Accessories', rating: 4.5, image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop' },
  { id: 40, name: 'Multi-Port Charging Hub', price: 139485, category: 'Chargers', rating: 4.8, image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=400&h=400&fit=crop' },
];

export default function StorefrontProducts() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [activatedProductId, setActivatedProductId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category && ['Audio', 'Wearables', 'Cables', 'Accessories', 'Chargers'].includes(category)) {
      setSelectedCategory(category);
    }
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortBy]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];

  let filtered = allProducts.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'price-low') filtered.sort((a: any, b: any) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a: any, b: any) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a: any, b: any) => b.rating - a.rating);

  // Pagination logic
  const isMobile = windowWidth < 768;
  const productsPerPage = isMobile ? 20 : 40;
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filtered.slice(startIndex, startIndex + productsPerPage);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('sf_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: 'bottom-right',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="font-bold" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.500rem' }}>Shop Our Store</h1>
      </div>

      {/* Filters Section */}
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base"
              style={{ borderRadius: '50px' }}
            />
          </div>
          <div className="relative min-w-[140px]">
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-background border border-input rounded-lg h-12 px-4 pr-10 cursor-pointer font-medium text-base"
              title="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              className="text-base"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {displayedProducts.map(product => {
              const isActivated = activatedProductId === product.id;
              const isMobile = windowWidth < 768;

              return (
              <Card 
                key={product.id} 
                className="overflow-hidden transition-all duration-300 md:duration-500 border-0 shadow-sm group cursor-pointer bg-white hover:shadow-lg md:hover:shadow-xl"
                onClick={() => {
                  if (isMobile) {
                    // Toggle activation on mobile - only one card active at a time
                    setActivatedProductId(isActivated ? null : product.id);
                  } else {
                    setSelectedProduct(selectedProduct === product.id ? null : product.id);
                  }
                }}
              >
                <div className="h-32 md:h-48 overflow-hidden bg-muted relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 md:duration-500 md:group-hover:scale-110"
                  />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-md">
                    <p className="text-xs md:text-sm font-semibold text-purple-600">₦{product.price.toLocaleString()}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 md:duration-500 hidden md:group-hover:flex md:flex items-center justify-center">
                    <ShoppingCart className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-2 md:p-5 space-y-2 md:space-y-3">
                  <div>
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1 uppercase tracking-wide font-medium">{product.category}</p>
                    <h3 className="font-semibold line-clamp-2 text-xs md:text-base">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-0.5 md:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-2.5 md:h-4 w-2.5 md:w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-[10px] md:text-xs text-muted-foreground ml-0.5 md:ml-1">({product.rating})</span>
                  </div>
                  
                  {isActivated && (
                  <div className="md:hidden space-y-1">
                    <Button
                      className="w-full gap-2 h-7 button-reveal"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      size="sm"
                      data-testid={`button-add-to-cart-${product.id}`}
                    >
                      <Plus className="h-3 w-3" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-7 button-reveal"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/storefront/product/${product.id}`;
                      }}
                      size="sm"
                      data-testid={`button-view-details-${product.id}`}
                      style={{ animationDelay: '0.05s' }}
                    >
                      View Details
                    </Button>
                  </div>
                  )}
                  <Button
                    className="w-full gap-2 hidden md:flex justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-4 py-8 -mt-2.5">
              {/* Page Info */}
              <div className="text-center text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} ({filtered.length} products)
              </div>

              {/* Mobile Pagination */}
              {isMobile && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <span className="px-3 py-1 rounded-lg bg-muted text-sm font-medium">
                    {currentPage}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Desktop Pagination */}
              {!isMobile && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const isNearCurrent = Math.abs(pageNum - currentPage) <= 1;
                      const isFirstOrLast = pageNum === 1 || pageNum === totalPages;
                      
                      if (isNearCurrent || isFirstOrLast) {
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="min-w-10"
                          >
                            {pageNum}
                          </Button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span key={pageNum} className="px-2 text-muted-foreground">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-full text-center py-16 space-y-4">
          <Search className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
          <p className="text-lg text-muted-foreground">No products found</p>
          <Button variant="outline" onClick={() => { setSearch(''); setSelectedCategory('All'); setCurrentPage(1); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

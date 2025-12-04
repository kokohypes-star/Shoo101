import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag, Truck, Shield, Star, ArrowRight, ShoppingCart, Plus, ChevronLeft, ChevronRight, Zap, Headphones, Watch, Cable, Zap as ZapIcon, Lightbulb, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

const heroSlides = [
  {
    id: 1,
    subtitle: 'Hurry Up! Enjoy Sale Madness!',
    title: 'Ember Sales! Operation Everybody Must Buy',
    description: 'Don\'t miss out on our exclusive sale. Limited time offer on premium tech products.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    subtitle: 'Hurry Up! Enjoy Sale Madness!',
    title: 'Tech Revolution! Get the Latest Gadgets',
    description: 'Upgrade your tech collection with our curated selection of premium devices.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    subtitle: 'Hurry Up! Enjoy Sale Madness!',
    title: 'Smart Living Starts Here',
    description: 'Experience the future with our cutting-edge smart home and wearable technology.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop',
  },
];

const promotionalBanners = [
  {
    id: 1,
    subtitle: 'Timeless rattan creations.',
    title: 'Precious Sustainably Stylish',
    image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop',
    link: '/storefront/products?category=Home',
  },
  {
    id: 2,
    subtitle: 'Premium audio experiences.',
    title: 'Sound Innovation Collection',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    link: '/storefront/products?category=Audio',
  },
  {
    id: 3,
    subtitle: 'Fashion forward choices.',
    title: 'Contemporary Elegance Line',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    link: '/storefront/products?category=Wearables',
  },
];

const featuredProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 201495, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Smart Watch Pro', price: 387485, rating: 4.9, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
  { id: 3, name: 'Portable Speaker Max', price: 139485, rating: 4.7, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
  { id: 4, name: 'Premium USB-C Cable', price: 38735, rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 5, name: 'Wireless Charging Pad', price: 78945, rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 6, name: 'USB Hub Pro', price: 56735, rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 7, name: 'Screen Protector Set', price: 28945, rating: 4.4, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 8, name: 'Phone Mount Stand', price: 35485, rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 9, name: 'Bluetooth Earbuds', price: 145295, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
  { id: 10, name: 'Power Bank 30000mAh', price: 89365, rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 11, name: 'Laptop Stand Aluminum', price: 125485, rating: 4.9, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 12, name: 'Keyboard Mechanical', price: 185945, rating: 4.6, image: 'https://images.unsplash.com/photo-1587829191301-2a38e75e0f51?w=400&h=400&fit=crop' },
  { id: 13, name: 'Gaming Mouse Pro', price: 98765, rating: 4.8, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop' },
  { id: 14, name: 'Webcam 4K Ultra', price: 156485, rating: 4.7, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop' },
  { id: 15, name: 'Microphone Condenser', price: 234895, rating: 4.9, image: 'https://images.unsplash.com/photo-1609034227505-5876f6aa4e90?w=400&h=400&fit=crop' },
  { id: 16, name: 'LED Desk Lamp', price: 45935, rating: 4.5, image: 'https://images.unsplash.com/photo-1565636192335-14c87d08e730?w=400&h=400&fit=crop' },
  { id: 17, name: 'Cooling Pad Laptop', price: 62485, rating: 4.6, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 18, name: 'Memory Card 256GB', price: 125485, rating: 4.8, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop' },
  { id: 19, name: 'External SSD 1TB', price: 285945, rating: 4.9, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop' },
  { id: 20, name: 'HDMI Cable Pro', price: 28945, rating: 4.5, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
  { id: 21, name: 'Monitor Stand Adjustable', price: 98765, rating: 4.7, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop' },
];

export default function StorefrontHome() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activatedProductId, setActivatedProductId] = useState<number | null>(null);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideTimer.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 7000);
    };
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    autoSlideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
  };

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
    <div className="space-y-16">
      {/* Hero Section with Slider and Banners */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-8 px-4 md:px-6 lg:px-8" style={{ marginBottom: '-2.375rem' }}>
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout - 60/40 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column: Slider (60% width) */}
            <div className="lg:col-span-3">
              <div className="banner-hover relative w-full overflow-hidden bg-black border border-gray-200" style={{ height: 'clamp(250px, 50vw, 381px)', borderRadius: '0.3rem' }}>
                {/* Slider Container */}
                <div className="relative w-full h-full">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      {/* Content - All Screens */}
                      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 py-6 md:py-12">
                        <div className="max-w-xs md:max-w-md">
                          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                            <Zap className="h-4 w-4 md:h-5 md:w-5 text-white" />
                            <p className="text-xs md:text-sm font-semibold text-white">{slide.subtitle}</p>
                          </div>
                          <h2
                            className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-tight"
                            style={{ fontFamily: 'Plus Jakarta Sans', marginBottom: '0.5rem' }}
                          >
                            {slide.title}
                          </h2>
                          <p className="text-xs md:text-sm text-white leading-relaxed" style={{ marginBottom: '0.75rem' }}>
                            {slide.description}
                          </p>
                          <Button
                            className="bg-white hover:bg-gray-100 text-black gap-2 h-8 md:h-10 px-4 md:px-6 text-xs md:text-sm"
                            onClick={() => window.location.href = '/storefront/products'}
                          >
                            Shop Now
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation - Desktop: Arrows, Mobile: Dots */}
                {/* Desktop Arrows */}
                <div className="hidden md:block">
                  <button
                    onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Indicators - Hidden */}
                {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition ${
                        index === currentSlide
                          ? 'bg-white w-6 md:w-8'
                          : 'bg-white/50 w-2 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div> */}
              </div>
            </div>

            {/* Right Column: Promotional Banners (40% width) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-6">
              {/* Top Banner */}
              <a
                href={promotionalBanners[0].link}
                className="hidden lg:block banner-hover relative overflow-hidden bg-white border border-gray-200"
                style={{ height: '190px', borderRadius: '0.3rem' }}
              >
                <img
                  src={promotionalBanners[0].image}
                  alt={promotionalBanners[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-center px-4 py-6">
                  <div className="max-w-xs">
                    <h3
                      className="text-lg font-bold text-white line-clamp-2 leading-tight"
                      style={{ fontFamily: 'Plus Jakarta Sans', marginBottom: '0.5rem' }}
                    >
                      {promotionalBanners[0].title}
                    </h3>
                    <Button
                      className="bg-white hover:bg-gray-100 text-black gap-2 h-8 px-4 text-xs"
                      onClick={() => window.location.href = '/storefront/products'}
                    >
                      Shop Now
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </a>

              {/* Bottom Two Banners - Side by Side */}
              <div className="hidden lg:grid grid-cols-2 gap-6" style={{ height: '170px' }}>
                {promotionalBanners.slice(1).map((banner) => (
                  <a
                    key={banner.id}
                    href={banner.link}
                    className="banner-hover relative overflow-hidden bg-white border border-gray-200"
                    style={{ borderRadius: '0.3rem' }}
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col justify-center px-3 py-4">
                      <div className="max-w-xs">
                        <h3
                          className="text-xs font-bold text-white line-clamp-1 leading-tight"
                          style={{ fontFamily: 'Plus Jakarta Sans', marginBottom: '0.5rem' }}
                        >
                          {banner.title}
                        </h3>
                        <Button
                          className="bg-white hover:bg-gray-100 text-black gap-1 h-6 px-3 text-xs"
                          onClick={() => window.location.href = '/storefront/products'}
                        >
                          Shop Now
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="px-4 md:px-6 lg:px-8 w-full" style={{ marginBottom: '30px' }}>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="hidden">
            <h2 className="font-black" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.500rem', fontWeight: 900, marginTop: '-0.875rem', marginBottom: '-0.2rem' }}>Shop by Category</h2>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '-0.2rem' }}>Browse our curated collections</p>
          </div>
          <div className="grid grid-cols-5 gap-1 md:gap-4 mb-0" style={{ marginTop: '-1.500rem' }}>
          {[
            { name: 'Audio', icon: Headphones, bg: 'from-blue-400 to-blue-600', bgLight: 'bg-blue-100' },
            { name: 'Wearables', icon: Watch, bg: 'from-purple-400 to-purple-600', bgLight: 'bg-purple-100' },
            { name: 'Cables', icon: Cable, bg: 'from-orange-400 to-orange-600', bgLight: 'bg-orange-100' },
            { name: 'Accessories', icon: ZapIcon, bg: 'from-green-400 to-green-600', bgLight: 'bg-green-100' },
            { name: 'Chargers', icon: Lightbulb, bg: 'from-red-400 to-red-600', bgLight: 'bg-red-100' },
          ].map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <a
                key={cat.name}
                href={`/storefront/products?category=${cat.name}`}
                className={`p-2 md:p-6 border border-border transition text-center space-y-0.5 flex flex-col items-center justify-center group relative h-auto md:h-auto md:bg-gradient-to-br md:${cat.bg} md:bg-opacity-20 hover:md:bg-opacity-30`}
                style={{ '--tw-bg-opacity': '0.10', borderRadius: '0.3rem' } as React.CSSProperties}
              >
                <div className="md:hidden">
                  <div className={`w-12 h-12 ${cat.bgLight} flex items-center justify-center`} style={{ borderRadius: '0.3rem' }}>
                    <IconComponent className="h-8 w-8 text-gray-800" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-gray-800 group-hover:text-gray-900" />
                </div>
                <p className="hidden md:block text-xs md:text-lg font-semibold text-gray-800">{cat.name}</p>
                <p className="text-[10px] md:text-xs text-gray-700 blink-animation opacity-0 group-hover:opacity-100">Shop now</p>
              </a>
            );
          })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 md:px-6 lg:px-8 w-full" style={{ marginTop: '-0.5rem' }}>
        <div className="max-w-7xl mx-auto space-y-4">
          <div>
            <h2 className="font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '1.500rem', fontWeight: 800, marginBottom: '0.1rem' }}>Featured Products</h2>
            <p className="text-muted-foreground" style={{ fontSize: '0.900rem', fontWeight: 350, marginBottom: '0' }}>Trending items our customers love</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4 md:gap-6">
          {(isDesktop ? featuredProducts.slice(0, 14) : featuredProducts.slice(0, 9)).map(product => {
            const isActivated = activatedProductId === product.id;
            const isMobile = window.innerWidth < 768;

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
              data-testid={`card-product-${product.id}`}
            >
              <div className="h-32 md:h-48 overflow-hidden bg-muted relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 md:duration-500 md:group-hover:scale-110"
                />
                <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white px-2 md:px-4 py-0.5 md:py-1.5 rounded-full shadow-md">
                  <p className="text-xs md:text-base font-semibold text-purple-600">₦{product.price.toLocaleString()}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 md:duration-500 hidden md:group-hover:flex md:flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-white" />
                </div>
              </div>
              <div className="p-2 md:p-6 space-y-2 md:space-y-4">
                <div>
                  <div className="flex items-center gap-0.5 md:gap-1.5 mb-1 md:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 md:h-5 w-3 md:w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs md:text-sm text-muted-foreground ml-0.5 md:ml-2">({product.rating})</span>
                  </div>
                  <h3 className="text-xs md:text-base font-semibold line-clamp-2 leading-tight md:leading-snug">{product.name}</h3>
                </div>
                
                {isActivated && (
                <div className="md:hidden space-y-1">
                  <Button 
                    className="w-full gap-2 h-7 button-reveal" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    data-testid={`button-add-to-cart-${product.id}`}
                  >
                    <Plus className="h-3 w-3" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-7 button-reveal" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/storefront/product/${product.id}`;
                    }}
                    data-testid={`button-view-details-${product.id}`}
                    style={{ animationDelay: '0.05s' }}
                  >
                    View Details
                  </Button>
                </div>
                )}
                <Button className="w-full gap-2 hidden md:flex justify-center" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}>
                  <Plus className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
            );
          })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Centered Hero Section Below Slider */}
      <section className="space-y-8 text-center py-12">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold whitespace-nowrap md:whitespace-normal" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            <span className="block md:inline">Premium Tech,</span>
            <span className="block md:inline bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent md:ml-2">
              Unbeatable Prices
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '0.80rem', fontWeight: '500' }}>
            Discover our curated collection of the latest tech gadgets and accessories. Fast shipping, secure checkout, and 30-day returns guaranteed.
          </p>
        </div>
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="px-8 text-base gap-2" style={{ height: '33px' }} onClick={() => window.location.href = '/storefront/products'}>
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base" onClick={() => window.location.href = '/storefront/login'}>
            Create Account
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-8 border-0 shadow-sm hover:shadow-md transition">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Truck className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Express Shipping</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free shipping on all orders over $50. Track your package in real-time.
            </p>
          </div>
        </Card>
        <Card className="p-8 border-0 shadow-sm hover:shadow-md transition">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Secure Payment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your payment is 100% secure with industry-leading encryption.
            </p>
          </div>
        </Card>
        <Card className="p-8 border-0 shadow-sm hover:shadow-md transition">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Easy Returns</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90" />
        <div className="relative px-8 py-16 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>Ready to upgrade your tech?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Browse our full collection of premium products with exclusive deals available this season.
          </p>
          <Button
            size="lg"
            className="h-12 px-8 text-base gap-2 bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => window.location.href = '/storefront/products'}
          >
            Explore All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { ShoppingCart, User, Check, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  customer?: any;
  onLogout?: () => void;
  cartCount?: number;
  loginError?: boolean;
}

interface CartPreview {
  name: string;
  price: number;
  image: string;
}

export default function StorefrontHeader({ isLoggedIn, onLogout, cartCount = 0, loginError = false }: HeaderProps) {
  const [contactIconColor, setContactIconColor] = useState<'default' | 'green' | 'red'>('default');
  const [isNewBadge, setIsNewBadge] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [cartPreview, setCartPreview] = useState<CartPreview | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (cartCount > previousCartCount) {
      setIsNewBadge(true);
      const timer = setTimeout(() => setIsNewBadge(false), 600);
      return () => clearTimeout(timer);
    }
    setPreviousCartCount(cartCount);
  }, [cartCount, previousCartCount]);

  // Listen for cart changes and show preview of last added item
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
      if (cart.length > 0) {
        const lastItem = cart[cart.length - 1];
        setCartPreview({
          name: lastItem.name,
          price: lastItem.price,
          image: lastItem.image,
        });
        setShowPreview(true);
        const timer = setTimeout(() => setShowPreview(false), 3500);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setContactIconColor('green');
    } else if (loginError) {
      setContactIconColor('red');
      const timer = setTimeout(() => setContactIconColor('default'), 2000);
      return () => clearTimeout(timer);
    } else {
      setContactIconColor('default');
    }
  }, [isLoggedIn, loginError]);

  const getContactIconColor = () => {
    if (contactIconColor === 'green') return 'text-lime-500';
    if (contactIconColor === 'red') return 'text-red-500';
    return 'text-foreground';
  };

  return (
    <header className="border-b bg-white sticky top-0 z-40 h-[50px] md:h-[100px] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between gap-4">
        <Link href="/storefront">
          <h1 
            className="cursor-pointer animate-gradient-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent text-[24px] md:text-[60px] leading-none"
            style={{ fontFamily: "'Nexa Bold', 'Montserrat', sans-serif", fontWeight: 900 }}
          >SHOOBU</h1>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[468px] mx-4">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-purple-500 rounded-l-full"
              data-testid="input-search"
            />
            <button 
              className="px-4 py-2 bg-purple-600 text-white border border-purple-600 rounded-r-full"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          <Link href="/storefront">Home</Link>
          <Link href="/storefront/products">Shop</Link>
          <Link href="/storefront/cart">Cart</Link>
          {isLoggedIn ? (
            <Link href="/storefront/account">Account</Link>
          ) : (
            <Link href="/storefront/login">Login</Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-6 h-[35px]">
        {/* Search Icon */}
        <Link href="/storefront/search" data-testid="link-mobile-search">
          <Search className="h-6 w-6" />
        </Link>

        {/* Cart Icon with Count and Preview */}
        <div className="relative">
          <Link href="/storefront/cart" className="relative flex items-center">
            <ShoppingCart className="h-6 w-6" />
            <span 
              key={`badge-${cartCount}`}
              className={`absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ${isNewBadge ? 'badge-pinch-rotate' : ''}`}
            >
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          </Link>

          {/* Cart Preview Tooltip */}
          {showPreview && cartPreview && (
            <div className="absolute right-0 top-12 w-[150px] h-full bg-white border border-border rounded-lg shadow-lg p-[4px] z-50 tooltip-flutter">
              <div className="flex items-center gap-[2.8px]">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={cartPreview.image}
                    alt={cartPreview.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[0.4rem] text-muted-foreground font-medium mb-[2px]">Added to cart</p>
                  <h4 className="text-[0.65rem] font-semibold line-clamp-2">{cartPreview.name}</h4>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-muted-foreground hover:text-foreground transition flex-shrink-0"
                >
                  <Check className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Icon for Login/Account */}
        <Link href={isLoggedIn ? '/storefront/account' : '/storefront/login'}>
          <User className={`h-6 w-6 transition-colors ${getContactIconColor()}`} />
        </Link>
        </nav>
      </div>
    </header>
  );
}

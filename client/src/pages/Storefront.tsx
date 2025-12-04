import { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'wouter';
import { Home, ShoppingBag, ShoppingCart, User, LogIn } from 'lucide-react';
import StorefrontHome from './storefront-pages/Home';
import StorefrontProducts from './storefront-pages/Products';
import StorefrontCart from './storefront-pages/CartPage';
import StorefrontCheckout from './storefront-pages/Checkout';
import StorefrontReceipt from './storefront-pages/Receipt';
import StorefrontAccount from './storefront-pages/Account';
import StorefrontLogin from './storefront-pages/Login';
import StorefrontHeader from './storefront-pages/Header';
import StorefrontFooter from './storefront-pages/Footer';
import ProductDetail from './storefront-pages/ProductDetail';
import NotFound from './storefront-pages/NotFound';
import { CurrencyProvider } from '../contexts/CurrencyContext';

function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [location] = useLocation();
  const navItems = [
    { icon: Home, label: 'Home', href: '/storefront' },
    { icon: ShoppingBag, label: 'Shop', href: '/storefront/products' },
    { icon: ShoppingCart, label: 'Cart', href: '/storefront/cart' },
    { icon: isLoggedIn ? User : LogIn, label: isLoggedIn ? 'Account' : 'Login', href: isLoggedIn ? '/storefront/account' : '/storefront/login' },
  ];

  const isActive = (href: string) => {
    if (href === '/storefront') return location === '/storefront' || location === '/';
    return location.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-border bg-white shadow-lg md:hidden z-50">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-4 transition ${active ? 'text-purple-600' : 'text-foreground'}`}
              data-testid={`link-mobile-${item.label.toLowerCase()}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function Storefront() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [customer, setCustomer] = useState<any>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [loginError, setLoginError] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('sf_token');
    const savedCustomer = localStorage.getItem('sf_customer');
    if (token && savedCustomer) {
      setIsLoggedIn(true);
      setCustomer(JSON.parse(savedCustomer));
    }
    updateCartCount();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => updateCartCount();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
    const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const handleLogin = (token: string, customerData: any) => {
    localStorage.setItem('sf_token', token);
    localStorage.setItem('sf_customer', JSON.stringify(customerData));
    setIsLoggedIn(true);
    setCustomer(customerData);
    setLoginError(false);
  };

  const handleLoginError = () => {
    setLoginError(true);
    setTimeout(() => setLoginError(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('sf_token');
    localStorage.removeItem('sf_customer');
    setIsLoggedIn(false);
    setCustomer(null);
  };

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
        <StorefrontHeader isLoggedIn={isLoggedIn} customer={customer} onLogout={handleLogout} cartCount={cartCount} loginError={loginError} />
        <main className="flex-1">
          <Switch>
            <Route path="/storefront/product/:id" component={() => <ProductDetail />} />
            <Route path="/storefront/products" component={() => <StorefrontProducts />} />
            <Route path="/storefront/cart" component={() => <StorefrontCart />} />
            <Route path="/storefront/checkout" component={() => isLoggedIn ? <StorefrontCheckout customer={customer} /> : <StorefrontLogin onLogin={handleLogin} onError={handleLoginError} />} />
            <Route path="/storefront/receipt" component={() => <StorefrontReceipt />} />
            <Route path="/storefront/account" component={() => isLoggedIn ? <StorefrontAccount customer={customer} onLogout={handleLogout} /> : <StorefrontLogin onLogin={handleLogin} onError={handleLoginError} />} />
            <Route path="/storefront/login" component={() => <StorefrontLogin onLogin={handleLogin} onError={handleLoginError} />} />
            <Route path="/product/:id" component={() => <ProductDetail />} />
            <Route path="/products" component={() => <StorefrontProducts />} />
            <Route path="/cart" component={() => <StorefrontCart />} />
            <Route path="/checkout" component={() => isLoggedIn ? <StorefrontCheckout customer={customer} /> : <StorefrontLogin onLogin={handleLogin} onError={handleLoginError} />} />
            <Route path="/receipt" component={() => <StorefrontReceipt />} />
            <Route path="/account" component={() => isLoggedIn ? <StorefrontAccount customer={customer} onLogout={handleLogout} /> : <StorefrontLogin onLogin={handleLogin} onError={handleLoginError} />} />
            <Route path="/login" component={() => <StorefrontLogin onLogin={handleLogin} onError={handleLoginError} />} />
            <Route component={() => <StorefrontHome />} />
          </Switch>
        </main>
        <StorefrontFooter />
        <MobileNav isLoggedIn={isLoggedIn} />
      </div>
    </CurrencyProvider>
  );
}

// client/src/components/Header.tsx
import React from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [loc] = useLocation();
  const cart = JSON.parse(localStorage.getItem("shoobu_cart") || "[]");
  const cartCount = cart.reduce((s: number, i: any) => s + (i.qty || 0), 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="text-xl font-bold text-black">SHOOBU</a>
          </Link>

          <nav className="hidden md:flex gap-3 text-sm">
            <Link href="/"><a className={loc === "/" ? "font-semibold" : ""}>Home</a></Link>
            <Link href="/products"><a className={loc.startsWith("/products") ? "font-semibold" : ""}>Products</a></Link>
            <Link href="/orders"><a className={loc.startsWith("/orders") ? "font-semibold" : ""}>Orders</a></Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart"><a className="relative inline-flex items-center">
            Cart
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-black text-white text-xs w-6 h-6">{cartCount}</span>
          </a></Link>

          <Link href="/user-account"><a className="text-sm">Account</a></Link>
        </div>
      </div>
    </header>
  );
}

// client/src/pages/Home.tsx
import React from "react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="container py-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Handmade Goods — Comfort & Craft</h1>
          <p className="mb-6 text-lg text-gray-700">Shop unique handmade bags, slippers, jewelry and rattan accessories.</p>
          <Link href="/products"><a className="button-primary">Shop Now</a></Link>
        </div>
        <div>
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center">Hero Image</div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl mb-4">Featured</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border rounded bg-white">
              <div className="h-40 bg-gray-100 mb-3" />
              <h3 className="font-semibold">Featured Item {i + 1}</h3>
              <p className="text-gray-500">Short description</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

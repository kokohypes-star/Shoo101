// client/src/pages/Products.tsx
import React from "react";
import { addToCart } from "@/utils/cart";

export default function Products() {
  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: `prod${i + 1}`,
    name: `Product ${i + 1}`,
    price: (i + 1) * 3500,
  }));

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold mb-8">Products</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="h-48 bg-gray-200 mb-4 rounded flex items-center justify-center">
              Image
            </div>

            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-gray-500 mb-3">
              ₦{p.price.toLocaleString()}
            </p>

            <button
              className="w-full px-4 py-2 rounded bg-black text-white"
              onClick={() => {
                addToCart({ id: p.id, name: p.name, price: p.price, qty: 1 });
                alert("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

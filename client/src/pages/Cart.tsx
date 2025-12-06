import { Link } from "wouter";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const updateQty = (index: number, qty: number) => {
    const updated = [...cart];
    updated[index].qty = qty;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="w-full px-6 py-10 md:container md:mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      {cart.length < 1 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="border p-4 rounded mb-4">
              <div className="flex justify-between w-full">
                <span>{item.name}</span>
                <span>₦{item.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <input
                  className="border p-2 w-16"
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) => updateQty(i, Number(e.target.value))}
                />
                <button className="text-red-500" onClick={() => removeItem(i)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="text-xl font-semibold mt-6">Total: ₦{total.toLocaleString()}</h3>

          <Link href="/storefront/checkout">
            <button className="bg-primary text-white px-6 py-3 rounded mt-6">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

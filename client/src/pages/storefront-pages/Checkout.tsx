import { useState } from "react";
import { useLocation } from "wouter";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CheckoutProps {
  customer: {
    id: number;
    email: string;
    phone: string;
  };
}

export default function Checkout({ customer }: CheckoutProps) {
  const [cart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [, navigate] = useLocation();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    const res = await fetch("/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sf_token"),
      },
      body: JSON.stringify({
        customer_id: customer.id,
        items: cart,
        subtotal: total,
        total: total,
      }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.removeItem("cart");
      navigate(`/storefront/receipt?id=${data.orderId}`);
    } else {
      alert("Order failed");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>

      <div className="border rounded p-4">
        <h3 className="font-semibold mb-3">Order Summary</h3>

        {cart.map((item) => (
          <p key={item.id}>
            {item.qty} × {item.name} — ₦{item.price.toLocaleString()}
          </p>
        ))}

        <div className="text-xl font-semibold mt-4">
          Total: ₦{total.toLocaleString()}
        </div>

        <button
          onClick={placeOrder}
          className="px-6 py-3 rounded bg-primary text-white mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

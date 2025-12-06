import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CheckoutProps {
  customer?: {
    id: number;
    email: string;
    phone: string;
  };
}

export default function Checkout({ customer }: CheckoutProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [, navigate] = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    const res = await fetch("/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sf_token"),
      },
      body: JSON.stringify({
        customer_id: customer?.id,
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
      alert(data.error);
    }
  };

  if (!customer)
    return <p className="p-6 text-red-500">You must be logged in.</p>;

  return (
    <div className="w-full px-6 py-10 md:container md:mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>

      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">Order Summary</h3>

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
          className="bg-primary text-white px-6 py-3 rounded mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

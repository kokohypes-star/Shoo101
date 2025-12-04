// client/src/pages/Orders.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const auth = localStorage.getItem("shoobu_auth");
  let customerId = null;
  try { customerId = auth ? JSON.parse(auth)?.customer?.id : null; } catch {}

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet(`/orders?customerId=${customerId}`);
        setOrders(res || []);
      } catch (e) {}
    })();
  }, [customerId]);

  if (!customerId) return <div className="container py-10">Please login to view orders.</div>;

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <div className="space-y-4">
          {orders.map(o => (
            <div key={o.id} className="p-4 border rounded bg-white">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Order #{o.id}</div>
                  <div className="text-sm text-gray-500">{o.createdAt}</div>
                </div>
                <div className="text-right">
                  <div>₦{o.total?.toLocaleString()}</div>
                  <a className="text-sm text-blue-600" href={`/receipt?id=${o.id}`}>View Receipt</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

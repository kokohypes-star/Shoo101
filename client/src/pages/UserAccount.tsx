// client/src/pages/UserAccount.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";

export default function UserAccount() {
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("shoobu_auth") || "{}");
        if (!auth?.token) return;
        const res = await apiGet("/customers/me", { headers: { Authorization: `Bearer ${auth.token}` } } as any);
        setProfile(res?.customer || null);
      } catch (e) {}
    })();
  }, []);

  if (!profile) return <div className="container py-10">Login to see account</div>;

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold">My Account</h2>
      <div className="mt-4">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Last seen:</strong> {profile.lastSeen}</p>
        <p><strong>Total orders:</strong> {profile.totalOrders}</p>
        <p><strong>Total spent:</strong> ₦{profile.totalSpent?.toLocaleString()}</p>
      </div>
    </div>
  );
}

// client/src/pages/VerifyEmail.tsx
import React, { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import { useLocation } from "wouter";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Waiting for verification...");
  const [, setLoc] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return setMessage("No token provided.");

    (async () => {
      try {
        const res = await apiGet(`/auth/verify?token=${token}`);
        if (res?.success) {
          setMessage("Email verified! You can now login.");
          setTimeout(() => setLoc("/login"), 1500);
        } else {
          setMessage(res?.error || "Verification failed");
        }
      } catch (e: any) {
        setMessage(e?.error || "Network error");
      }
    })();
  }, [setLoc]);

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

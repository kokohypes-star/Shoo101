// client/src/pages/Login.tsx
import React, { useState } from "react";
import { apiPost } from "@/utils/api";
import { saveAuth } from "@/utils/auth";
import { useLocation } from "wouter";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [, setLoc] = useLocation();

  const requestOtp = async () => {
    try {
      const res = await apiPost("/auth/otp", { phone });
      if (res?.success) {
        setMessage("OTP sent to your email. Check inbox.");
        setCustomerId(res.customerId);
      } else {
        setMessage(res?.error || "Failed to request OTP");
      }
    } catch (e: any) {
      setMessage(e?.error || "Network error");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await apiPost("/auth/otp/verify", { customerId, otpCode: otp });
      if (res?.success) {
        saveAuth({ token: res.token, customer: res.customer, sessionId: res.sessionId });
        setLoc("/user-account");
      } else {
        setMessage(res?.error || "Invalid OTP");
      }
    } catch (e: any) {
      setMessage(e?.error || "Network error");
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold mb-4">Login (Phone + OTP)</h2>

      <div className="max-w-md">
        <label className="block mb-2">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
        <button onClick={requestOtp} className="button-primary mb-4">Generate OTP</button>

        {customerId && (
          <>
            <label className="block mb-2">Enter OTP</label>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <button onClick={verifyOtp} className="button-primary">Verify & Login</button>
          </>
        )}

        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

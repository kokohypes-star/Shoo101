// client/src/pages/Signup.tsx
import React, { useState } from "react";
import { apiPost } from "@/utils/api";
import { useLocation } from "wouter";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [, setLoc] = useLocation();

  const submit = async () => {
    try {
      const res = await apiPost("/auth/signup", { email, phone });
      if (res?.success) {
        setMsg("Signup successful. Check your email for verification.");
        setLoc("/verify");
      } else {
        setMsg(res?.error || "Signup failed");
      }
    } catch (e: any) {
      setMsg(e?.error || "Network error");
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      <div className="max-w-md">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
        <button onClick={submit} className="button-primary">Create account</button>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </div>
  );
}

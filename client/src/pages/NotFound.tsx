// client/src/pages/NotFound.tsx
import React from "react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Page not found</h2>
      <Link href="/"><a className="button-primary">Back to Home</a></Link>
    </div>
  );
}

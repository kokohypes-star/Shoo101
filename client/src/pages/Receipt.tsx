// client/src/pages/Receipt.tsx
import React, { useEffect, useState } from "react";

export default function Receipt() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const [html, setHtml] = useState<string>("Loading...");

  useEffect(() => {
    if (!id) return setHtml("No receipt id");
    fetch(`/orders/receipt/html?id=${id}`)
      .then((r) => r.text())
      .then((t) => setHtml(t))
      .catch(() => setHtml("Failed to load receipt"));
  }, [id]);

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold mb-4">Receipt</h2>
      <div className="border rounded p-4" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

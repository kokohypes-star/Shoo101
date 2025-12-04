import { useEffect, useState } from "react";

export default function Receipt() {
  const id = new URLSearchParams(window.location.search).get("id");
  const [html, setHtml] = useState("<p>Loading receipt...</p>");

  useEffect(() => {
    fetch(`/receipt/${id}`)
      .then((res) => res.text())
      .then(setHtml)
      .catch(() => setHtml("<p>Failed to load receipt</p>"));
  }, [id]);

  return (
    <div
      className="container mx-auto px-6 py-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

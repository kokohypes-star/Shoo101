// server/storefront-backend/utils/receiptGenerator.js
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NGN = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

export function generateReceiptHTML(order = {}, customer = {}) {
  // ensure items array format: [{ name, qty, price }]
  const items = Array.isArray(order.items) ? order.items : [];

  // compute totals if not present
  const computedSubtotal =
    order.subtotal ??
    items.reduce((s, it) => s + Number(it.qty || 0) * Number(it.price || 0), 0);
  const shipping = Number(order.shipping ?? 0);
  const tax = Number(order.tax ?? 0);
  const computedTotal = order.total ?? computedSubtotal + shipping + tax;

  const created = order.created_at
    ? new Date(order.created_at)
    : new Date();

  const createdStr = created.toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const storefrontUrl = process.env.STOREFRONT_URL || "";

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Receipt — ${order.id || ""}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    :root{color-scheme: light dark}
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; padding:24px; background:#f7f7fb; color:#111827;}
    .card{max-width:800px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,.08);}
    .header{background:linear-gradient(90deg,#0ea5a9 0%,#7c3aed 100%);color:white;padding:28px;}
    h1{margin:0;font-size:20px}
    .meta{padding:20px 28px;border-bottom:1px solid #efefef;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
    .meta .left{max-width:65%}
    .meta .right{text-align:right}
    table{width:100%;border-collapse:collapse;margin:0;padding:0}
    th,td{padding:12px 16px;border-bottom:1px solid #f1f1f1;text-align:left}
    th{background:#fafafa;color:#374151;font-weight:600;font-size:13px}
    tfoot td{border-top:2px solid #efefef;font-weight:700}
    .totals{padding:20px 28px;background:#fafafa;display:flex;justify-content:space-between;flex-wrap:wrap}
    .btn{display:inline-block;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:600}
    .btn-primary{background:#2563eb;color:white}
    .muted{color:#6b7280;font-size:13px}
    .small{font-size:13px;color:#4b5563}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>SHOOBU — Order Receipt</h1>
      <div class="small">Order #${order.id || ""}</div>
    </div>

    <div class="meta">
      <div class="left">
        <div style="font-weight:600">${customer.name || "Customer"}</div>
        <div class="small">${customer.email || ""}</div>
        <div class="small">${customer.phone || ""}</div>
      </div>
      <div class="right">
        <div class="small">Date</div>
        <div style="font-weight:600">${createdStr}</div>
      </div>
    </div>

    <div style="padding:0 28px 20px 28px">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th style="width:80px">Qty</th>
            <th style="width:140px">Price</th>
            <th style="width:140px">Total</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map((it) => {
              const qty = Number(it.qty || 0);
              const price = Number(it.price || 0);
              const line = qty * price;
              return `<tr>
                <td>${escapeHtml(it.name || "Item")}</td>
                <td>${qty}</td>
                <td>${NGN(price)}</td>
                <td>${NGN(line)}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"></td>
            <td class="small">Subtotal</td>
            <td>${NGN(computedSubtotal)}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td class="small">Shipping</td>
            <td>${NGN(shipping)}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td class="small">Tax</td>
            <td>${NGN(tax)}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td class="small">Total</td>
            <td style="font-size:16px">${NGN(computedTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="totals">
      <div class="muted">Status: ${escapeHtml(order.status || "Processing")}</div>
      <div>
        <a class="btn btn-primary" href="${storefrontUrl}/receipt?id=${order.id || ""}" target="_blank">View Receipt</a>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

// small helper for HTML safety
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

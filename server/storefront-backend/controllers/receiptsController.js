// server/controllers/receiptsController.js
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import { generateReceiptHTML } from "../utils/receiptGenerator.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// HTML RECEIPT
// ===============================
export function getReceiptHTML(req, res) {
  try {
    const { id } = req.params;

    const order = Order.findById(id);
    if (!order) return res.status(404).send("Order not found");

    const customer = Customer.findById(order.customer_id);
    if (!customer) return res.status(404).send("Customer not found");

    const items = JSON.parse(order.items || "[]");

    const html = generateReceiptHTML(order, customer, items);

    res.setHeader("Content-Type", "text/html");
    return res.send(html);
  } catch (err) {
    console.error("Error loading receipt:", err);
    return res.status(500).send("Error generating receipt");
  }
}

// ===============================
// PDF RECEIPT
// ===============================
export function getReceiptPDF(req, res) {
  try {
    const { id } = req.params;

    const order = Order.findById(id);
    if (!order) return res.status(404).send("Order not found");

    const customer = Customer.findById(order.customer_id);
    if (!customer) return res.status(404).send("Customer not found");

    const items = JSON.parse(order.items || "[]");

    const receiptsDir = path.join(__dirname, "../receipts");
    if (!fs.existsSync(receiptsDir)) fs.mkdirSync(receiptsDir);

    const pdfPath = path.join(receiptsDir, `${id}.pdf`);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text("Order Receipt", { underline: true });
    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order.id}`);
    doc.text(`Date: ${order.created_at}`);
    doc.text(`Customer Email: ${customer.email}`);
    doc.text(`Customer Phone: ${customer.phone}`);
    doc.moveDown();

    doc.fontSize(14).text("Items", { underline: true });
    items.forEach((item) => {
      doc.text(`${item.qty} × ${item.name} — ₦${item.unit_price}`);
    });

    doc.moveDown();
    doc.fontSize(16).text(`TOTAL: ₦${order.total}`);

    doc.end();

    doc.on("finish", () => {
      res.download(pdfPath);
    });
  } catch (err) {
    console.error("Error generating PDF:", err);
    return res.status(500).send("Failed to generate PDF");
  }
}

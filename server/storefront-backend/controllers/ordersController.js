// server/controllers/ordersController.js
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import { v4 as uuidv4 } from "uuid";
import { sendOrderToDashboard } from "../utils/dashboardSync.js";

export function createOrder(req, res) {
  try {
    const customerId = req.customerId;
    const { items, subtotal, total } = req.body;

    if (!customerId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items required" });
    }

    const orderId = uuidv4();

    // Save order
    Order.create(customerId, items, subtotal, total);

    // Update stats
    const customer = Customer.findById(customerId);
    Customer.updateLastSeen(customerId);

    // Dashboard sync
    sendOrderToDashboard({
      id: orderId,
      customerId,
      items,
      subtotal,
      total,
    });

    return res.json({
      success: true,
      orderId,
      receiptUrl: `/api/receipt/html/${orderId}`,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}

// ALL customer orders
export function getCustomerOrders(req, res) {
  try {
    const customerId = req.customerId;
    if (!customerId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const orders = Order.findByCustomer(customerId).map((o) => ({
      ...o,
      items: JSON.parse(o.items || "[]"),
    }));

    return res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching customer orders:", err);
    return res.status(500).json({ error: "Failed to load orders" });
  }
}

// Get single order
export function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.items = JSON.parse(order.items || "[]");

    return res.json({ success: true, order });
  } catch (err) {
    console.error("Error fetching order:", err);
    return res.status(500).json({ error: "Failed to load order" });
  }
}

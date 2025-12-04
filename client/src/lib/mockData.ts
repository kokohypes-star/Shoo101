
import { subDays, format } from "date-fns";

export const salesData = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i);
  return {
    date: format(date, "MMM dd"),
    revenue: Math.floor(Math.random() * 5000) + 1500,
    orders: Math.floor(Math.random() * 50) + 10,
  };
});

export const products = [
  { id: "PROD-001", name: "Wireless Noise-Cancelling Headphones", category: "Electronics", price: 299.00, stock: 45, status: "In Stock", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop" },
  { id: "PROD-002", name: "Ergonomic Office Chair", category: "Furniture", price: 450.00, stock: 12, status: "Low Stock", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=150&h=150&fit=crop" },
  { id: "PROD-003", name: "Mechanical Keyboard", category: "Electronics", price: 150.00, stock: 120, status: "In Stock", image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=150&h=150&fit=crop" },
  { id: "PROD-004", name: "4K Monitor 27-inch", category: "Electronics", price: 399.00, stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&h=150&fit=crop" },
  { id: "PROD-005", name: "Smart Watch Series 5", category: "Wearables", price: 349.00, stock: 30, status: "In Stock", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" },
  { id: "PROD-006", name: "Bluetooth Speaker", category: "Audio", price: 89.99, stock: 65, status: "In Stock", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" },
];

export const recentOrders = [
  { id: "ORD-7829", customer: "Alex Morgan", date: "2 mins ago", total: 299.00, status: "Completed", items: 1 },
  { id: "ORD-7828", customer: "Sarah Jenkins", date: "15 mins ago", total: 450.00, status: "Processing", items: 2 },
  { id: "ORD-7827", customer: "Michael Chen", date: "1 hour ago", total: 89.99, status: "Completed", items: 1 },
  { id: "ORD-7826", customer: "Emily Blunt", date: "3 hours ago", total: 1200.00, status: "Pending", items: 4 },
  { id: "ORD-7825", customer: "David Smith", date: "5 hours ago", total: 349.00, status: "Cancelled", items: 1 },
];

export const customers = [
  { id: "CUST-001", name: "Alex Morgan", email: "alex@example.com", spent: 2450.00, orders: 12, lastActive: "Today" },
  { id: "CUST-002", name: "Sarah Jenkins", email: "sarah@example.com", spent: 980.00, orders: 3, lastActive: "Yesterday" },
  { id: "CUST-003", name: "Michael Chen", email: "michael@example.com", spent: 5600.00, orders: 24, lastActive: "2 days ago" },
  { id: "CUST-004", name: "Emily Blunt", email: "emily@example.com", spent: 120.00, orders: 1, lastActive: "1 week ago" },
  { id: "CUST-005", name: "David Smith", email: "david@example.com", spent: 3450.00, orders: 15, lastActive: "3 days ago" },
];

export const stats = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up" },
  { title: "Active Users", value: "+2350", change: "+180.1%", trend: "up" },
  { title: "Sales", value: "+12,234", change: "+19%", trend: "up" },
  { title: "Active Now", value: "+573", change: "+201", trend: "up" },
];

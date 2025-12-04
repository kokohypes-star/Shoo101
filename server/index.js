import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import runMigrations from "./migrations.js";
import { sessionActivityTracker } from "./middlewares/sessionActivityTracker.js";

// Route imports
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";
import orderRoutes from "./routes/orders.js";
import receiptRoutes from "./routes/receipts.js";

const app = express();

// Needed for __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------
// CORE MIDDLEWARE
// ------------------------------
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(sessionActivityTracker);

// ------------------------------
// DATABASE MIGRATIONS
// ------------------------------
runMigrations();

// ------------------------------
// API ROUTES
// ------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/receipt", receiptRoutes);

// ------------------------------
// SERVE STOREFRONT REACT BUILD
// ------------------------------
const clientPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientPath));

// Catch-all → React handles routing
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Storefront backend running on port ${PORT}`);
});

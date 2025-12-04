import { Router } from "express";
import {
  createOrder,
  getCustomerOrders,
  getOrderById
} from "../controllers/ordersController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Create order (customer must be logged in)
router.post("/create", authMiddleware, createOrder);

// Get all orders for logged-in customer
router.get("/", authMiddleware, getCustomerOrders);

// Get single order by ID
router.get("/:id", authMiddleware, getOrderById);

export default router;

import { Router } from "express";
import {
  signup,
  verifyEmail,
  getProfile
} from "../controllers/customersController.js";
import { authMiddleware, optionalAuth } from "../middlewares/authMiddleware.js";

const router = Router();

// Create account (email + phone)
router.post("/signup", signup);

// Verify email
router.get("/verify", verifyEmail);

// Logged-in customer profile
router.get("/me", authMiddleware, getProfile);

export default router;

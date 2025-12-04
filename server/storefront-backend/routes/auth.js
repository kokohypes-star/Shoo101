import { Router } from "express";
import { requestOTP, verifyOTP, logout } from "../controllers/authController.js";
import { optionalAuth, authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Request OTP
router.post("/otp/request", requestOTP);

// Verify OTP (login)
router.post("/otp/verify", verifyOTP);

// Logout (requires auth)
router.post("/logout", authMiddleware, logout);

export default router;

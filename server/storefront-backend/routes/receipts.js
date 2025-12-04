import { Router } from "express";
import {
  getReceiptHTML,
  getReceiptPDF
} from "../controllers/receiptsController.js";

const router = Router();

// HTML version → used by React page `/receipt?id=123`
router.get("/html/:id", getReceiptHTML);

// PDF version → used for "Download Receipt"
router.get("/pdf/:id", getReceiptPDF);

export default router;

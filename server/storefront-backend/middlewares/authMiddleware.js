import Session from "../models/Session.js";
import Customer from "../models/Customer.js";
import { verifyToken } from "../utils/tokenGenerator.js";

export async function authMiddleware(req, res, next) {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = tokenHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const sessionId = decoded.sessionId;
    const sessionCheck = Session.findValid(sessionId);

    if (!sessionCheck.valid) {
      return res.status(401).json({ error: sessionCheck.reason });
    }

    const session = sessionCheck.data;

    // Fetch customer
    const customer = Customer.findById(session.customer_id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    if (customer.blocked) {
      Session.delete(sessionId);
      return res.status(403).json({ error: "Your account is blocked" });
    }

    // Update activity to extend session
    Session.updateActivity(sessionId);
    Customer.updateLastSeen(customer.id);

    // Attach to request
    req.customerId = customer.id;
    req.customer = customer;
    req.sessionId = sessionId;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Server error in authentication" });
  }
}

// Optional Auth (for pages that work with OR without login)
export function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return next();

    const token = header.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) return next();

    const sessionId = decoded.sessionId;
    const sessionCheck = Session.findValid(sessionId);
    if (!sessionCheck.valid) return next();

    req.customerId = sessionCheck.data.customer_id;
    req.sessionId = sessionId;

    next();
  } catch (err) {
    return next();
  }
}

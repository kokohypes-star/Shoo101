import Session from "../models/Session.js";
import Customer from "../models/Customer.js";

export async function sessionActivityTracker(req, res, next) {
  try {
    // Must have sessionId (injected by authMiddleware)
    if (!req.sessionId || !req.customerId) {
      return next();
    }

    const session = Session.find(req.sessionId);
    if (!session) {
      return next(); // No valid session
    }

    const now = Date.now();
    const lastActivity = new Date(session.last_activity).getTime();
    const expiresAt = new Date(session.expires_at).getTime();

    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

    // If session expired (hard expiry)
    if (now > expiresAt) {
      Session.delete(req.sessionId);
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }

    // If user inactive for too long
    if (now - lastActivity > INACTIVITY_LIMIT) {
      Session.delete(req.sessionId);
      return res.status(401).json({ error: "Logged out due to inactivity." });
    }

    // Otherwise update last_activity
    Session.updateActivity(req.sessionId);

    // Update customer last_seen
    Customer.updateLastSeen(req.customerId);

  } catch (err) {
    console.error("Session activity tracker error:", err);
  }

  next();
}

const Customer = require("../models/Customer");
const { sendVerificationEmail } = require("../utils/emailSender");

// -------------------------------
// SIGN UP
// -------------------------------
exports.signup = (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email and phone required" });
    }

    // Check for duplicates (SQLite sync)
    if (Customer.isEmailTaken(email)) {
      return res.status(409).json({ error: "Email already registered" });
    }

    if (Customer.isPhoneTaken(phone)) {
      return res.status(409).json({ error: "Phone number already registered" });
    }

    // Create customer
    const customer = Customer.create(email, phone);

    // Send verification email
    sendVerificationEmail(email, customer.verification_token);

    return res.status(201).json({
      success: true,
      message: "Account created. Verification email sent.",
      customerId: customer.id,
    });
  } catch (err) {
    console.error("Error signing up:", err);
    return res.status(500).json({ error: "Failed to create account" });
  }
};

// -------------------------------
// EMAIL VERIFICATION
// -------------------------------
exports.verify = (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ error: "Verification token required" });
    }

    const customer = Customer.verify(token);

    if (!customer) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // sync to dashboard
    syncCustomerToDashboard(customer);

    return res.json({
      success: true,
      message: "Email verified successfully",
      customer: {
        id: customer.id,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (err) {
    console.error("Error verifying email:", err);
    return res.status(500).json({ error: "Failed to verify email" });
  }
};

// -------------------------------
// GET CUSTOMER PROFILE
// -------------------------------
exports.getProfile = (req, res) => {
  try {
    const customerId = req.customerId;
    if (!customerId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const customer = Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json({
      success: true,
      customer: {
        id: customer.id,
        email: customer.email,
        phone: customer.phone,
        verified: customer.verified,
        blocked: customer.blocked,
        totalOrders: customer.total_orders,
        totalSpent: customer.total_spent,
        lastSeen: customer.last_seen,
        createdAt: customer.created_at,
      },
    });
  } catch (err) {
    console.error("Error getting profile:", err);
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// -------------------------------
// SYNC CUSTOMER TO DASHBOARD
// -------------------------------
function syncCustomerToDashboard(customer) {
  try {
    const url = `${process.env.DASHBOARD_API_URL}/api/customers/sync`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DASHBOARD_API_SECRET}`,
      },
      body: JSON.stringify({
        id: customer.id,
        email: customer.email,
        phone: customer.phone,
        verified: customer.verified,
        totalOrders: customer.total_orders,
        totalSpent: customer.total_spent,
        lastSeen: customer.last_seen,
      }),
    })
      .then((r) => {
        if (!r.ok) console.error("Failed to sync customer to dashboard");
      })
      .catch((err) =>
        console.error("Error syncing customer to dashboard:", err)
      );
  } catch (err) {
    console.error("Dashboard sync fatal error:", err);
  }
}

module.exports = exports;

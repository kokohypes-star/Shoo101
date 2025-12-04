    import Customer from "../models/Customer.js";
    import OTP from "../models/OTP.js";
    import Session from "../models/Session.js";

    import { generateOTP } from "../utils/otpGenerator.js";
    import { sendOTPEmail } from "../utils/emailSender.js";
    import { generateToken } from "../utils/tokenGenerator.js";

    // =============================
    // REQUEST OTP
    // =============================
    export function requestOTP(req, res) {
      try {
        const { phone } = req.body;

        if (!phone) {
          return res.status(400).json({ error: "Phone number is required." });
        }

        const customer = Customer.findByPhone(phone);
        if (!customer) {
          return res.status(404).json({
            error: "Customer not found. Please sign up first.",
          });
        }

        if (customer.blocked) {
          return res
            .status(403)
            .json({ error: "Your account is blocked. Contact support." });
        }

        if (!customer.verified) {
          return res.status(403).json({
            error: "Please verify your email first.",
          });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiry = new Date(Date.now() + 10 * 60000).toISOString(); // 10 mins

        // Save OTP
        OTP.save(customer.id, otp, expiry);

        // Send email
        sendOTPEmail(customer.email, otp);

        res.json({
          success: true,
          message: "OTP sent to your email.",
          customerId: customer.id,
        });
      } catch (err) {
        console.error("Error requesting OTP:", err);
        res.status(500).json({ error: "Failed to send OTP." });
      }
    }

    // =============================
    // VERIFY OTP (LOGIN)
    // =============================
    export function verifyOTP(req, res) {
      try {
        const { customerId, otpCode } = req.body;

        if (!customerId || !otpCode) {
          return res
            .status(400)
            .json({ error: "Customer ID and OTP code are required." });
        }

        const customer = Customer.findById(customerId);
        if (!customer) {
          return res.status(404).json({ error: "Customer not found." });
        }

        const record = OTP.find(customerId, otpCode);
        if (!record) {
          return res.status(401).json({ error: "Invalid or expired OTP." });
        }

        // Check expiry
        if (new Date(record.expires_at).getTime() < Date.now()) {
          OTP.markUsed(record.id);
          return res.status(401).json({ error: "OTP expired." });
        }

        // Mark OTP used
        OTP.markUsed(record.id);

        // Create new session (30-min inactivity / hard expiry in model)
        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

        Session.create(sessionId, customerId, expiresAt);

        // Generate JWT containing BOTH customerId + sessionId
        const token = generateToken(customerId, sessionId);

        res.json({
          success: true,
          message: "Logged in successfully.",
          token,
          sessionId,
          customer: {
            id: customer.id,
            email: customer.email,
            phone: customer.phone,
          },
        });
      } catch (err) {
        console.error("Error verifying OTP:", err);
        res.status(500).json({ error: "Failed to verify OTP." });
      }
    }

    // =============================
    // LOGOUT
    // =============================
    export function logout(req, res) {
      try {
        const { sessionId } = req.body;

        if (!sessionId) {
          return res.status(400).json({ error: "Session ID is required." });
        }

        Session.delete(sessionId);

        res.json({ success: true, message: "Logged out successfully." });
      } catch (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ error: "Logout failed." });
      }
    }

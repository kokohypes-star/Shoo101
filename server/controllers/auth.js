// server/controllers/auth.js
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

// Setup email transport (use Gmail, Brevo, or Mailtrap)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function generateOTP() {
    return Math.floor(1000000 + Math.random() * 9000000).toString(); // 7 digits
}

exports.signup = (req, res) => {
    const { email, phone } = req.body;

    // Check if exists
    const exists = db.prepare("SELECT * FROM customers WHERE phone = ?").get(phone);
    if (exists) return res.status(400).json({ error: "Customer already exists" });

    const id = uuidv4();

    // Insert new customer with isVerified = 0
    db.prepare(`
        INSERT INTO customers (id, email, phone, isVerified)
        VALUES (?, ?, ?, 0)
    `).run(id, email, phone);

    // Send verification email
    const verifyLink = `${process.env.BASE_URL}/verify?email=${email}`;

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Verify Your Account",
        html: `
            <h2>Verify Your Account</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyLink}">Verify Now</a>
        `
    });

    res.json({ message: "Verification email sent" });
};

exports.verify = (req, res) => {
    const { email } = req.query;

    db.prepare("UPDATE customers SET isVerified = 1 WHERE email = ?")
      .run(email);

    res.send(`<h1>Your account has been verified! You can now sign in.</h1>`);
};

exports.requestOTP = (req, res) => {
    const { phone } = req.body;

    const customer = db.prepare("SELECT * FROM customers WHERE phone = ?").get(phone);
    if (!customer) return res.status(404).json({ error: "Account not found" });

    const otp = generateOTP();
    const expiresAt = Date.now() + (10 * 60 * 1000);

    // Save OTP
    db.prepare(`
        INSERT INTO otps (id, phone, code, expiresAt)
        VALUES (?, ?, ?, ?)
    `).run(uuidv4(), phone, otp, expiresAt);

    // Send OTP by email
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: customer.email,
        subject: "Your Login OTP",
        text: `Your OTP is ${otp}. It expires in 10 minutes.`
    });

    res.json({ message: "OTP sent" });
};

exports.verifyOTP = (req, res) => {
    const { phone, otp } = req.body;

    const record = db.prepare(`
        SELECT * FROM otps WHERE phone = ? ORDER BY expiresAt DESC LIMIT 1
    `).get(phone);

    if (!record) return res.status(400).json({ error: "OTP not found" });
    if (record.code !== otp) return res.status(400).json({ error: "Invalid OTP" });
    if (Date.now() > record.expiresAt) return res.status(400).json({ error: "OTP expired" });

    // Login success
    return res.json({ success: true, phone });
};

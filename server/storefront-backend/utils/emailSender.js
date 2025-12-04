// server/storefront-backend/utils/emailSender.js
import nodemailer from "nodemailer";

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASSWORD;
const STOREFRONT_URL = process.env.STOREFRONT_URL || "";

let transporter;

if (EMAIL_SERVICE) {
  transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
} else {
  // fallback to direct SMTP (configure via env)
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.example.com",
    port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
}

export async function sendVerificationEmail(email, verificationToken) {
  const verifyLink = `${STOREFRONT_URL}/verify?token=${verificationToken}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.4;color:#111">
      <h2>Welcome to SHOOBU</h2>
      <p>Click the button below to verify your email address and activate your account.</p>
      <p><a href="${verifyLink}" style="display:inline-block;padding:10px 16px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none">Verify Email</a></p>
      <p>If the button doesn't work, copy-paste this link in your browser:</p>
      <p style="font-size:13px;color:#555">${verifyLink}</p>
      <p style="color:#777;font-size:13px">This link expires in 24 hours.</p>
    </div>
  `;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Verify your SHOOBU account",
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendOTPEmail(email, otp) {
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.4;color:#111">
      <h2>Your SHOOBU login code</h2>
      <p>Use this code to sign in: <strong style="font-size:20px">${otp}</strong></p>
      <p style="color:#777;font-size:13px">The code expires in ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>
      <p style="color:#777;font-size:12px">Do not share this code with anyone.</p>
    </div>
  `;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Your SHOOBU login OTP",
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendReceiptEmail(email, orderData) {
  const link = `${STOREFRONT_URL}/receipt?id=${orderData.id}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.4;color:#111">
      <h2>Thanks for your order!</h2>
      <p>Order #${orderData.id} — Total: ${formatNGN(orderData.total)}</p>
      <p><a href="${link}" style="display:inline-block;padding:10px 12px;background:#16a34a;color:#fff;border-radius:6px;text-decoration:none">View Receipt</a></p>
    </div>
  `;
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: `Your Order Receipt #${orderData.id}`,
    html,
  };
  return transporter.sendMail(mailOptions);
}

function formatNGN(n) {
  return `₦${Number(n || 0).toLocaleString("en-NG")}`;
}

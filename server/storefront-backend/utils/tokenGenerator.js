import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

// Create JWT containing BOTH customer + session IDs
export function generateToken(customerId, sessionId) {
  return jwt.sign(
    {
      customerId,
      sessionId,
    },
    SECRET,
    { expiresIn: "7d" } // Token lifespan (does NOT control session expiry)
  );
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

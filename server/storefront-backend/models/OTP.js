import db from "../config/db.js";

export default {
  // SAVE NEW OTP
  save(customer_id, otp_code, expiryTimestamp) {
    // Remove previous OTPs for safety
    db.prepare(`DELETE FROM customers_otp WHERE customer_id = ?`).run(customer_id);

    return db
      .prepare(
        `INSERT INTO customers_otp (customer_id, otp_code, expires_at, used)
         VALUES (?, ?, ?, 0)`
      )
      .run(customer_id, otp_code, expiryTimestamp);
  },

  // FIND + VALIDATE OTP
  validate(customer_id, otp_code) {
    const row = db
      .prepare(
        `SELECT * FROM customers_otp
         WHERE customer_id = ?
         AND otp_code = ?
         AND used = 0
         ORDER BY created_at DESC
         LIMIT 1`
      )
      .get(customer_id, otp_code);

    if (!row) {
      return { valid: false, reason: "Invalid OTP" };
    }

    const now = Date.now();
    const expiry = new Date(row.expires_at).getTime();

    if (now > expiry) {
      return { valid: false, reason: "OTP expired" };
    }

    return { valid: true, data: row };
  },

  // MARK OTP AS USED
  markUsed(id) {
    return db.prepare(`UPDATE customers_otp SET used = 1 WHERE id = ?`).run(id);
  },

  // (Optional) CLEANUP OLD OTPs
  cleanup() {
    db.prepare(
      `DELETE FROM customers_otp WHERE used = 1 OR expires_at < datetime('now')`
    ).run();
  }
};

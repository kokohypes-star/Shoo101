import db from "../config/db.js";
import crypto from "crypto";

export default {
  // -------------------------------
  // CREATE CUSTOMER
  // -------------------------------
  create(email, phone) {
    const token = crypto.randomBytes(20).toString("hex");

    const result = db
      .prepare(
        `INSERT INTO customers (email, phone, verification_token)
         VALUES (?, ?, ?)`
      )
      .run(email, phone, token);

    return {
      id: result.lastInsertRowid,
      email,
      phone,
      verification_token: token,
      verified: 0,
      blocked: 0,
      total_orders: 0,
      total_spent: 0,
      last_seen: null,
    };
  },

  // -------------------------------
  // LOOKUPS
  -------------------------------
  findById(id) {
    return db.prepare(`SELECT * FROM customers WHERE id = ?`).get(id);
  },

  findByEmail(email) {
    return db.prepare(`SELECT * FROM customers WHERE email = ?`).get(email);
  },

  findByPhone(phone) {
    return db.prepare(`SELECT * FROM customers WHERE phone = ?`).get(phone);
  },

  findByToken(token) {
    return db
      .prepare(`SELECT * FROM customers WHERE verification_token = ?`)
      .get(token);
  },

  // -------------------------------
  // EMAIL VERIFICATION
  // -------------------------------
  verify(token) {
    const customer = this.findByToken(token);
    if (!customer) return null;

    db.prepare(`UPDATE customers SET verified = 1 WHERE id = ?`).run(
      customer.id
    );

    return this.findById(customer.id);
  },

  // -------------------------------
  // VALIDATION HELPERS
  // -------------------------------
  isEmailTaken(email) {
    const row = db
      .prepare(`SELECT id FROM customers WHERE email = ?`)
      .get(email);
    return !!row;
  },

  isPhoneTaken(phone) {
    const row = db
      .prepare(`SELECT id FROM customers WHERE phone = ?`)
      .get(phone);
    return !!row;
  },

  // -------------------------------
  // ACCOUNT STATUS
  // -------------------------------
  block(id) {
    return db.prepare(`UPDATE customers SET blocked = 1 WHERE id = ?`).run(id);
  },

  unblock(id) {
    return db.prepare(`UPDATE customers SET blocked = 0 WHERE id = ?`).run(id);
  },

  updateLastSeen(id) {
    return db
      .prepare(
        `UPDATE customers SET last_seen = datetime('now') WHERE id = ?`
      )
      .run(id);
  },

  // -------------------------------
  // ORDER STATISTICS
  // -------------------------------
  incrementOrderStats(id, amount) {
    db.prepare(
      `
      UPDATE customers
      SET total_orders = total_orders + 1,
          total_spent = total_spent + ?
      WHERE id = ?
    `
    ).run(amount, id);
  },
};

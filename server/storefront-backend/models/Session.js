import db from "../config/db.js";

export default {
  create(session_id, customer_id, expires) {
    return db
      .prepare(
        `INSERT INTO sessions (id, customer_id, last_activity, expires_at)
         VALUES (?, ?, datetime('now'), ?)`
      )
      .run(session_id, customer_id, expires);
  },

  find(session_id) {
    return db
      .prepare(`SELECT * FROM sessions WHERE id = ?`)
      .get(session_id);
  },

  updateActivity(session_id) {
    return db
      .prepare(
        `UPDATE sessions SET last_activity = datetime('now') WHERE id = ?`
      )
      .run(session_id);
  },

  delete(session_id) {
    return db.prepare(`DELETE FROM sessions WHERE id = ?`).run(session_id);
  }
};

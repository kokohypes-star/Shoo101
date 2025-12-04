import db from "../config/db.js";

export default {
  // -----------------------------------
  // CREATE ORDER
  // -----------------------------------
  create(customer_id, items, subtotal, total, shipping = 0, tax = 0, status = "Processing") {
    const result = db
      .prepare(
        `INSERT INTO orders (
          customer_id,
          items,
          subtotal,
          shipping,
          tax,
          total,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        customer_id,
        JSON.stringify(items),
        subtotal,
        shipping,
        tax,
        total,
        status
      );

    return {
      id: result.lastInsertRowid,
      customer_id,
      items,
      subtotal,
      shipping,
      tax,
      total,
      status,
    };
  },

  // -----------------------------------
  // FIND ORDER BY ID
  // -----------------------------------
  findById(id) {
    const row = db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id);

    if (!row) return null;

    return {
      ...row,
      items: JSON.parse(row.items),
    };
  },

  // -----------------------------------
  // LIST ALL ORDERS FOR A CUSTOMER
  // -----------------------------------
  findByCustomer(customer_id) {
    const rows = db
      .prepare(`SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC`)
      .all(customer_id);

    return rows.map((row) => ({
      ...row,
      items: JSON.parse(row.items),
    }));
  },

  // -----------------------------------
  // UPDATE ORDER STATUS
  // -----------------------------------
  updateStatus(id, status) {
    return db
      .prepare(`UPDATE orders SET status = ? WHERE id = ?`)
      .run(status, id);
  },

  // -----------------------------------
  // ADD SHIPPING / TAX ADJUSTMENTS
  // -----------------------------------
  updateTotals(id, subtotal, shipping, tax, total) {
    return db
      .prepare(
        `UPDATE orders 
         SET subtotal = ?, shipping = ?, tax = ?, total = ?
         WHERE id = ?`
      )
      .run(subtotal, shipping, tax, total, id);
  },
};

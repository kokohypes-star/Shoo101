import Database from "better-sqlite3";

const db = new Database("database.sqlite");

// Enable foreign keys
db.pragma("foreign_keys = ON");

// =============================
// CUSTOMERS TABLE
// =============================
db.prepare(`
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    verified INTEGER DEFAULT 0,                -- 0 = not verified, 1 = verified
    verification_token TEXT,
    blocked INTEGER DEFAULT 0,                -- 0 = active, 1 = blocked
    total_orders INTEGER DEFAULT 0,
    total_spent REAL DEFAULT 0,
    last_seen TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
`).run();

// Index for fast login & lookup
db.prepare(`CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers (phone);`).run();


// =============================
// OTP TABLE
// =============================
db.prepare(`
CREATE TABLE IF NOT EXISTS customers_otp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    otp_code TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER DEFAULT 0,                   -- 0 = not used, 1 = used
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
)
`).run();

// Fast lookup during login
db.prepare(`CREATE INDEX IF NOT EXISTS idx_otp_customer ON customers_otp (customer_id);`).run();


// =============================
// ORDERS TABLE
// =============================
db.prepare(`
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    items TEXT NOT NULL,                      -- JSON string
    subtotal REAL NOT NULL,
    total REAL NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
)
`).run();

db.prepare(`CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders (customer_id);`).run();


// =============================
// SESSIONS TABLE
// =============================
db.prepare(`
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,                      -- session token
    customer_id INTEGER NOT NULL,
    last_activity TEXT,                       -- timestamp for tracking idle timeout
    expires_at TEXT,                          -- session expiration timestamp
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
)
`).run();

db.prepare(`CREATE INDEX IF NOT EXISTS idx_sessions_customer ON sessions (customer_id);`).run();


export default db;

// server/migrations.js
const db = require("./db");

function runMigrations() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS customers (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            isVerified INTEGER DEFAULT 0,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS otps (
            id TEXT PRIMARY KEY,
            phone TEXT NOT NULL,
            code TEXT NOT NULL,
            expiresAt TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            customerId TEXT NOT NULL,
            items TEXT NOT NULL,
            total REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(customerId) REFERENCES customers(id)
        );
    `);

    console.log("✅ SQLite migrations complete");
}

module.exports = runMigrations;

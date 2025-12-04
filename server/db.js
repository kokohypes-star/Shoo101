// server/db.js
const Database = require("better-sqlite3");

// Create or open database file
const db = new Database("./db/database.sqlite", { verbose: console.log });

// Enable foreign keys
db.exec("PRAGMA foreign_keys = ON;");

module.exports = db;

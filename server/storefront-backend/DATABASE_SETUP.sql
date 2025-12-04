-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  blocked BOOLEAN DEFAULT false,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  last_seen TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OTP table
CREATE TABLE IF NOT EXISTS customers_otp (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  otp_code VARCHAR(10) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  last_activity TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster queries
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_otp_customer_id ON customers_otp(customer_id);
CREATE INDEX idx_sessions_customer_id ON sessions(customer_id);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pool = require('./config/database');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: parseInt(process.env.SESSION_TIMEOUT_MINUTES) * 60 * 1000
  }
}));

// Activity tracker middleware
const { sessionActivityTracker } = require('./middlewares/sessionActivityTracker');
app.use(sessionActivityTracker);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/otp', require('./routes/otp'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/receipts', require('./routes/receipts'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Database connection check
pool.query('SELECT 1')
  .then(() => {
    console.log('✓ Database connected');
    app.listen(PORT, () => {
      console.log(`✓ Storefront backend running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('✗ Database connection failed:', err);
    process.exit(1);
  });

module.exports = app;

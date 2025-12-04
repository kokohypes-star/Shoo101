# SHOOBU Storefront Backend - Setup Guide

## Overview
This is a complete Node/Express backend for the SHOOBU storefront system. It handles:
- Customer authentication & OTP login
- Email verification
- Order management
- Receipt generation
- Dashboard synchronization

## Prerequisites
- Node.js 14+
- PostgreSQL 12+
- Gmail account (for email service)

## Installation

### 1. Install Dependencies
```bash
cd server/storefront-backend
npm install
```

### 2. Setup Database

#### Option A: Using psql
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE shoobu_storefront;

-- Connect to the new database
\c shoobu_storefront

-- Run the setup script
\i DATABASE_SETUP.sql
```

#### Option B: Using Node
```bash
npm run setup-db
```

### 3. Configure Environment Variables

Copy and edit `.env` file:
```bash
cp .env .env.local
```

Edit `.env.local` with your values:
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shoobu_storefront
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRY=7d

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_specific_password  # Not your regular password

# Dashboard Integration
DASHBOARD_API_URL=http://localhost:5000
DASHBOARD_API_SECRET=your_dashboard_secret

# OTP Settings
OTP_EXPIRY_MINUTES=10
OTP_LENGTH=7

# Session
SESSION_SECRET=your_session_secret
SESSION_TIMEOUT_MINUTES=30

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5000

# Logging
LOG_LEVEL=info
STOREFRONT_URL=http://localhost:3000
```

### 4. Gmail Setup (for OTP emails)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use this App Password in EMAIL_PASSWORD

### 5. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:3001`

## API Endpoints

### Customer Endpoints
- `POST /api/customers/signup` - Register new customer
- `GET /api/customers/verify?token=XXX` - Verify email
- `GET /api/customers/me` - Get profile (requires auth)

### Auth/OTP Endpoints
- `POST /api/auth/request-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/logout` - Logout

### Order Endpoints
- `POST /api/orders/create` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - List customer orders

### Receipt Endpoints
- `GET /api/receipts/:id` - Get receipt

### Admin Endpoints
- `POST /api/admin/block/:customerId` - Block customer
- `POST /api/admin/unblock/:customerId` - Unblock customer

## Example API Calls

### Sign Up
```bash
curl -X POST http://localhost:3001/api/customers/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "phone": "+1234567890"
  }'
```

### Request OTP
```bash
curl -X POST http://localhost:3001/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567890"
  }'
```

### Verify OTP
```bash
curl -X POST http://localhost:3001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "otpCode": "1234567"
  }'
```

### Create Order
```bash
curl -X POST http://localhost:3001/api/orders/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "customerId": 1,
    "items": [
      {
        "id": 1,
        "name": "Product Name",
        "quantity": 2,
        "price": 29.99
      }
    ],
    "subtotal": 59.98,
    "shipping": 5.00,
    "tax": 4.50,
    "total": 69.48
  }'
```

## Deployment to Replit

1. Add files to your Replit project
2. Create `.env` with production values
3. Setup PostgreSQL database on Replit (use Replit Database)
4. Add workflow to run `npm install && npm start` in `/server/storefront-backend`
5. Backend will be accessible at `https://your-replit-url.replit.dev`

## Troubleshooting

**Database connection error:**
- Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env
- Ensure PostgreSQL is running: `pg_isready`

**Email not sending:**
- Verify Gmail App Password is correct
- Enable "Less secure app access" if using regular password
- Check EMAIL_USER and EMAIL_PASSWORD

**OTP not received:**
- Check SPAM folder
- Verify EMAIL_SERVICE and EMAIL_USER settings
- Check OTP_EXPIRY_MINUTES (default 10 min)

**CORS errors:**
- Add storefront URL to CORS_ORIGIN in .env
- Separate multiple URLs with commas

## File Structure
```
/storefront-backend
├── server.js
├── package.json
├── .env
├── DATABASE_SETUP.sql
├── /config
│   └── database.js
├── /models
│   ├── Customer.js
│   ├── OTP.js
│   ├── Order.js
│   └── Session.js
├── /controllers
│   ├── authController.js
│   ├── customersController.js
│   ├── ordersController.js
│   └── receiptsController.js
├── /routes
│   ├── auth.js
│   ├── customers.js
│   ├── orders.js
│   ├── receipts.js
│   └── admin.js
├── /middlewares
│   ├── authMiddleware.js
│   └── sessionActivityTracker.js
└── /utils
    ├── otpGenerator.js
    ├── tokenGenerator.js
    ├── emailSender.js
    └── receiptGenerator.js
```

## Next Steps

1. Install all dependencies: `npm install`
2. Setup database using DATABASE_SETUP.sql
3. Configure .env with your values
4. Start server: `npm run dev`
5. Build storefront frontend pages
6. Integrate with dashboard

## Support
For issues, check logs and error messages. Enable debug mode by setting `LOG_LEVEL=debug` in .env.

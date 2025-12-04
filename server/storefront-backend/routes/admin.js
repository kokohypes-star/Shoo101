const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Block customer
router.post('/block/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { adminSecret } = req.body;

    // Verify admin secret from dashboard
    if (adminSecret !== process.env.DASHBOARD_API_SECRET) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const customer = await Customer.block(customerId);
    res.json({
      success: true,
      message: 'Customer blocked',
      customer
    });
  } catch (err) {
    console.error('Error blocking customer:', err);
    res.status(500).json({ error: 'Failed to block customer' });
  }
});

// Unblock customer
router.post('/unblock/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { adminSecret } = req.body;

    // Verify admin secret from dashboard
    if (adminSecret !== process.env.DASHBOARD_API_SECRET) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const customer = await Customer.unblock(customerId);
    res.json({
      success: true,
      message: 'Customer unblocked',
      customer
    });
  } catch (err) {
    console.error('Error unblocking customer:', err);
    res.status(500).json({ error: 'Failed to unblock customer' });
  }
});

module.exports = router;

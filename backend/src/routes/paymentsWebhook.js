// routes/paymentsWebhook.js
const express = require('express');
const Stripe = require('stripe');
const Commande = require('../models/commandes');

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY manquante (Railway).');
  return new Stripe(key);
}

// raw parser requis pour la signature Stripe
const rawParser = express.raw({ type: 'application/json' });

module.exports = [rawParser, async (req, res) => {
  let stripe;
  try {
    stripe = getStripe();
  } catch (e) {
    console.error('[Webhook] ', e.message);
    return res.status(500).send('Stripe non configuré');
  }

  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const { orderId, kind } = pi.metadata || {};
    if (orderId && kind === 'deposit') {
      await Commande.findByIdAndUpdate(orderId, {
        paymentStatus: 'deposit_paid',
        stripePaymentIntentId: pi.id
      });
    }
  }

  return res.json({ received: true });
}];

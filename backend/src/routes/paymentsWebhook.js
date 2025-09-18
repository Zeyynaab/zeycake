// routes/paymentsWebhook.js
const express = require('express');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Commande = require('../models/commandes');

// raw parser requis pour la signature Stripe
const rawParser = express.raw({ type: 'application/json' });

module.exports = [rawParser, async (req, res) => {
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
    // (optionnel) si tu fais plus tard un PaymentIntent pour le solde:
    // if (orderId && kind === 'balance') { ... paymentStatus:'paid' ... }
  }

  return res.json({ received: true });
}];

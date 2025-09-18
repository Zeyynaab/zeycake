// routes/payments.js
const router = require('express').Router();
const Stripe = require('stripe');

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY manquante (Railway).');
  return new Stripe(key);
}

const CURRENCY = process.env.CURRENCY || 'cad';

// Création du PaymentIntent pour l'acompte
router.post('/create-deposit-intent', async (req, res, next) => {
  try {
    const { orderId, depositCents } = req.body;
    if (!orderId || !depositCents) {
      return res.status(400).json({ message: 'orderId et depositCents requis' });
    }

    const stripe = getStripe();

    const intent = await stripe.paymentIntents.create({
      amount: depositCents,
      currency: CURRENCY,
      automatic_payment_methods: { enabled: true },
      metadata: { orderId, kind: 'deposit' }
    });

    return res.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;

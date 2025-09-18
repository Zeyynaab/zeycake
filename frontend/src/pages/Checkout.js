import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/global.css';
import { passerCommande, createDepositIntent } from '../api/api';

// Stripe
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Vérification JWT
function isTokenValid() {
  const stored = JSON.parse(localStorage.getItem('user'));
  const token = stored?.token;
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Formulaire de paiement de l'acompte
function DepositForm({ amountCents, onPaid }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setErr('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: 'if_required',
    });

    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }
    if (paymentIntent?.status === 'succeeded') {
      onPaid();
    }
  };

  return (
    <form onSubmit={handlePay} className="checkout-form">
      <div className="stripe-card">
        <PaymentElement />
      </div>
      {err && <div className="notification error">{err}</div>}
      <button type="submit" className="checkout-btn" disabled={!stripe || loading}>
        {loading ? 'Traitement…' : `Payer l’acompte ${(amountCents / 100).toFixed(2)} $`}
      </button>
    </form>
  );
}

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const [dateRecuperation, setDateRecuperation] = useState('');
  const navigate = useNavigate();

  // Nouveaux états pour le paiement
  const [step, setStep] = useState('collect');            // 'collect' -> collecte infos / 'deposit' -> paiement acompte
  const [orderInfo, setOrderInfo] = useState(null);       // commande renvoyée par le back (avec depositCents)
  const [clientSecret, setClientSecret] = useState(null); // clientSecret Stripe

  useEffect(() => {
    if (!isTokenValid()) {
      navigate('/auth');
    }
  }, [navigate]);

  // Charger l'utilisateur une seule fois
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
      setCart(storedCart);
    }
  }, [user]);

  const total = cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !adresse || cart.length === 0) return;

    const commande = {
      clientId: user?._id,
      produits: cart.map((p) => ({ nom: p.nom, qte: p.quantity, prix: p.prix })),
      total: parseFloat(total.toFixed(2)),
      commentaires,
      dateRecuperation,
      adresse,
    };

    try {
      // 1) Crée la commande -> le back calcule deposit/balance et renvoie depositCents
      const { data } = await passerCommande(commande);
      setOrderInfo(data);

      // 2) Demande au back de créer le PaymentIntent d'acompte -> récupère le clientSecret
      const intent = await createDepositIntent({
        orderId: data._id,
        depositCents: data.depositCents,
      });
      setClientSecret(intent.data.clientSecret);

      // 3) Passe à l'étape paiement
      setStep('deposit');
    } catch (err) {
      console.error('Réponse API :', err.response?.data || err.message);
      alert('Erreur : ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="checkout">
      <h2>Passer à la caisse</h2>

      {step === 'collect' && (
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="text"
            placeholder="Nom complet"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Adresse de livraison"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
          <label>Date de récupération</label>
          <input
            type="date"
            value={dateRecuperation}
            onChange={(e) => setDateRecuperation(e.target.value)}
            required
          />
          <textarea
            placeholder="Commentaires (ex: sans noix, récupérer le 20 juillet...)"
            value={commentaires}
            onChange={(e) => setCommentaires(e.target.value)}
            rows={4}
          />

          <p className="checkout-total">Total : {total.toFixed(2)} $</p>
          <button type="submit" className="checkout-btn">Confirmer & payer l’acompte (40%)</button>
        </form>
      )}

      {step === 'deposit' && orderInfo && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: 'flat', variables: { borderRadius: '12px' } }
          }}
        >
          <DepositForm
            amountCents={orderInfo.depositCents}
            onPaid={() => {
              if (user) localStorage.removeItem(`cart_${user._id}`); // vider le panier après succès
              setCart([]);
              navigate('/orders');
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;

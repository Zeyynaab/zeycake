import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/global.css';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !adresse || cart.length === 0) return;

    const commande = {
      nomClient: nom,
      adresse,
      produits: cart.map((p) => ({
        produitId: p._id,
        quantite: p.quantity,
      })),
      total: total.toFixed(2),
    };

    try {
      const response = await fetch('http://localhost:5000/api/commandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commande),
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        navigate('/orders');
      } else {
        alert('Erreur lors de la commande');
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  return (
    <div className="checkout">
      <h2>Passer à la caisse</h2>
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
        <p className="checkout-total">Total : {total.toFixed(2)} €</p>
        <button type="submit" className="checkout-btn">Confirmer la commande</button>
      </form>
    </div>
  );
};

export default Checkout;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/global.css';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const [dateRecuperation, setDateRecuperation] = useState('');
  const navigate = useNavigate();

  // Récupération de l'utilisateur connecté
  //const user = JSON.parse(localStorage.getItem('user'));
 
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
      produits: cart.map((p) => ({
        nom: p.nom,
        qte: p.quantity,
        prix: p.prix,
      })),
      total: parseFloat(total.toFixed(2)),
      commentaires,
      dateRecuperation,
      adresse,
    };

    try {
      ///console.log("Données envoyées à l'API :", commande);
      //console.log("🔐 TOKEN utilisé :", localStorage.getItem('token'));
      //console.log("📦 Données commande :", commande);

      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5050/api/commandes', commande, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //vider le panier specifique a l'user
      localStorage.removeItem(`cart_${user._id}`);
      setCart([]);

      navigate('/orders');
    } catch (err) {
      console.error('Erreur lors de la commande:', err.response?.data || err.message);
      alert('Erreur lors de la commande');
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
        <button type="submit" className="checkout-btn">Confirmer la commande</button>
      </form>
    </div>
  );
};

export default Checkout;

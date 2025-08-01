import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/global.css';
//import axios from 'axios';
import { passerCommande } from '../api/api'; // ✅ NEW

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
const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const [dateRecuperation, setDateRecuperation] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
  if (!isTokenValid()) {
    navigate('/auth');
  }
}, [navigate]);

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
console.log(
  '🔐 Token via key "token":',
  localStorage.getItem('token'),
  '— Token via user.token:',
  JSON.parse(localStorage.getItem('user'))?.token
);
console.log('📤 Payload commande :', commande);

    try {
      await passerCommande(commande);

    //vider le panier specifique a l'user
      localStorage.removeItem(`cart_${user._id}`);
      setCart([]);

      navigate('/orders');
    } catch (err) {
      console.error('Statut :', err.response?.status);
   console.error('Réponse API :', err.response?.data);
   alert('Erreur : ' + (err.response?.data.message || err.message));
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

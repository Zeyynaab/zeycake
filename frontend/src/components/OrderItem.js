import React from 'react';
import '../style/global.css';
import axios from 'axios';

const OrderItem = ({ order }) => {
  // 🔴 Déplacer ici
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Supprimer cette commande ?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5050/api/commandes/${order._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Commande supprimée avec succès.');
      window.location.reload();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
      alert("Impossible de supprimer la commande");
    }
  };
   console.log("🧾 Commande ID:", order._id);
   console.log("🔐 Utilisateur connecté:", JSON.parse(localStorage.getItem('user')));
   console.log("👤 ID du client de la commande:", order.clientId);
  return (
    <div className="order-item">
      <h4>Commande #{order._id}</h4>
      <p>Client : {order.client?.nom}{order.clientId?.prenom}</p>
      <p>Email : {order.clientId?.email}</p>
      <p>Date de récupération : {new Date(order.dateRecuperation).toLocaleDateString()}</p>
      <p>Statut : {order.statut}</p>
      <p>Adresse : {order.adresse}</p>
      <ul>
        {order.produits.map((p, index) => (
          <li key={index}>
            {p.nom} – Quantité : {p.qte}
          </li>
        ))}
      </ul>
      <p>Total : {order.total} $</p>

      {/* ✅ Le bouton de suppression */}
      <button onClick={handleDelete} className="delete-btn">🗑️ Supprimer la commande</button>
    </div>
  );
};

export default OrderItem;

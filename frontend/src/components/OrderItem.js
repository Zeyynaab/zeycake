import React from 'react';
import '../style/global.css';

const OrderItem = ({ order }) => {
  const deposit = typeof order.depositCents === 'number'
    ? (order.depositCents / 100).toFixed(2)
    : (order.total && order.total * 0.4).toFixed(2);

  const balance = typeof order.balanceCents === 'number'
    ? (order.balanceCents / 100).toFixed(2)
    : (order.total && (order.total - order.total * 0.4)).toFixed(2);

  const pickup = order.dateRecuperation
    ? new Date(order.dateRecuperation).toLocaleDateString()
    : 'Non défini';

  return (
    <div className="order-item">
      <h4>Commande #{order._id}</h4>

      <p>Client : {order.clientId?.nom} {order.clientId?.prenom}</p>
      <p>Email : {order.clientId?.email}</p>

      <p>Date de récupération : {pickup}</p>
      <p>Statut commande : {order.statut}</p>
      <p>Adresse : {order.adresse}</p>

      <ul>
        {order.produits?.map((p, index) => (
          <li key={index}>
            {p.nom} – Quantité : {p.qte}
          </li>
        ))}
      </ul>

      <p>Total : {order.total} $</p>

      <div style={{ marginTop: 8 }}>
        <p><strong>Statut paiement :</strong> {order.paymentStatus || 'deposit_required'}</p>
        <p><strong>Acompte payé :</strong> {deposit} $</p>
        <p><strong>Montant restant :</strong> {balance} $</p>
      </div>
    </div>
  );
};

export default OrderItem;

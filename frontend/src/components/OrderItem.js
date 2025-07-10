import React from 'react';
import '../style/global.css';

const OrderItem = ({ order }) => {
  return (
    <div className="order-item">
      <h4>Commande #{order._id}</h4>
      <p>Client : {order.nomClient}</p>
      <p>Adresse : {order.adresse}</p>
      <ul>
        {order.produits.map((p, index) => (
          <li key={index}>
            {p.nom} – Quantité : {p.quantite}
          </li>
        ))}
      </ul>
      <p>Total : {order.total} €</p>
    </div>
  );
};

export default OrderItem;

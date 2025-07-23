import React from 'react';
import '../style/global.css';
//import API from '../api/api';

const OrderItem = ({ order, onDelete }) => {

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
   </div>
  );
};

export default OrderItem;

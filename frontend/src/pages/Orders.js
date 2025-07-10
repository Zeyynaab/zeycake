import React, { useEffect, useState } from 'react';
import OrderItem from '../components/OrderItem';
import '../style/global.css';
import PageBanner from '../components/PageBanner';
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/commandes')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Erreur lors du chargement des commandes:', err));
  }, []);

  return (
      <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Vos commandes"/>
      <div className="orders">
        <h2>Mes Commandes</h2>
        {orders.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;

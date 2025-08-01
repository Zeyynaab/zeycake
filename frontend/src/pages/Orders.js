// src/pages/Orders.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItem from '../components/OrderItem';
import '../style/global.css';
import PageBanner from '../components/PageBanner';
import { fetchCommandesClient } from '../api/api';

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

const Orders = () => {
  const navigate = useNavigate();

  // Redirection si pas de token ou expiré
  useEffect(() => {
    if (!isTokenValid()) {
      navigate('/auth');
    }
  }, [navigate]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCommandesClient()
      .then((res) => {
        console.log('📦 Payload commandes :', res.data);
        setOrders(res.data.commandes || res.data);
      })
      .catch((err) =>
        console.error(
          'Erreur lors du chargement des commandes:',
          err.responses?.status,
          err.response?.data || err.message
        )
      );
  }, []);

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Vos commandes" />
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

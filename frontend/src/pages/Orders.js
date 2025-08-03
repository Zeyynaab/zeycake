import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
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
  //const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasValidToken = isTokenValid();

  useEffect(() => {
    if (!hasValidToken) {
      // pas de redirection : on affiche "Aucune commande" plus bas
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetchCommandesClient();
        console.log('📦 Payload commandes :', res.data);
        setOrders(res.data.commandes || res.data);
      } catch (err) {
        console.error(
          'Erreur lors du chargement des commandes:',
          err.response?.status,
          err.response?.data || err.message
        );
        if (err.response?.status === 401) {
          // token invalide ou expiré : on le nettoie
          localStorage.removeItem('user');
          setError({ message: 'Session invalide ou expirée. Vous pouvez vous reconnecter.' });
        } else {
          setError({ message: 'Impossible de charger les commandes.' });
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hasValidToken]);

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Vos commandes" />
      <div className="orders">
        <h2>Mes Commandes</h2>

        {loading && <p>Chargement...</p>}

        {!loading && error && (
          <div className="notification error">{error.message}</div>
        )}

        {!loading && !hasValidToken && !error && (
          <p>Aucune commande trouvée.</p>
        )}

        {!loading && hasValidToken && orders.length === 0 && !error && (
          <p>Aucune commande trouvée.</p>
        )}

        {!loading && orders.length > 0 && (
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

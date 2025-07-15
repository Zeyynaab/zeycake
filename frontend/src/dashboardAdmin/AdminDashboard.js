import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // ou ton useContext auth

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/'); // Redirige vers l'accueil si pas admin
    }
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">
      <h1>Tableau de Bord Admin</h1>
      <p>Bienvenue, {user?.nom} 👋</p>

      <div className="admin-links">
        <Link to="/admin/produits">🧁 Gérer les Produits</Link>
        <Link to="/admin/clients">👥 Gérer les Clients</Link>
        <Link to="/admin/commandes">📦 Gérer les Commandes</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

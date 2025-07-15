// src/components/AdminNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../dashboardAdmin/Dashboard.css';


function AdminNavbar() {
  const navigate = useNavigate();

  const handleSwitchToClient = () => {
    navigate('/products'); // ou "/" selon ton choix
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">👩‍🍳 Admin ZeyCake</div>
      <ul className="admin-navbar-links">
        <li><Link to="/admin">🏠 Dashboard</Link></li>
        <li><Link to="/admin/produits">🧁 Produits</Link></li>
        <li><Link to="/admin/ingredients">🥚 Ingrédients</Link></li>
        <li><Link to="/admin/commandes">📦 Commandes</Link></li>
        <li><Link to="/admin/clients">👥 Clients</Link></li>
      </ul>
      <button className="admin-navbar-switch" onClick={handleSwitchToClient}>
        🔁 Passer en mode client
      </button>
    </nav>
  );
}

export default AdminNavbar;

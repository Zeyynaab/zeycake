import {Link } from 'react-router-dom';
import './Dashboard.css';

function AdminDashboard() {
  
  const admin = JSON.parse(localStorage.getItem('admin')); // ou ton useContext auth

  return (
    <div className="admin-dashboard">
      <h1>Tableau de Bord Admin</h1>
      <p>Bienvenue, {admin?.nom} </p>

      <div className="admin-links">
        <Link to="/admin/produits">🧁 Gérer les Produits</Link>
        <Link to="/admin/clients">👥 Gérer les Clients</Link>
        <Link to="/admin/commandes">📦 Gérer les Commandes</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

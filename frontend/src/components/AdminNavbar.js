import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../dashboardAdmin/Dashboard.css';
import { FaHome, FaBoxOpen, FaUser,FaSignOutAlt,FaClipboardList, FaExchangeAlt,FaUsers} from 'react-icons/fa';
import { GiCupcake } from 'react-icons/gi';




function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compteOpen, setCompteOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardOnly = location.pathname === '/admin';


  const handleSwitchToClient = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-navbar-logo"><FaUser className="icon" /> Admin ZeyCake
</div>

        <button
          className="admin-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`admin-navbar-links ${menuOpen ? 'active' : ''}`}>
  {!isDashboardOnly && (
    <>
      <li><Link to="/admin"><FaHome className="icon" /> Dashboard</Link></li>
      <li><Link to="/admin/produits"><GiCupcake className="icon" /> Produits</Link></li>
      <li><Link to="/admin/ingredients"><FaClipboardList className="icon" /> Ingrédients</Link></li>
      <li><Link to="/admin/commandes"><FaBoxOpen className="icon" /> Commandes</Link></li>
      <li><Link to="/admin/clients"><FaUsers className="icon" /> Clients</Link></li>

      {/* Bloc "Mon compte" uniquement si on n’est pas sur le Dashboard */}
      <li className="compte-dropdown" onClick={() => setCompteOpen(!compteOpen)}>
        <span className="compte-link">Mon compte ▾</span>
        {compteOpen && (
          <ul className="compte-menu">
            <li><button onClick={handleSwitchToClient}><FaExchangeAlt className="icon" /> Mode client</button></li>
            <li><button onClick={handleLogout}><FaSignOutAlt className="icon" /> Déconnexion</button></li>
          </ul>
        )}
      </li>
    </>
  )}

  {/* Liens visibles même sur /admin */}
  {isDashboardOnly && (
    <>
      <li><button onClick={handleSwitchToClient}><FaExchangeAlt className="icon" /> Mode client</button></li>
      <li><button onClick={handleLogout}><FaSignOutAlt className="icon" /> Déconnexion</button></li>
    </>
  )}
</ul>


      </div>
    </nav>
  );
}

export default AdminNavbar;

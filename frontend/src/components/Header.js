// src/components/Header.js pour les pages
import React,{useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/global.css';

const Header = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
   console.log('🧩 Header user:', user);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="main-header">
      <div className="logo-and-user">
        <img src="/images/Logo1.png" alt="ZeyCake logo" className="logo-img" />
        {user && (
          <div className="user-greeting">Salut, {user.prenom ||user.email} !</div>
        )}

        {/* Hamburger bouton visible en mobile */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Accueil</Link>
        <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>Produits</Link>
        <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Mes commandes</Link>
        {user ? (
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token"); // si tu stockes le token
              window.location.href = "/";
            }}

          >
            Se déconnecter
          </Link>
        ) : (
          <Link
        to="/auth"
        className={location.pathname === "/auth" ? "active" : ""}
      >
        Connexion
          </Link>
        )}
          <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>🛒</Link>
          </nav>
          </header>
        );
        };

export default Header;

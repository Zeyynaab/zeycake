// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/global.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="main-header">
      <img src="/images/Logo1.png" alt="ZeyCake logo" className="logo-img" />


      <nav className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Accueil</Link>
        <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>Produits</Link>
        <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Mes commandes</Link>
        <Link to="/auth" className={location.pathname === "/auth" ? "active" : ""}>Connexion</Link>
        <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>🛒</Link>
      </nav>

    </header>
    
  );
};

export default Header;

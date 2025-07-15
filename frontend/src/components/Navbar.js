// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  // Mise à jour du type d'affichage (responsive vs desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mise à jour du user en cas de login/logout
  useEffect(() => {
    const checkUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // Fermer menu burger si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo-and-user">
        <Link to="/" className="logo">
          <img src="/images/Logo1.png" alt="ZeyCake logo" className="logo-img-home" />
        </Link>
        {user && <div className="user-greeting">Salut, {user.nom || user.email} !</div>}

        {/* BOUTON BURGER */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
        <li><Link to="/products" onClick={() => setMenuOpen(false)}>Produits</Link></li>

        {isDesktop ? (
          // Menu déroulant "Mon compte"
          <li className="dropdown">
            <div className="dropdown-toggle">Mon compte</div>
            <div className="dropdown-content">
              <Link to="/orders">Mes commandes</Link>
              {user ? (
                <Link to="/" onClick={handleLogout}>Se déconnecter</Link>
              ) : (
                <Link to="/auth">Connexion</Link>
              )}
            </div>
          </li>
        ) : (
          // Menu mobile
          <>
            <li><Link to="/orders" onClick={() => setMenuOpen(false)}>Mes commandes</Link></li>
            {user ? (
              <li><Link to="/" onClick={handleLogout}>Se déconnecter</Link></li>
            ) : (
              <li><Link to="/auth" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
            )}
          </>
        )}

        <li><Link to="/cart" className="nav-icon" onClick={() => setMenuOpen(false)}>🛒</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

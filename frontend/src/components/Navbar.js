// src/components/Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/images/Logo1.png" alt="ZeyCake logo" className="logo-img-home" />
      </Link>

      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/products">Produits</Link></li>

        {/* Dropdown */}
        <li className="dropdown" ref={dropdownRef}>
          <div
            className="dropdown-toggle"
            onClick={() => setOpen((prev) => !prev)}
          >
            Mon compte
          </div>
          {open && (
            <div className="dropdown-content">
              <Link to="/orders">Mes commandes</Link>
              <Link to="/auth">Connexion</Link>
            </div>
          )}
        </li>

        <li>
          <Link to="/cart" className="nav-icon">🛒</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

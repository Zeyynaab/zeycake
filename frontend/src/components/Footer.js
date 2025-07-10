import React from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: "url('/images/footer.jpg')" }}
    >
      <div className="footer-overlay">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>ZeyCake</h4>
            <p>Des douceurs faites maison,<br />avec passion et raffinement.</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Nos gâteaux</Link></li>
              <li><Link to="/orders">Commandes</Link></li>
              <li><Link to="/about">À propos</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Email : contact@zeycake.com</p>
            <p>Instagram : @zeycake</p>
          </div>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} ZeyCake. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

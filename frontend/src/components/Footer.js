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
              <li><Link to="/auth">Connexion / Inscription</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>
              Email :{' '}
              <a href="mailto:zeyycake@gmail.com">
                zeyycake@gmail.com
              </a>
              </p>

            <p>
              Instagram :{' '}
              <a href="https://www.instagram.com/zeycaake" target="_blank" rel="noopener noreferrer">
                @zeycaake
              </a>
            </p>
            <p>
            Tiktok :{' '}
            <a href="https://www.tiktok.com/@_zeycake_" target="_blank" rel="noopener noreferrer">
             @_zeycake_
            </a>
            </p>
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

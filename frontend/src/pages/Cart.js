import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';
import PageBanner from '../components/PageBanner';
import { FaTrashAlt } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';
const BASE_URL = API_URL.replace('/api', '');

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
      setCart(storedCart);
    }
  }, [user]);

  const total = cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  const handleClearCart = () => {
    if (user) {
      localStorage.removeItem(`cart_${user._id}`);
    }
    setCart([]);
  };

  const handleRemoveItem = (indexToRemove) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(newCart));
    }
  };

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Votre panier gourmand" sousTitre="Prêt à commander? " />

      <div className="cart">
        <h2>Mon Panier</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Votre panier est vide pour le moment...</p>
            <Link to="/products">
              <button className="cart-btn">Voir les gâteaux</button>
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={`${BASE_URL}/uploads/${item.image}`} alt={item.nom} className="cart-image" />
                  <div>
                    <h4>{item.nom}</h4>
                    <p>Quantité : {item.quantity}</p>
                    <p>{item.prix * item.quantity} $</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveItem(index)}
                    aria-label="Supprimer l'article"
                  >
                    <FaTrashAlt className="icon-trash" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total : {total.toFixed(2)} $</p>
            <div className="cart-actions">
              <button onClick={handleClearCart} className="cart-btn danger">Vider le panier</button>

              <div className="cart-btn-group">
                <Link to="/products">
                  <button className="cart-btn">Continuer mes achats</button>
                </Link>
                <Link to="/checkout">
                  <button className="cart-btn">Passer à la caisse</button>
                </Link>
              </div>
            </div>
          </div>  
        )}
      </div>
    </>
  );
};

export default Cart;

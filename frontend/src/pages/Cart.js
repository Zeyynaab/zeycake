import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';
import PageBanner from '../components/PageBanner';
const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Votre panier gourmand" sousTitre="Prêt à commander? "/>

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
                  <img src={item.image} alt={item.nom} className="cart-image" />
                  <div>
                    <h4>{item.nom}</h4>
                    <p>Quantité : {item.quantity}</p>
                    <p>{item.prix * item.quantity} €</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total : {total.toFixed(2)} €</p>
            <div className="cart-actions">
              <button onClick={handleClearCart} className="cart-btn danger">Vider le panier</button>
              <Link to="/checkout">
                <button className="cart-btn">Passer à la caisse</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

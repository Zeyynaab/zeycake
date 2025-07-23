import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import { useParams } from 'react-router-dom';
import '../style/global.css';
import { fetchProduitById } from '../api/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';
const BASE_URL = API_URL.replace('/api', '');

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProduitById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Erreur :', err));
  }, [id]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      showNotification("Veuillez vous connecter pour ajouter au panier.", "error");
      return;
    }

    const cartKey = `cart_${user._id}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const index = cart.findIndex(item => item._id === product._id);
    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    showNotification("Produit ajouté au panier !", "success");
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <>
    <PageBanner image="/images/fruits-rouges.jpg" titre="Nos produits" sousTitre=" Decouvrez nos compositions "/>

      {notification && (
        <div className={`popup-notif ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="product-detail">
        <img
          src={`${BASE_URL}/uploads/${product.image}`}
          alt={product.nom}
          className="detail-image"
        />
        <div className="detail-info">
          <h2>{product.nom}</h2>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">{product.prix} $</p>
          <label>
            Quantité :
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
              className="detail-qty"
            />
          </label>
          <button onClick={addToCart} className="detail-btn">
            Ajouter au panier
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

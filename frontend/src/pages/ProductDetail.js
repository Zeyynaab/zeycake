// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/global.css';
import { fetchProduitById } from '../api/api';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduitById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Erreur :', err));
  }, [id]);

  const addToCart = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert("Veuillez vous connecter pour ajouter au panier.");
    return;
  }

  const cartKey = `cart_${user._id}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Vérifier si le produit existe déjà
  const index = cart.findIndex(item => item._id === product._id);
  if (index !== -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert('Produit ajouté au panier');
};


  if (!product) return <p>Chargement...</p>;

  return (
    <div className="product-detail">
      <img src={`${API_URL}/uploads/${product.image}`} alt={product.nom} className="detail-image" />
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
        <button onClick={addToCart} className="detail-btn">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default ProductDetail;

// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/global.css';
import { fetchProduitById } from '../api/api';

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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...cart, { ...product, quantity }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // ✅ Sauvegarde liée à l'utilisateur
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(updatedCart));
    }

    alert('Produit ajouté au panier');
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="product-detail">
      <img src={`http://localhost:5050/uploads/${product.image}`} alt={product.nom} className="detail-image" />
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

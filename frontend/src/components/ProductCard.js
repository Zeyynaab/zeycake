import React from 'react';
import { Link } from 'react-router-dom';
import '../style/global.css';

const ProductCard = ({ product }) => {
  return (
    <div className="produit-card">
      <Link to={`/products/${product._id}`} className="produit-link">
        <img src={`http://localhost:5050/uploads/${product.image}`} alt={product.nom} className="produit-image" />
        <h3 className="product-name">{product.nom}</h3>
        <p className="product-price">{product.prix} $</p>
      </Link>
    </div>
  );
};

export default ProductCard;

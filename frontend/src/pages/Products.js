
// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import { fetchProduits } from '../api/api';
import '../style/global.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  // 🔄 Récupération des produits à l'initialisation
  useEffect(() => {
    fetchProduits()
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(error => console.error('Erreur:', error));
  }, []);

  // 🧠 Filtrer par catégorie
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === 'Toutes') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.categorie === category));
    }
  };

  // 🔢 Extraire dynamiquement les catégories disponibles
  const categoriesDisponibles = ['Toutes', ...new Set(products.map(p => p.categorie))];

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Nos gâteaux" />

      <div className="produits-container">
        {/* 🧃 Filtres */}
        <div className="filter-bar">
          <label htmlFor="category-select">Filtrer par catégorie :</label>
          <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
            {categoriesDisponibles.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* 🧁 Produits */}
        <div className="produits-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import { fetchProduits } from '../api/api';
import '../style/global.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [showFilters, setShowFilters] = useState(false); // 👈 Pour mobile

  // 🔄 Charger produits
  useEffect(() => {
    fetchProduits()
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(error => console.error('Erreur:', error));
  }, []);

  // 🎯 Appliquer filtres
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'Toutes') {
      result = result.filter(p => p.categorie === selectedCategory);
    }

    if (minPrice) {
      result = result.filter(p => p.prix >= parseFloat(minPrice));
    }

    if (maxPrice) {
      result = result.filter(p => p.prix <= parseFloat(maxPrice));
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.prix - b.prix);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.prix - a.prix);
    }

    setFilteredProducts(result);
  }, [selectedCategory, minPrice, maxPrice, sortOrder, products]);

  // 📋 Catégories uniques
  const categoriesDisponibles = ['Toutes', ...new Set(products.map(p => p.categorie))];

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Nos gâteaux" />

      {/* ✅ Conteneur général */}
      <div className="products-wrapper">
        
        {/* ✅ Filtres sidebar */}
        <div className={`filter-sidebar ${showFilters ? 'visible' : ''}`}>
          <h3>Filtres</h3>

          <div>
            <label>Catégorie</label>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {categoriesDisponibles.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Prix min</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          </div>

          <div>
            <label>Prix max</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          </div>

          <div>
            <label>Trier par prix</label>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="">Aucun</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* ✅ Grille des produits */}
        <div className="produits-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        </div>
        {/* ✅ BOUTON MOBILE pour filtres (placé ici après les produits) */}
        <div className="filter-toggle-mobile">
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </button>
        </div>

      
    </>
  );
};

export default Products;

// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import { fetchProduits } from '../api/api';
import '../style/global.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Plus tard : active ça pour utiliser l’API
  /*
  useEffect(() => {
    fetchProduits()
      .then(res => setProducts(res.data))
      .catch(error => console.error('Erreur:', error));
  }, []);
  */

  // Données temporaire pour test
  useEffect(() => {
    const produitsTest = [
      { _id: "1", nom: "Pâtisserie Millefeuille (8 personnes)", image: "Chocolat.jpg", prix: 46, avis: 45 },
      { _id: "2", nom: "Dessert à Laval : Tarte Passion (8 pers)", image: "Citron.jpg", prix: 49, avis: 5 },
      { _id: "3", nom: "Charlotte Multifr Fruits (8 pers)", image: "Fraises.jpg", prix: 49, avis: 14 },
      { _id: "4", nom: "Cheesecake Pistache", image: "Pistache.jpg", prix: 50, avis: 12 },
      { _id: "5", nom: "Gâteau au Chocolat", image: "Chocolat.jpg", prix: 44, avis: 22 },
      { _id: "6", nom: "Fraisier", image: "Fraisier.jpg", prix: 48, avis: 18 },
      { _id: "7", nom: "Cheesecake Pistache", image: "Pistache.jpg", prix: 50, avis: 12 },
      { _id: "8", nom: "Gâteau au Chocolat", image: "Chocolat.jpg", prix: 44, avis: 22 },
      { _id: "9", nom: "Fraisier", image: "Fraisier.jpg", prix: 48, avis: 18 },
      { _id: "10", nom: "Fraisier", image: "Fraisier.jpg", prix: 48, avis: 18 },
    
    ];
    setProducts(produitsTest);
  }, []);

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Nos gâteaux"/>

      <div className="produits-container">
        <div className="produits-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

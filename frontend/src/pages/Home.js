import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import '../style/global.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050/api';
const BASE_URL = API_URL.replace('/api', '');


const Home = () => {
  const [vedettes, setVedettes] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Chargement des produits vedettes depuis le backend
    axios.get(`${API_URL}/produits/vedettes`)
      .then(res => setVedettes(res.data))
      .catch(err => console.error('Erreur chargement vedettes', err));
  }, []);

  return (
    <div>
      <Navbar />

      {/* HERO BANNIÈRE */}
      <header className="home-banner-image" style={{ backgroundImage: "url('/images/fruits-rouges.jpg')" }}>
        <div className="home-banner-content">
          <h1 data-aos="fade-down">Des douceurs faites avec amour</h1>
          <Link to="/products" className="home-btn" data-aos="fade-up">Voir nos gâteaux</Link>
        </div>
      </header>

      {/* SECTION À PROPOS */}
      <section className="about-line">
  <div className="about-line-wrapper">
    <div className="about-col" data-aos="fade-right">
      <img src="/images/about.jpg" alt="Préparation gâteau" />
    </div>
    <div className="about-col" data-aos ="fade-up">
      <div className="about-text-box">
        <h2>À propos de <span>ZeyCake</span></h2>
        <p>
          ZeyCake est une maison de pâtisserie artisanale née d’une passion sincère pour l’art du goût, de la précision et de l’élégance.
          <br /><br />
          Derrière chaque création, il y a moi, <strong>Zeïnab</strong>, fondatrice et pâtissière — animée par le désir de sublimer vos instants de vie à travers des douceurs uniques, raffinées et généreuses.
          <br /><br />
          Ma vision ? Offrir bien plus qu’un simple dessert. Je veux créer une expérience. Une émotion. Un souvenir.
        </p>
        <p className="founder-signature">– Zeïnab, Fondatrice</p>
      </div>
    </div>
    <div className="about-col" data-aos ="fade-left">
      <img src="/images/fruits2.jpg" alt="Tarte aux fruits rouges" />
    </div>
  </div>
</section>




      {/* PRODUITS VEDETTES */}
      <section className="featured-products">
        <h2 data-aos="fade-up">Nos produits phares</h2>
        <div className="product-row">
          {vedettes.slice(0, 4).map((produit, index) => (
            <div className="product-card" data-aos="zoom-in" key={index}>
              <img
                src={produit.image ? `${BASE_URL}/uploads/${produit.image}` : '/images/default.jpg'}
                alt={produit.nom}
              />
            <p>{produit.nom}<br />{produit.prix} $</p>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR */}
      <section className="why-choose">
        <h2 data-aos="fade-up">Pourquoi choisir <span>ZeyCake</span> ?</h2>
        <div className="why-icons">
          <div data-aos="fade-up"><p>🏡<br />Fait maison</p></div>
          <div data-aos="fade-up"><p>🚚<br />Livraison rapide</p></div>
          <div data-aos="fade-up"><p>🌿<br />Ingrédients frais</p></div>
        </div>
      </section>

      {/* AVIS CLIENTS */}
      <section className="testimonials">
        <h2 data-aos="fade-up">Avis clients</h2>
        <div className="testimonial-row">
          <div className="testimonial" data-aos="flip-left">
            <p>⭐️⭐️⭐️⭐️⭐️<br />Les gâteaux sont délicieux et joliment présentés, je recommande vivement !</p>
          </div>
          <div className="testimonial" data-aos="flip-left">
            <p>⭐️⭐️⭐️⭐️⭐️<br />Excellent service et gâteaux incroyables. Nous reviendrons pour sûr.</p>
          </div>
          <div className="testimonial" data-aos="flip-left">
            <p>⭐️⭐️⭐️⭐️⭐️<br />Une expérience inoubliable, du goût à la présentation tout est parfait !</p>
          </div>
          <div className="testimonial" data-aos="flip-left">
            <p>⭐️⭐️⭐️⭐️⭐️<br />Je n’ai jamais goûté un fraisier aussi bon ! Bravo à toute l’équipe.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import '../style/global.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Navbar />

      {/* HERO BANNIÈRE */}
      <header className="home-banner-image" style = {{backgroundImage: "url('/images/fruits-rouges.jpg')"}}>
        <div className="home-banner-content">
          <h1 data-aos="fade-down">Des douceurs faites avec amour</h1>
          <Link to="/products" className="home-btn" data-aos="fade-up">Voir nos gâteaux</Link>
        </div>
      </header>

      {/* SECTION À PROPOS */}
      <section className="about-section">
        <div className="about-content" data-aos="fade-right">
          <h2>À propos de ZeyCake</h2>
          <p>
            ZeyCake est une maison de pâtisserie artisanale née d’une passion sincère pour l’art du goût, de la précision et de l’élégance. 
            Derrière chaque création, il y a moi, Zeïnab 
            — fondatrice et pâtissière — animée par le désir de sublimer vos instants de vie à travers des douceurs uniques, raffinées et généreuses.

Chez ZeyCake, chaque réalisation est pensée avec exigence et créativité. Des gâteaux sur-mesure aux cupcakes soigneusement décorés, en passant par les douceurs traditionnelles revisitées,
  tout est fait maison, avec des ingrédients de qualité, une attention portée aux détails, et une véritable volonté de marquer les esprits.

Ma vision ? Offrir bien plus qu’un simple dessert. Je veux créer une expérience. Une émotion. Un souvenir. 
Qu’il s’agisse d’un événement marquant comme un mariage, une baby shower, un anniversaire, ou simplement l’envie de se faire plaisir, 
ZeyCake s’engage à offrir un service personnalisé, réactif et professionnel.

Chaque commande est traitée avec rigueur et passion, dans le respect des normes d’hygiène et de qualité. 
Votre satisfaction est au cœur de ma démarche.
Bienvenue dans l’univers ZeyCake — là où la gourmandise rencontre l’élégance.
</p>.
        </div>
        <div className="about-image" data-aos="fade-left">
          <img src="/images/about.jpg" alt="Gâteau élégant" />
        </div>
      </section>

      {/* PRODUITS VEDETTES */}
      <section className="featured-products">
        <h2 data-aos="fade-up">Nos produits phares</h2>
        <div className="product-row">
          <div className="product-card" data-aos="zoom-in">
            <img src="/images/Chocolat.jpg" alt="Chocolat classique" />
            <p>Chocolat classique<br />20 €</p>
          </div>
          <div className="product-card" data-aos="zoom-in">
            <img src="/images/Fraisier.jpg" alt="Gâteau à la fraise" />
            <p>Gâteau à la fraise<br />25 €</p>
          </div>
          <div className="product-card" data-aos="zoom-in">
            <img src="/images/Citron.jpg" alt="Cheesecake citron" />
            <p>Cheesecake au citron<br />22 €</p>
          </div>
          <div className="product-card" data-aos="zoom-in">
            <img src="/images/Fraises.jpg" alt="Gâteau aux fruits" />
            <p>Gâteau aux fruits<br />28 €</p>
          </div>
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
      <p>⭐️⭐️⭐️⭐️⭐️<br />
        Une expérience inoubliable, du goût à la présentation tout est parfait !
      </p>
    </div>
    <div className="testimonial" data-aos="flip-left">
      <p>⭐️⭐️⭐️⭐️⭐️<br />
        Je n’ai jamais goûté un fraisier aussi bon ! Bravo à toute l’équipe.
      </p>
    </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

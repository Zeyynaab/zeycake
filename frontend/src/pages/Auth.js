// src/pages/Auth.js
import React from 'react';
import '../style/global.css';
import PageBanner from '../components/PageBanner';

const Auth = () => {
  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Bienvenue chez ZeyCake"/>

      <div className="auth-container">
        <h1 className="auth-title">Connexion / Inscription</h1>

        <div className="auth-boxes">
          {/* Connexion */}
          <div className="auth-box">
            <h2>Connexion</h2>
            <form>
              <label>Adresse e-mail</label>
              <input type="email" placeholder="Adresse e-mail" />

              <label>Mot de passe</label>
              <input type="password" placeholder="Mot de passe" />

              <div className="forgot-password">Mot de passe oublié ?</div>

              <button type="submit" className="btn-primary">Se connecter</button>
            </form>
          </div>

          {/* Inscription */}
          <div className="auth-box">
            <h2>Inscription</h2>
            <form>
              <label>Nom</label>
              <input type="text" placeholder="Nom" />

              <label>Adresse e-mail</label>
              <input type="email" placeholder="Adresse e-mail" />

              <label>Mot de passe</label>
              <input type="password" placeholder="Mot de passe" />

              <button type="submit" className="btn-primary">S’inscrire</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

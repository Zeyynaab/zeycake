import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/global.css';
import PageBanner from '../components/PageBanner';
import { login, register} from '../api/api';


const Auth = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerNom, setRegisterNom] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPrenom, setRegisterPrenom] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await login({ email: loginEmail, password: loginPassword });
    console.log('🔑 login response data =', res.data);

    
    const {
      _id,
      nom,
      prenom,
      email,
      role,
      token
    } = res.data;

    const user = { _id, nom, prenom, email, role, token };

    // Stockage
    localStorage.removeItem('admin');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    console.log('💾 stored user:', user);

    showNotification('Connexion réussie !', 'success');
    setTimeout(() => navigate('/'), 1000);
  } catch (err) {
    console.error('Erreur de connexion :', err.response?.data || err.message);
    showNotification('Email ou mot de passe incorrect', 'error');
  }
};



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        nom: registerNom,
        prenom: registerPrenom,
        email: registerEmail,
        password: registerPassword,
      });

      if (res.status === 201 || res.data?.message?.includes("succès")) {
        showNotification('Inscription réussie ! Connectez-vous.', 'success');
        setRegisterNom('');
        setRegisterEmail('');
        setRegisterPassword('');
      } else {
        showNotification(res.data?.message || 'Erreur lors de l’inscription', 'error');
      }
    } catch (err) {
      console.error('Erreur inscription :', err);
      showNotification('Erreur serveur lors de l’inscription', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    showNotification("Vous avez été déconnecté.", "success");
    navigate('/');
  };

  return (
    <>
      <PageBanner image="/images/fruits-rouges.jpg" titre="Bienvenue chez ZeyCake" />
      <div className="auth-container">
        <h1 className="auth-title">Connexion / Inscription</h1>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {!localStorage.getItem('user') ? (
          <div className="auth-boxes">
            <div className="auth-box">
              <h2>Connexion</h2>
              <form onSubmit={handleLogin}>
                <label>Adresse e-mail</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <div className="forgot-password">Mot de passe oublié ?</div>
                <button type="submit" className="btn-primary">Se connecter</button>
              </form>
            </div>

            <div className="auth-box">
              <h2>Inscription</h2>
              <form onSubmit={handleRegister}>
                <label>Nom</label>
                <input
                  type="text"
                  value={registerNom}
                  onChange={(e) => setRegisterNom(e.target.value)}
                  required
                />
                <label>Prénom</label>
                <input
                  type="text"
                  value={registerPrenom}
                  onChange={(e) => setRegisterPrenom(e.target.value)}
                  required
                />
                <label>Adresse e-mail</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
                <label>Mot de passe</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary">S’inscrire</button>
              </form>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={handleLogout} className="btn-secondary logout">
              Se déconnecter
            </button>

            {JSON.parse(localStorage.getItem('user')).role === 'admin' && (
              <div style={{ marginTop: '10px' }}>
                <button className="btn-secondary" onClick={() => navigate('/admin')}>
                  Accéder au Dashboard Admin
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Auth;

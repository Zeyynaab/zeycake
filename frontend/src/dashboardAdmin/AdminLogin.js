//Page pour connexion admin
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      //debogue 
      console.log("Réponse login admin :", data);

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      if (data.role !== 'admin') {
        throw new Error("Accès refusé. Vous n'êtes pas administrateur.");
      }
 //NEW
      localStorage.setItem('admin', JSON.stringify({
        email: data.email,
        role: data.role,
        nom: data.nom || '',
        prenom: data.prenom || '',
        _id: data._id || '',
        token: data.token
    }));


    // ✅ Redirection
    navigate('/admin');

  } catch (err) {
    setErreur(err.message);
  }
};
  /* //DECONNEXION
const handleDeconnexion = () => {
    localStorage.removeItem('user');
    navigate('/admin');
  }; */

  return (
    <div className="admin-login">
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handleConnexion}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {erreur && <p className="erreur">{erreur}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;

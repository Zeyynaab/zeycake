//Page pour connexion admin
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import API from '../api/api';
//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';


function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const data = res.data;

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

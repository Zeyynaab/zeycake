import axios from 'axios';

// Pour React créé avec create-react-app
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Authentification
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

// Produits
export const fetchProduits = () => API.get('/produits');
export const fetchProduitById = (id) => API.get(`/produits/${id}`);

// Commandes
export const fetchCommandes = () => API.get('/commandes');
export const passerCommande = (data) => API.post('/commandes', data);

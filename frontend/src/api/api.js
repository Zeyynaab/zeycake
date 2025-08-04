import axios from 'axios';
/*istanbul ignore next*/
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5050/api",
});

//DEBUG
console.log(
  '🌐 process.env.REACT_APP_API_URL =',
  process.env.REACT_APP_API_URL,
  '\n☕ API.defaults.baseURL    =',
  API.defaults.baseURL
);
/*istanbul ignore next*/
// Intercepteur pour attacher le token
API.interceptors.request.use((config) => {
  const pathname = window.location.pathname;
  const isAdmin = pathname.startsWith('/admin');

  const admin = JSON.parse(localStorage.getItem('admin'));
  const user = JSON.parse(localStorage.getItem('user'));


  const token = isAdmin ? (admin?.token || user?.token) : user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Authentification
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);



// Produits
export const fetchProduits = () => API.get('/produits');
export const fetchProduitById = (id) => API.get(`/produits/${id}`);


//Commandes du client connecté
export const fetchCommandesClient = () => API.get('/commandes/mes-commandes');
//Toutes les commandes vues par l'admin
export const fetchCommandesAdmin = () => API.get('/commandes');
export const passerCommande = (data) => API.post('/commandes', data);

export const fetchProfile = () => API.get('/auth/me');

export default API;
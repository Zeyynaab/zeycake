require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

// --- Middlewares persos ---
const authUser     = require('./middleware/authUser');
const errorHandler = require('./middleware/errorHandler');
const authClient   = require('./middleware/authClient');

// --- Routeurs ---
const authRoutes        = require('./routes/authRoutes');
const userRoutes        = require('./routes/userRoutes');
const produitsRoutes    = require('./routes/produits');
const commandesRoutes   = require('./routes/commandes');
const ingredientsRoutes = require('./routes/ingredients');

const app = express();

// --- Sécurité & logs ---
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://heartfelt-cendol-7cd5c1.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
}));
app.use(helmet());
app.use(morgan('combined'));

// --- Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Fichiers statiques ---
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://heartfelt-cendol-7cd5c1.netlify.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// --- Routes publiques ---
app.use('/api/auth', authRoutes);
app.use('/api/produits', produitsRoutes);

// --- Routes protégées (clients & admins) ---
app.use('/api/users', authUser, userRoutes);
app.use('/api/commandes', authUser, commandesRoutes);
app.use('/api/ingredients', authUser, ingredientsRoutes);

// --- Root endpoint ---
app.get('/', (req, res) => {
  res.json({
    message: 'API ZeyCake - Bienvenue!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      produits: '/api/produits',
      commandes: '/api/commandes',
      users: '/api/users',
      ingredients: '/api/ingredients'
    }
  });
});

// --- Gestion des erreurs (dernier middleware) ---
app.use(errorHandler);

module.exports = app;

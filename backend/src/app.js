require('dotenv').config();
console.log('Stripe secret present?', !!process.env.STRIPE_SECRET_KEY);

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

// Middlewares persos 
const authUser     = require('./middleware/authUser');
const errorHandler = require('./middleware/errorHandler');
const authClient   = require('./middleware/authClient');

// Routeurs 
const authRoutes        = require('./routes/authRoutes');
const userRoutes        = require('./routes/userRoutes');
const produitsRoutes    = require('./routes/produits');
const commandesRoutes   = require('./routes/commandes');
const ingredientsRoutes = require('./routes/ingredients');

// --- Stripe (webhook doit être monté avant express.json) ---
const paymentsWebhook   = require('./routes/paymentsWebhook');

const app = express();

/* === CORS (en tout début) === */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://heartfelt-cendol-7cd5c1.netlify.app'
  ],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
app.options('*', cors());

// --- Webhook Stripe (raw) ---
app.post('/api/payments/webhook', paymentsWebhook);

/* === Sécurité / logs / parsers === */
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
}));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* === Fichiers statiques (images) === */
app.use('/uploads', express.static('uploads', {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://heartfelt-cendol-7cd5c1.netlify.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

/* === Routes publiques === */
app.use('/api/auth', authRoutes);
app.use('/api/produits', produitsRoutes);

// --- Paiements (API Stripe) ---
const paymentsRoutes = require('./routes/payments');
app.use('/api/payments', authUser, paymentsRoutes);

/* === Routes protégées (clients/admin) === */
app.use('/api/users', authUser, userRoutes);
app.use('/api/commandes', authUser, commandesRoutes);
app.use('/api/ingredients', authUser, ingredientsRoutes);

/* === Root === */
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

/* === Gestion des erreurs (un seul handler) === */
app.use(errorHandler);

module.exports = app;

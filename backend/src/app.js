require('dotenv').config();
const express = require('express');
const connectMongo = require('../config/mongoose'); // 🔁 connexion Mongo
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// Import des modèles (version mongoose)
const User = require('./models/user');
const Product = require('./models/produits');
const Commande = require('./models/commandes');
const Ingredient = require('./models/ingredients');

// Création de l'app
const app = express();

// Autoriser le frontend React
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const PORT = process.env.PORT || 5050;

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
});

// Middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const produitsRoutes = require('./routes/produits');
const commandesRoutes = require('./routes/commandes');
const ingredientsRoutes = require('./routes/ingredients');

// Routes publiques
app.use('/uploads', express.static('uploads', {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));
app.use('/api/auth', authRoutes);
app.use('/api/produits', produitsRoutes);

// ✅ Nouvelle route protégée pour gérer les utilisateurs (clients/admin)
app.use('/api/users', authMiddleware, userRoutes);

// Routes protégées
//app.use('/api/commandes', authMiddleware, commandesRoutes);
const authUser = require('./middleware/authUser');
app.use('/api/commandes', authUser, commandesRoutes);
app.use('/api/ingredients', authMiddleware, ingredientsRoutes);

// Route d'accueil
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

// Route test client authentifié
const authClient = require('./middleware/authClient');
app.get('/api/mes-commandes', authClient, (req, res) => {
  res.json({ message: `Bienvenue client ${req.user.email}, voici vos commandes.` });
});

// 🟢 Démarrage avec Mongo
const bcrypt = require('bcryptjs');

const start = async () => {
  try {
    await connectMongo(); // Connexion MongoDB

    // Créer admin si inexistant
    const admin = await User.findOne({ email: 'zeycake@patisserie.com' });
    if (!admin) {
      const hash = await bcrypt.hash('123456', 10);
      await User.create({
        nom: 'Admin',
        prenom: 'Super',
        email: 'zeycake@patisserie.com',
        password: hash,
        role: 'admin'
      });
    }

    // ✅ Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage :', error);
  }
};

start();

module.exports = app;

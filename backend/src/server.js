// src/server.js
require('dotenv').config();   
         // Charge .env en local ou variables d’env prod
console.log('❓ process.env.MONGO_URI =', process.env.MONGO_URI);
console.log('❓ process.env.MONGODB_URI =', process.env.MONGODB_URI);
console.log('❓ process.env.DATABASE_URL =', process.env.DATABASE_URL);

const mongoose = require('mongoose');
const app = require('./app');

// On supporte plusieurs noms de variable selon l’hébergeur
const uri =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL;

if (!uri) {
  console.error(
    'Erreur : aucune URI Mongo trouvée (MONGO_URI, MONGODB_URI ou DATABASE_URL non défini)'
  );
  process.exit(1);
}

// Utile pour debug : on voit bien ce qu’on utilise
console.log('URI Mongo utilisée :', uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✓ MongoDB connecté');
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`→ Serveur Express sur port ${port}`)
    );
  })
  .catch(err => {
    console.error('✗ Erreur connexion MongoDB', err);
    process.exit(1);
  });

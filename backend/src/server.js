// src/server.js
require('dotenv').config();   
// Charge .env en local ou variables d’env prod
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

// DEBUG
console.log('URI Mongo utilisée :', uri);
/* istanbul ignore next */
//Bloc de connexion a mongoDB
mongoose
  .connect(uri)
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

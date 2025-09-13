require('dotenv').config();   
// Charge .env en local ou variables d’env prod
const mongoose = require('mongoose');
const app = require('./app');

// Supporte plusieurs noms de variable selon l’hébergeur
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

  // ⇩ A METTRE TOUT EN BAS A ENLEVER
app.use((err, req, res, next) => {
  console.error('API error:', err);           // stack dans les logs Railway
  if (err?.code === 11000) {                  // doublon Mongo (index unique)
    return res.status(409).json({ message: "Un produit avec ce nom existe déjà." });
  }
  res.status(500).json({ message: err?.message || "Erreur serveur" });
});

// src/server.js
require('dotenv').config();            // si tu utilises dotenv
const mongoose = require('mongoose');
const app = require('./app');

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✓ MongoDB connecté');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`→ Serveur Express sur port ${port}`));
  })
  .catch(err => {
    console.error('✗ Erreur connexion MongoDB', err);
    process.exit(1);
  });

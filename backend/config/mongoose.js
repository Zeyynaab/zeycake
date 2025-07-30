// config/mongoose.js
const mongoose = require('mongoose');

const connectMongo = async () => {
  // Ne pas se connecter automatiquement en test (MongoMemoryServer s'en charge)
  if (process.env.NODE_ENV === 'test') return;

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connecté à MongoDB Atlas');
  }
};

module.exports = connectMongo;

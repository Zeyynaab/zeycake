// Route Pour les clients et les admin
// middleware/authUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Header reçu :", authHeader); //debogage 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 Token décodé :", decoded); //pour deboguer
    const user = await User.findById(decoded.id).select('-password');
    console.log("👤 Utilisateur MongoDB :", user); //pour deboguer
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

//pour déboguer :
    console.log("Utilisateur authentifié :", user);

    // ✅ PAS de vérification de rôle ici — client OU admin accepté
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide', error: error.message });
  }
};

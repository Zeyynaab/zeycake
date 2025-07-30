// src/middleware/auth.js
const jwt  = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  let token;

  // 1. On extrait le token du header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Non authentifié' });
  }

  try {
    // 2. On vérifie et décode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3. On attache l'utilisateur à la requête
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur introuvable' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

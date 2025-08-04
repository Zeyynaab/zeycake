const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requis pour le client.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    // VérifieR que c’est bien un client
    if (user.role !== 'client') {
      return res.status(403).json({ message: 'Accès réservé aux clients uniquement.' });
    }

    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide.', erreur: error.message });
  }
};

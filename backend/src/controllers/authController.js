// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Utilisateur déjà existant.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hashedPassword,
      role: role || 'client',
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Tentative de connexion :", email, password); //a enelver apres


    const user = await User.findOne({ email });
    if (!user){ 
      console.log("Utilisateur non trouvé"); //a enelver
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
  }
      console.log("Utilisateur trouvé, mot de passe hashé :", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Correspondance du mot de passe :", isMatch); //enlever

    if (!isMatch) {
      console.log("Mot de passe incorrect"); //a enelver
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    console.log("Connexion réussie, token généré"); //enlever
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("💥 Erreur serveur dans /login :", err); 
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

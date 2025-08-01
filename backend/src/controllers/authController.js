// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;
//VERIFIER SI L USER EXISTE DEJA 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant.' });
    }
    //HASHER LE MDP ET CREER L USER
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: hashedPassword,
      role: role || 'client',
    });

    await newUser.save();
    //RETOUR JEST
    return res.status(201).json({ message : 'Utilisateur créé avec succès',
      user: newUser

  }); 

} catch (err) {
  //console.error(err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("Tentative de connexion :", email, password); //a enelver apres


    const user = await User.findOne({ email });
    if (!user){ 
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
  }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    //res.status(200).json({ token, user }); 
    //NEW 
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role,
      token,
    }); //FIN NEW
  } catch (err) {
    //console.error(err); 
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

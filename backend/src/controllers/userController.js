// src/controllers/userController.js
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res, next) => {
  try {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Utilisateur déjà existant.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashed,
      role: 'client', // forcer client
    });

    await newUser.save();

    res.status(201).json({
      message: 'Client créé avec succès',
      user: {
        _id: newUser._id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  // 1. format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }
  // 2. existe ?
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur introuvable' });
  }
  // 3. autorisation
  if (req.user.id !== id && req.user.role !== 'admin') {
  return res.status(401).json({ message: 'Non autorisé' });
}

  // 4. suppression
  await User.findByIdAndDelete(id);
  res.status(204).end();
};

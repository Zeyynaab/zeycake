// src/controllers/commandesController.js
const mongoose = require('mongoose');
const Commande = require('../models/commandes');

exports.createCommande = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
     clientId: req.user.id,     // ← indispensable si ton schema exige clientId
   };
   const newCommande = await Commande.create(data);
     res.status(201).json(newCommande);
   } catch (err) {
     next(err);
   }
 };

exports.getAllCommandes = async (req, res, next) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (err) {
    next(err);
  }
};

exports.getCommandeById = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }
  try {
    const commande = await Commande.findById(id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }
    res.status(200).json(commande);
  } catch (err) {
    next(err);
  }
};

exports.updateCommande = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }
  try {
    const updated = await Commande.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteCommande = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }
  try {
    const commande = await Commande.findById(id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }
    await Commande.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.updateCommandeStatut = async (req, res) => {
  try {
    const { statut } = req.body;
    const commande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });
    return res.status(200).json({ message: 'Statut mis à jour', commande });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

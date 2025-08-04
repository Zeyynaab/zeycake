const mongoose = require('mongoose');
const Commande = require('../models/commandes');

//Creation de commande pour luser connecté
exports.createCommande = async (req, res, next) => {
  try {
    const { produits, adresse, commentaires, dateRecuperation } = req.body;

    if (!Array.isArray(produits) || produits.length === 0) {
      return res.status(400).json({ message: 'Au moins un produit est requis.' });
    }

    // Validation rapide des produits
    for (const p of produits) {
      if (typeof p.nom !== 'string' || typeof p.qte !== 'number' || typeof p.prix !== 'number') {
        return res.status(400).json({ message: 'Format de produit invalide.' });
      }
    }

    const total = produits.reduce((sum, p) => sum + p.prix * p.qte, 0);

    const data = {
      clientId: req.user.id,
      produits,
      total,
      adresse,
      commentaires,
      dateRecuperation,
    };

    const newCommande = await Commande.create(data);
    res.status(201).json(newCommande);
  } catch (err) {
    next(err);
  }
};

//Recupere toutes les commandes pour admin
exports.getAllCommandes = async (req, res, next) => {
  try {
    const commandes = await Commande.find()
    .populate('clientId', 'nom prenom email') 
    .exec();
    res.status(200).json(commandes);
  } catch (err) {
    next(err);
  }
};

//Recupere une commande par son Id
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

// Recupere les commandes du client connecté
exports.getMesCommandes = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const commandes = await Commande.find({ clientId: userId })
    .populate('clientId', 'nom prenom email')
    .exec();
    res.status(200).json(commandes);
  } catch (err) {
    next(err);
  }
};
//Met a jour une commande existante par ID
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

//Supprime une commande par Id
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

//MAJ du statu d'une commande
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

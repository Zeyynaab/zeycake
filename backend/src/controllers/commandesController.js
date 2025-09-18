const mongoose = require('mongoose');
const Commande = require('../models/commandes');

const toCents = (v) => Math.round(Number(v) * 100);
const toDollars = (c) => Number((Number(c || 0) / 100).toFixed(2));

//Creation de commande pour luser connecté
exports.createCommande = async (req, res, next) => {
  try {
    const { produits, adresse, commentaires, dateRecuperation } = req.body;

    if (!Array.isArray(produits) || produits.length === 0) {
      return res.status(400).json({ message: 'Au moins un produit est requis.' });
    }

    // Validation rapide des produits (format existant)
    for (const p of produits) {
      const okNom  = typeof p.nom === 'string' && p.nom.trim();
      const okQte  = typeof p.qte === 'number' && p.qte > 0;
      const okPrix = typeof p.prix === 'number' && p.prix >= 0;
      if (!okNom || !okQte || !okPrix) {
        return res.status(400).json({ message: 'Format de produit invalide.' });
      }
    }

    // --- NOUVEAU: calculs en cents (précis) ---
    let totalCents = 0;
    for (const p of produits) totalCents += toCents(p.prix) * p.qte;

    const DEPOSIT_RATE = Number(process.env.DEPOSIT_RATE || 0.4); // acompte 40%
    const depositCents = Math.max(100, Math.ceil(totalCents * DEPOSIT_RATE)); // min 1$
    const balanceCents = Math.max(0, totalCents - depositCents);

    const data = {
      clientId: req.user.id,
      produits,
      total: toDollars(totalCents), // conserve "total" en $
      adresse,
      commentaires,
      dateRecuperation,

      // --- NOUVEAU: champs paiement/acompte ---
      totalCents,
      depositCents,       // acompte en cents
      balanceCents,       // restant en cents
      paymentStatus: 'deposit_required', // état paiement
      paymentMethod: 'card_deposit'
    };

    const newCommande = await Commande.create(data);
    return res.status(201).json(newCommande);
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
    return res.status(200).json(commandes);
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
    return res.status(200).json(commande);
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
    return res.status(200).json(commandes);
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
    if (!updated) return res.status(404).json({ message: 'Commande introuvable' });
    return res.status(200).json(updated);
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
    if (!commande) return res.status(404).json({ message: 'Commande introuvable' });
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

// --- NOUVEAU: encaisser le solde en cash (admin) ---
exports.encaisserSoldeCash = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }
    const updated = await Commande.findByIdAndUpdate(
      id,
      { paymentStatus: 'paid', balanceCents: 0 },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Commande introuvable' });
    return res.status(200).json({ message: 'Solde encaissé (cash).', commande: updated });
  } catch (err) {
    next(err);
  }
};

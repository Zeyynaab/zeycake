// controllers/commandesController.js
const Commande = require('../models/commandes');
//const Client = require('../models/clients');

exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate('clientId', 'nom prenom email');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: error.message });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate('clientId', 'nom prenom email');
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.createCommande = async (req, res) => {
  try {
    const {produits, dateRecuperation, total, commentaires, adresse } = req.body;
    //const userId = req.user._id;
    const commande = new Commande({
      clientId: req.user._id,
      produits,
      total,
      commentaires,
      dateRecuperation,
      adresse,
    });

    await commande.save();
    res.status(201).json({ message: "Commande créée avec succès", commande });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la commande", error: error.message });
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

    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    res.json({ message: "Statut mis à jour", commande });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.deleteCommande = async (req, res) => {
  try {
    
    const commande = await Commande.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

    // ✅ Si l'utilisateur est un client, il ne peut supprimer que sa propre commande
    if (req.user.role !== 'admin' && commande.clientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé à supprimer cette commande" });
    }

    await commande.deleteOne();
    res.json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
};


exports.getCommandesUtilisateur = async (req, res) => {
  try {
    const commandes = await Commande.find({ clientId: req.user._id }).populate('clientId', 'nom prenom email');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commandes utilisateur", error: error.message });
  }
};

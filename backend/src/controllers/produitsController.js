// src/controllers/produitsController.js

const Produit = require('../models/produits');

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    return res.status(200).json(produits);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération des produits',
      error: error.message
    });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    return res.status(200).json(produit);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération',
      error: error.message
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const vedettes = await Produit.find({ vedette: true }).limit(4);
    return res.status(200).json(vedettes);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération des produits vedettes',
      error: error.message
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Produit.distinct('categorie');
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la récupération des catégories',
      error: error.message
    });
  }
};

exports.createProduit = async (req, res) => {
  try {
    const {
      nom,
      description,
      prix,
      categorie,
      ingredients,
      tempsPreparation,
      difficulte,
      disponible,
      vedette
    } = req.body;

    const vedetteBool = vedette === 'true' || vedette === true;
    const image       = req.file ? req.file.filename : req.body.image;

    const nouveauProduit = new Produit({
      nom,
      description,
      prix,
      categorie,
      ingredients,
      tempsPreparation,
      difficulte,
      disponible,
      image,
      vedette: vedetteBool,
    });

    await nouveauProduit.save();

    return res.status(201).json({
      message: 'Produit créé avec succès',
      produit: nouveauProduit
    });

  } catch (error) {
    //console.error('Erreur createProduit ➞', error);
    return res.status(500).json({
      message: 'Erreur lors de la création',
      error: error.message
    });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    const updatedProduit = await Produit.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json({
      message: 'Produit mis à jour',
      produit: updatedProduit
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};

exports.deleteProduit = async (req, res) => {
  try {
    const deleted = await Produit.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    return res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la suppression',
      error: error.message
    });
  }
};

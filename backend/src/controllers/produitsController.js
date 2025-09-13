const Produit = require('../models/produits');

//Recup tous les produits
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

//Recup un produit par ID
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

//Recup les produits vedette
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

//Recup les categories de produit
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

//Creer un nouveau produit
const toBool = (v) => v === true || v === 'true' || v === 'on' || v === '1';

exports.createProduit = async (req, res) => {
  try {
    // Petit log pour voir ce qui arrive réellement au serveur
    console.log('POST /produits body=', req.body, 'file=', !!req.file);

    // 1) validations + casts (évite les CastError -> 500)
    const nom = String(req.body.nom || '').trim();
    const categorie = String(req.body.categorie || '').trim();
    const prix = Number(req.body.prix);

    if (!nom || !categorie || Number.isNaN(prix)) {
      return res.status(400).json({ message: 'nom, categorie et prix (nombre) sont requis.' });
    }

    // 2) (facultatif mais utile) éviter un doublon de nom -> 409 au lieu de 500
    const existe = await Produit.findOne({ nom });
    if (existe) {
      return res.status(409).json({ message: 'Un produit avec ce nom existe déjà.' });
    }

    // 3) création — image OPTIONNELLE
    const produit = await Produit.create({
      nom,
      description: req.body.description || '',
      prix,
      categorie,
      ingredients: Array.isArray(req.body.ingredients) ? req.body.ingredients : [],
      tempsPreparation: req.body.tempsPreparation || undefined,
      difficulte: req.body.difficulte || undefined,
      disponible: toBool(req.body.disponible),
      vedette: toBool(req.body.vedette),
      image: req.file ? req.file.filename : undefined
    });

    return res.status(201).json(produit);
  } catch (error) {
    // Affiche la vraie erreur dans les logs Railway + message clair côté client
    console.error('CREATE /produits failed:', error);
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'Un produit avec ce nom existe déjà.' });
    }
    return res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

//Maj un produit existant
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

//Supprimer un produit
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

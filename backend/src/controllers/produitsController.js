// controllers/produitsController.js
const Product = require('../models/produits');

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Product.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error: error.message });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await Product.findById(req.params.id);
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });

    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
  }
};

// Tous les produits vedettes (limite 4) Nouveau
exports.getFeaturedProducts = async (req, res) => {
  try {
    const vedettes = await Product.find({ vedette: true }).limit(4);
    res.json(vedettes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits vedettes", error: error.message });
  }
};
///FIN
exports.createProduit = async (req, res) => {
  

  try {
    const { nom, description, prix, categorie, ingredients, tempsPreparation, difficulte, disponible,vedette} = req.body;
    const vedetteBool = vedette === 'true' || vedette === true;
    
    //ajout pour upload limage 
    const image = req.file ? req.file.filename : null;

    const nouveauProduit = new Product({
      nom,
      description,
      prix,
      categorie,
      ingredients,
      tempsPreparation,
      difficulte,
      disponible,
      image,
      vedette: vedetteBool, //nouveau
    });

    await nouveauProduit.save();
    res.status(201).json({ message: "Produit créé avec succès", produit: nouveauProduit });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création", error: error.message });
  }
};

exports.updateProduit = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Si une nouvelle image est envoyée, on la met à jour
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduit = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduit) return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit mis à jour", produit: updatedProduit });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};


exports.deleteProduit = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('categorie');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des catégories", error: error.message });
  }
};

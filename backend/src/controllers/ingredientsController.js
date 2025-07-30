// src/controllers/ingredientController.js
const Ingredient = require('../models/ingredients');

// GET tous les ingrédients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    // renommer stock en quantite
    const result = ingredients.map(doc => {
      const obj = doc.toObject();
      obj.quantite = obj.stock;
      delete obj.stock;
      return obj;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération ingrédients', error: error.message });
  }
};

// GET ingrédient par ID
exports.getIngredientById = async (req, res) => {
  try {
    const ing = await Ingredient.findById(req.params.id);
    if (!ing) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    return res.status(200).json(ing);
  } catch (error) {
    // Si l'ID n'est pas un ObjectId valide, c'est un CastError → 400
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalide' });
    }
    return res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


// POST créer un ingrédient
exports.createIngredient = async (req, res) => {
  try {
    const { nom, unite, quantite } = req.body;
    const newIngredient = new Ingredient({
      nom,
      unite,
      prix: req.body.prix || 0,
      stock: quantite || 0,
      seuilAlerte: req.body.seuilAlerte || 5,
      fournisseur: req.body.fournisseur || ''
    });
    await newIngredient.save();
    const obj = newIngredient.toObject();
    obj.quantite = obj.stock;
    delete obj.stock;
    res.status(201).json(obj);
  } catch (error) {
    console.error('createIngredient error:', error); //ENLEVER
    res.status(500).json({ message: 'Erreur création ingrédient', error: error.message });
  }
};

// PUT mettre à jour un ingrédient complet
exports.updateIngredient = async (req, res) => {
  try {
    const updateData = { ...req.body };
    // si quantite en payload, on met à jour stock
    if (updateData.quantite !== undefined) {
      updateData.stock = updateData.quantite;
      delete updateData.quantite;
    }
    const updated = await Ingredient.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    const obj = updated.toObject();
    obj.quantite = obj.stock;
    delete obj.stock;
    return res.status(200).json(obj);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalide' });
    }
     return res.status(500).json({ message: 'Erreur mise à jour ingrédient', error: error.message });
   }
 };

// DELETE ingrédient
exports.deleteIngredient = async (req, res) => {
  try {
    const deleted = await Ingredient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    return res.status(204).end();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalide' });
    }
   return res.status(500).json({ message: 'Erreur suppression ingrédient', error: error.message });
   }
 };

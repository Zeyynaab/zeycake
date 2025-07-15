const Ingredient = require('../models/ingredients');

// GET tous les ingrédients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération ingrédients', error: error.message });
  }
};

// GET ingrédient par ID
exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération ingrédient', error: error.message });
  }
};

// POST créer un ingrédient
exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création ingrédient', error: error.message });
  }
};

// PUT mettre à jour un ingrédient complet
exports.updateIngredient = async (req, res) => {
  try {
    const updated = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour ingrédient', error: error.message });
  }
};

// PUT mise à jour stock seulement
exports.updateIngredientStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const updated = await Ingredient.findByIdAndUpdate(req.params.id, { stock }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur mise à jour stock', error: error.message });
  }
};

// DELETE ingrédient
exports.deleteIngredient = async (req, res) => {
  try {
    const deleted = await Ingredient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ingrédient non trouvé' });
    res.json({ message: 'Ingrédient supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression ingrédient', error: error.message });
  }
};

// GET alertes de stock (stock < seuilAlerte)
exports.getAlertesStock = async (req, res) => {
  try {
    const alertes = await Ingredient.aggregate([
      {
        $match: {
          $expr: { $lt: ["$stock", "$seuilAlerte"] }
        }
      }
    ]);
    res.json(alertes);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération alertes", error: error.message });
  }
};

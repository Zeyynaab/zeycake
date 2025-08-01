const express = require('express');
const ingredientsController = require('../controllers/ingredientsController');
const router = express.Router();

// Créer un ingrédient
router.post('/', ingredientsController.createIngredient);

// Récupérer tous les ingrédients
router.get('/', ingredientsController.getAllIngredients);

// Récupérer un ingrédient par ID
router.get('/:id', ingredientsController.getIngredientById);

// Mettre à jour un ingrédient
router.put('/:id', ingredientsController.updateIngredient);

// Supprimer un ingrédient
router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router;

const express = require('express');
const { validateParams, schemas } = require('../middleware/validation');
const produitsController = require('../controllers/produitsController');
const router = express.Router();
const authUser  = require('../middleware/authUser');
const authAdmin = require('../middleware/admin');
const upload = require('../middleware/upload');

// Récupérer tous les produits
router.get('/', produitsController.getAllProduits);

// Récupérer les produits vedettes
router.get('/vedettes', produitsController.getFeaturedProducts);

// Récupérer un produit par ID
router.get('/:id', validateParams(schemas.id), produitsController.getProduitById);

// Créer un nouveau produit
router.post(
  '/',
  (req, res, next) => {
    if (req.is('multipart/form-data')) {
      return upload.single('image')(req, res, next);
    }
    next();
  },
  produitsController.createProduit
);

//  Mettre à jour un produit
router.put(
  '/:id',
  validateParams(schemas.id),
  (req, res, next) => {
    if (req.is('multipart/form-data')) {
      return upload.single('image')(req, res, next);
    }
    next();
  },
  produitsController.updateProduit
);

// Supprimer un produit
router.delete('/:id', validateParams(schemas.id), produitsController.deleteProduit);

//  Récupérer les catégories disponibles
router.get('/categories/liste', produitsController.getCategories);

module.exports = router;

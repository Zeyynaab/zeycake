// src/routes/produits.js
const express = require('express');
const { validateParams, schemas } = require('../middleware/validation');
const produitsController = require('../controllers/produitsController');
const router = express.Router();
const authUser  = require('../middleware/authUser');
const authAdmin = require('../middleware/admin');
const upload = require('../middleware/upload');

// GET /api/produits - Récupérer tous les produits
router.get('/', produitsController.getAllProduits);

// GET /api/produits/vedettes - Récupérer les produits vedettes
router.get('/vedettes', produitsController.getFeaturedProducts);

// GET /api/produits/:id - Récupérer un produit par ID
router.get('/:id', validateParams(schemas.id), produitsController.getProduitById);

// POST /api/produits - Créer un nouveau produit
router.post(
  '/',
  // Multer **seulement** si form-data (upload réel), sinon passe à createProduit()
  (req, res, next) => {
    if (req.is('multipart/form-data')) {
      return upload.single('image')(req, res, next);
    }
    next();
  },
  produitsController.createProduit
);

// PUT /api/produits/:id - Mettre à jour un produit
router.put(
  '/:id',
  validateParams(schemas.id),
  // même logique conditionnelle pour les updates avec fichier
  (req, res, next) => {
    if (req.is('multipart/form-data')) {
      return upload.single('image')(req, res, next);
    }
    next();
  },
  produitsController.updateProduit
);

// DELETE /api/produits/:id - Supprimer un produit
router.delete('/:id', validateParams(schemas.id), produitsController.deleteProduit);

// GET /api/produits/categories/liste - Récupérer les catégories disponibles
router.get('/categories/liste', produitsController.getCategories);

module.exports = router;

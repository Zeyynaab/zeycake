const express = require('express');
const { validateBody, validateParams, schemas } = require('../middleware/validation');
const produitsController = require('../controllers/produitsController'); // Importer le contrôleur
const router = express.Router();
const upload = require('../middleware/upload');


// GET /api/produits - Récupérer tous les produits
router.get('/', produitsController.getAllProduits);
//Nouveau
router.get('/vedettes', produitsController.getFeaturedProducts);

// GET /api/produits/:id - Récupérer un produit par ID
router.get('/:id', validateParams(schemas.id), produitsController.getProduitById);
 

// POST /api/produits - Créer un nouveau produit
//desactiver car pas compatible avec fichier
//router.post('/', validateBody(schemas.produit), produitsController.createProduit);
//nouvelle modif pour upload limage 
router.post('/', upload.single('image'), produitsController.createProduit);

// PUT /api/produits/:id - Mettre à jour un produit
//router.put('/:id', validateParams(schemas.id), validateBody(schemas.produit), produitsController.updateProduit);
//nouvelle modif pour upload limage
router.put('/:id', validateParams(schemas.id), upload.single('image'), produitsController.updateProduit);

// DELETE /api/produits/:id - Supprimer un produit
router.delete('/:id', validateParams(schemas.id), produitsController.deleteProduit);

// GET /api/produits/categories/liste - Récupérer les catégories disponibles
router.get('/categories/liste', produitsController.getCategories);

module.exports = router;
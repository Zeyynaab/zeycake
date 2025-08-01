// src/routes/commandes.js
const express               = require('express');
const router                = express.Router();
const commandesController   = require('../controllers/commandesController');
const authUser              = require('../middleware/authUser');
const admin                 = require('../middleware/admin');
const { validateParams, schemas } = require('../middleware/validation');

// CREATE – POST /api/commandes
router.post(
  '/',
  authUser,
  commandesController.createCommande
);

// READ ALL – GET /api/commandes
router.get(
  '/',
  authUser,
  commandesController.getAllCommandes
);

// READ ONE – GET /api/commandes/:id
router.get(
  '/:id',
  authUser,
  validateParams(schemas.id),
  commandesController.getCommandeById
);

// UPDATE (adresse) – PUT /api/commandes/:id
router.put(
  '/:id',
  authUser,
  validateParams(schemas.id),
  commandesController.updateCommande
);

// UPDATE (statut) – PUT /api/commandes/:id/statut (admin only)
router.put(
  '/:id/statut',
  authUser,
  admin,
  validateParams(schemas.id),
  commandesController.updateCommandeStatut
);

// DELETE – DELETE /api/commandes/:id
router.delete(
  '/:id',
  authUser,
  validateParams(schemas.id),
  commandesController.deleteCommande
);

module.exports = router;

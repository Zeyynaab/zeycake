
const express               = require('express');
const router                = express.Router();
const commandesController   = require('../controllers/commandesController');
const authUser              = require('../middleware/authUser');
const admin                 = require('../middleware/admin');
const { validateParams, schemas } = require('../middleware/validation');

//POST /api/commandes
router.post(
  '/',
  authUser,
  commandesController.createCommande
);

// GET /api/commandes
router.get(
  '/',
  authUser,
  commandesController.getAllCommandes
);

// Commandes du client connecté
router.get(
  '/mes-commandes',
  authUser,
  commandesController.getMesCommandes
);

// GET /api/commandes/:id
router.get(
  '/:id',
  authUser,
  validateParams(schemas.id),
  commandesController.getCommandeById
);

// PUT /api/commandes/:id
router.put(
  '/:id',
  authUser,
  validateParams(schemas.id),
  commandesController.updateCommande
);


router.put(
  '/:id/statut',
  authUser,
  admin,
  validateParams(schemas.id),
  commandesController.updateCommandeStatut
);

// DELETE /api/commandes/:id
router.delete(
  '/:id',
  authUser,
  validateParams(schemas.id),
  commandesController.deleteCommande
);

module.exports = router;

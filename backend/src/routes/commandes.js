const express = require('express');
const { validateBody, validateParams, schemas } = require('../middleware/validation');
const router = express.Router();

const verifyToken = require('../middleware/auth');       // ✅ Admin uniquement
const authUser = require('../middleware/authUser');      // ✅ Admin + Client

const commandesController = require('../controllers/commandesController'); // Contrôleur

// ✅ ADMIN uniquement
router.get('/', verifyToken, commandesController.getAllCommandes);
router.put('/:id/statut', verifyToken, validateParams(schemas.id), commandesController.updateCommandeStatut);
router.delete('/:id', authUser, validateParams(schemas.id), commandesController.deleteCommande);

// ✅ CLIENT + ADMIN
router.get('/mes-commandes', authUser, commandesController.getCommandesUtilisateur); 
//router.post('/', authUser, validateBody(schemas.commande), commandesController.createCommande);
router.post('/', authUser, commandesController.createCommande);
router.get('/:id', authUser, validateParams(schemas.id), commandesController.getCommandeById);

module.exports = router;

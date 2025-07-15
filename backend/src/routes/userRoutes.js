const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//console.log('🧪 CONTENU DE userController :', userController);
const verifyToken = require('../middleware/auth');
const { validateBody, schemas } = require('../middleware/validation');


// Récupérer les utilisateurs filtrés par rôle (ex: ?role=client)
router.get('/', verifyToken, userController.getUsersByRole);

// Obtenir le profil utilisateur actuel
router.get('/profile', verifyToken, userController.getProfile);

// Mettre à jour un utilisateur
router.put('/:id', verifyToken, validateBody(schemas.update), userController.updateUser);

// Supprimer un utilisateur
router.delete('/:id', verifyToken, userController.deleteUser);


//router.get('/clients', verifyToken, userController.getAllClients);


module.exports = router;

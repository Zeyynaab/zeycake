// src/routes/userRoutes.js
const express        = require('express');
const router         = express.Router();
const authUser       = require('../middleware/authUser');  
const admin = require ('../middleware/admin'); 
const {validateParams, schemas } = require('../middleware/validation');
const userController = require('../controllers/userController');

// Liste des utilisateurs (authentifié)
router.get('/', authUser, userController.getAllUsers);

// Création d’un client par un admin
router.post('/', authUser, admin, userController.createUser);

// Lecture / mise à jour / suppression
router
  .get('/:id', authUser, validateParams(schemas.id), userController.getUserById)
  .put('/:id', authUser, validateParams(schemas.id), userController.updateUser)
  .delete('/:id', authUser, validateParams(schemas.id), userController.deleteUser);

module.exports = router;

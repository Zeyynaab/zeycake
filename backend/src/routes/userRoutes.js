// src/routes/userRoutes.js
const express        = require('express');
const router         = express.Router();
const authUser       = require('../middleware/authUser');                // default export
const { validateParams, schemas } = require('../middleware/validation');
const userController = require('../controllers/userController');

router
  .get(   '/',      authUser,                          userController.getAllUsers)
  .get(   '/:id',   authUser, validateParams(schemas.id), userController.getUserById)
  .put(   '/:id',   authUser, validateParams(schemas.id), userController.updateUser)
  .delete('/:id',   authUser, validateParams(schemas.id), userController.deleteUser);

module.exports = router;

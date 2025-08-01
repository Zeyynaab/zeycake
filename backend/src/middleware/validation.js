// middleware/validation.js
const Joi = require('joi');

// Schémas
const schemas = {
  id: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  produit: Joi.object({
    nom: Joi.string().min(2).required(),
    description: Joi.string().allow(''),
    prix: Joi.number().positive().required(),
    categorie: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()),
    tempsPreparation: Joi.number().integer().min(0),
    difficulte: Joi.string().valid('facile', 'moyen', 'difficile'),
    disponible: Joi.boolean()
  }),
  client: Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    telephone: Joi.string().allow('', null),
    adresse: Joi.object().optional(),
    role : Joi.string().valid('client', 'admin').optional()
  }),
  commande: Joi.object({
    clientId: Joi.string().hex().length(24).optional(),
    produits: Joi.array().items(
    Joi.object({
      nom: Joi.string().required(),
      qte: Joi.number().integer().min(1).required(),
      prix: Joi.number().positive().required()
    })
  ).required(),
     dateCommande: Joi.date().optional(),
    dateRecuperation: Joi.date().optional(),
    statut: Joi.string().valid('en-attente', 'en-preparation', 'pret', 'livre').optional(),
    total: Joi.number().required(),
    commentaires: Joi.string().allow('', null).optional()
    }),
  ingredient: Joi.object({
    nom: Joi.string().required(),
    unite: Joi.string().required(),
    prix: Joi.number().positive().required(),
    fournisseur: Joi.string().allow('', null),
    stock: Joi.number().integer().min(0),
    seuilAlerte: Joi.number().integer().min(0)
  }),
  update: Joi.object({
    nom: Joi.string(),
    prenom: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid('client', 'admin')
  })
};

// Fonctions de validation
const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.params);
    if (result.error) {
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  };
};

module.exports = {
  schemas,
  validateBody,
  validateParams
};

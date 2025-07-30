// models/Ingredient.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  nom: { type: String, required: true },
  unite: { type: String, required: true },
  prix: { type: Number, required: true },
  stock :{type: Number, default: 0},
  fournisseur: { type: String, default: '' },
  seuilAlerte: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);

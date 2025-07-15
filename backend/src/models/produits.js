// models/Product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  nom: { type: String, required: true },
  description: String,
  prix: { type: Number, required: true },
  image: {type: String, required: true},
  categorie: { type: String, required: true },
  ingredients: [{ type: String }],
  tempsPreparation: Number,
  difficulte: String,
  disponible: { type: Boolean, default: true },
  vedette: {type:Boolean, default:false} //nouveau
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

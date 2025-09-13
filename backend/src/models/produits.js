const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  nom: { type: String, required: true },
  description: {type: String, required: true},
  prix: { type: Number, required: true },
  image: {type: String, required: false},
  categorie: { type: String, required: true },
  ingredients: [{ type: String }],
  tempsPreparation: Number,
  difficulte: String,
  disponible: { type: Boolean, default: true },
  vedette: {type:Boolean, default:false} 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

// models/Commande.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commandeSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  produits: [{ type: String, required: true }], 
  quantites :[{type: Number}],
  dateCommande: { type: Date, default: Date.now },
  dateRecuperation: Date,
  statut: { type: String, default: 'en-attente' },
  total: { type: Number, required: true },
  commentaires: String,
  adresse: String,
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);

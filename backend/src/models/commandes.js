const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProduitDansCommandeSchema = new Schema({
  nom: { type: String, required: true },
  qte: { type: Number, required: true },
  prix: { type: Number, required: true },
  produit: { type: Schema.Types.ObjectId, ref: 'Produit' } 
}, { _id: false });

const commandeSchema = new Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produits: { type: [ProduitDansCommandeSchema], required: true },
  dateCommande: { type: Date, default: Date.now },
  dateRecuperation: Date,
  statut: { type: String, default: 'en-attente' },
  total: { type: Number, required: true },
  commentaires: String,
  adresse: String,
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);

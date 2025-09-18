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
  //Mode payement
  paymentMethod: { type: String, enum: ['card_deposit','cash','card_full'], default: 'card_deposit' },
  paymentStatus: { type: String, enum: ['deposit_required','deposit_paid','paid','failed'], default: 'deposit_required' },
  totalCents:   { type: Number, default: 0 },  // total en cents (sécurisé côté serveur)
  depositCents: { type: Number, default: 0 },  // acompte en cents
  balanceCents: { type: Number, default: 0 },  // restant en cents
  stripePaymentIntentId:  { type: String },    // PI de l’acompte
  stripeBalanceIntentId:  { type: String },    // (optionnel) PI du solde si payé par carte
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);

/* // controllers/clientsController.js
const Client = require('../models/clients');
const Commande = require('../models/commandes');
const User = require('../models/user'); 

exports.getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password');
    res.json(clients);
  } catch (err) {
    console.error("❌ Erreur dans getAllClients:", err.message);  // a enlever
    res.status(500).json({ message: 'Erreur lors du chargement des clients', error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client non trouvé' });

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { nom, prenom, email, password} = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashed = await bcrypt.hash(password, 10);

    const client = new User({
      nom,
      prenom,
      email,
      password: hashed,
      role: 'client',
       });

    await client.save();
    res.status(201).json({ message: 'Client créé', client });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du client', error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) return res.status(404).json({ message: 'Client non trouvé' });

    res.json({ message: 'Client mis à jour', client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: 'Client non trouvé' });

    res.json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getClientCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find({ clientId: req.params.id });
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes du client', error: error.message });
  }
};
 */
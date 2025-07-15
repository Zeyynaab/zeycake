/* const Client = require('../models/clients');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d’un client
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password,} = req.body;

    // Vérifier si l’email est déjà utilisé
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouveau client
    const nouveauClient = await Client.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Client inscrit avec succès',
      client: {
        id: nouveauClient._id,
        nom: nouveauClient.nom,
        email: nouveauClient.email,
      }
    });
  } catch (error) {
    console.error('Erreur inscription client :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion d’un client
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que le client existe
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: 'Aucun compte trouvé avec cet email.' });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, client.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: client._id, email: client.email, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: client._id,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email,
        role: 'client',
      }
    });
  } catch (error) {
    console.error('Erreur connexion client :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
 */
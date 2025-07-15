const User = require('../models/user');
const bcrypt = require('bcryptjs');

// ✅ GET /api/users/profile — profil utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du profil", error: error.message });
  }
};

// ✅ PUT /api/users/:id — mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, role } = req.body;
    const updateData = { nom, prenom, email, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur mis à jour", user: updated });
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour utilisateur", error: error.message });
  }
};

// ✅ DELETE /api/users/:id — supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression utilisateur", error: error.message });
  }
};

/* // GET /api/users/clients — récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération clients", error: error.message });
  }
}; */
exports.getUsersByRole = async (req, res) => {
  try {
    const role = req.query.role || 'client';
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message });
  }
};


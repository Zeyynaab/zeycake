import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import API from '../api/api';

function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get('/users?role=client', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setClients(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des clients :', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (client) => {
    setIsEditing(true);
    setSelectedId(client._id);
    setFormData({
      nom: client.nom || '',
      prenom: client.prenom || '',
      email: client.email || '',
      telephone: client.telephone || '',
      password: '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce client ?')) {
      try {
        await API.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchClients();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData, role: 'client' };

    const url = isEditing ? `/users/${selectedId}` : '/users';
    const method = isEditing ? 'put' : 'post';

    try {
      await API[method](url, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
      });
      setIsEditing(false);
      setSelectedId(null);
      fetchClients();
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestion des clients</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required={!isEditing} />
        <button type="submit" className="btn-submit">{isEditing ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.nom}</td>
              <td>{client.prenom}</td>
              <td>{client.email}</td>
              <td>{client.telephone}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(client)}>Modifier</button>
                <button className="btn-delete" onClick={() => handleDelete(client._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsAdmin;

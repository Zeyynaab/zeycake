import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import API, { fetchProduits } from '../api/api';

function ProduitsAdmin() {
  const [produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    categorie: '',
    disponible: true,
    vedette: false,
  });
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchProduitsList();
  }, []);

  const fetchProduitsList = async () => {
    try {
      const res = await fetchProduits();
      setProduits(res.data);
    } catch (err) {
      console.error('Erreur produits :', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEdit = (prod) => {
    setFormData({
      nom: prod.nom || '',
      description: prod.description || '',
      prix: prod.prix || '',
      categorie: prod.categorie || '',
      disponible: prod.disponible ?? true,
      vedette: prod.vedette ?? false,
    });
    setSelectedId(prod._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce produit ?')) {
      try {
        await API.delete(`/produits/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchProduitsList();
      } catch (err) {
        console.error('Erreur suppression produit :', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/produits/${selectedId}` : '/produits';
    const method = isEditing ? 'put' : 'post';

    try {
      const form = new FormData();
      form.append('nom', formData.nom);
      form.append('description', formData.description);
      form.append('prix', formData.prix);
      form.append('categorie', formData.categorie);
      form.append('disponible', formData.disponible);
      form.append('vedette', formData.vedette);
      if (image) {
        form.append('image', image);
      }

      await API[method](url, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setFormData({
        nom: '',
        description: '',
        prix: '',
        categorie: '',
        disponible: true,
        vedette: false,
      });
      setImage(null);
      setIsEditing(false);
      setSelectedId(null);
      fetchProduitsList();
    } catch (err) {
      console.error('Erreur ajout/modification produit :', err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestion des produits</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="number" name="prix" placeholder="Prix" value={formData.prix} onChange={handleChange} required />
        <input type="text" name="categorie" placeholder="Catégorie" value={formData.categorie} onChange={handleChange} required />

        <label className="checkbox-label">
          <input type="checkbox" name="disponible" checked={formData.disponible} onChange={handleChange} />
          Disponible
        </label>

        <label className="checkbox-label">
          <input type="checkbox" name="vedette" checked={formData.vedette} onChange={handleChange} />
          Produit vedette
        </label>

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">{isEditing ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Disponible</th>
            <th>Vedette</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.nom}</td>
              <td>{prod.description}</td>
              <td>{prod.prix} $</td>
              <td>{prod.categorie}</td>
              <td>{prod.disponible ? 'Oui' : 'Non'}</td>
              <td>{prod.vedette ? '⭐️' : '–'}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(prod)}>Modifier</button>
                <button className="btn-delete" onClick={() => handleDelete(prod._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProduitsAdmin;

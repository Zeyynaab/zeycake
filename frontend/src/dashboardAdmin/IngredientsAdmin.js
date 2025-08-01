import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import API from '../api/api';

function IngredientsAdmin() {
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    unite: '',
    prix: '',
    fournisseur: '',
    stock: '',
    seuilAlerte: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await API.get('/ingredients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setIngredients(res.data);
    } catch (err) {
      console.error('Erreur récupération ingrédients :', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setSelectedId(item._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet ingrédient ?')) {
      try {
        await API.delete(`/ingredients/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchIngredients();
      } catch (err) {
        console.error('Erreur suppression ingrédient :', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'put' : 'post';
    const url = isEditing ? `/ingredients/${selectedId}` : `/ingredients`;

    try {
      await API[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Réinitialise
      setFormData({
        nom: '',
        unite: '',
        prix: '',
        fournisseur: '',
        stock: '',
        seuilAlerte: '',
      });
      setIsEditing(false);
      setSelectedId(null);
      fetchIngredients();
    } catch (err) {
      console.error('Erreur soumission ingrédient :', err);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestion des ingrédients</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <input type="text" name="unite" placeholder="Unité" value={formData.unite} onChange={handleChange} required />
        <input type="number" name="prix" placeholder="Prix" value={formData.prix} onChange={handleChange} required />
        <input type="text" name="fournisseur" placeholder="Fournisseur" value={formData.fournisseur} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        <input type="number" name="seuilAlerte" placeholder="Seuil d’alerte" value={formData.seuilAlerte} onChange={handleChange} required />
        <button type="submit">{isEditing ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Unité</th>
            <th>Prix</th>
            <th>Fournisseur</th>
            <th>Stock</th>
            <th>Seuil alerte</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing) => (
            <tr key={ing._id}>
              <td>{ing.nom}</td>
              <td>{ing.unite}</td>
              <td>{ing.prix} $</td>
              <td>{ing.fournisseur}</td>
              <td>{ing.stock}</td>
              <td>{ing.seuilAlerte}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(ing)}>Modifier</button>
                <button className="btn-delete" onClick={() => handleDelete(ing._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IngredientsAdmin;

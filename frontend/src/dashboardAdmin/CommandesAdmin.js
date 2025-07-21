import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import API from '../api/api';
import { fetchCommandesAdmin } from '../api/api';

function CommandesAdmin() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      const res = await fetchCommandesAdmin(); 
      setCommandes(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des commandes :', err);
    }
  };

  const updateStatut = async (id, newStatut) => {
    try {
      await API.put(`/commandes/${id}/statut`, { statut: newStatut });
      fetchCommandes();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut :', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette commande ?')) {
      try {
        await API.delete(`/commandes/${id}`);
        fetchCommandes();
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestion des commandes</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Produits</th>
            <th>Total</th>
            <th>Date commande</th>
            <th>Date récupération</th>
            <th>Statut</th>
            <th>Commentaires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((cmd) => (
            <tr key={cmd._id}>
              <td>{cmd.clientId?.nom} {cmd.clientId?.prenom}</td>
              <td>
                <ul className="produits-list">
                  {cmd.produits.map((prod, idx) => (
                    <li key={idx}>{prod.nom} x {prod.qte}</li>
                  ))}
                </ul>
              </td>
              <td>{cmd.total} $</td>
              <td>{new Date(cmd.dateCommande).toLocaleDateString()}</td>
              <td>{cmd.dateRecuperation ? new Date(cmd.dateRecuperation).toLocaleDateString() : 'Non défini'}</td>
              <td>
                <select
                  value={cmd.statut}
                  onChange={(e) => updateStatut(cmd._id, e.target.value)}
                  className="statut-select"
                >
                  <option value="en-attente">En attente</option>
                  <option value="en-preparation">En préparation</option>
                  <option value="prete">Prête</option>
                  <option value="recuperee">Récupérée</option>
                </select>
              </td>
              <td>{cmd.commentaires}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(cmd._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommandesAdmin;

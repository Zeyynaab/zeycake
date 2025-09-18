import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import API, { fetchCommandesAdmin } from '../api/api';

const fmt = (cents, fallback = 0) =>
  typeof cents === 'number' ? (cents / 100).toFixed(2) : fallback.toFixed(2);

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
            <th>Acompte</th>
            <th>Restant</th>
            <th>Statut paiement</th>
            <th>Date commande</th>
            <th>Date récupération</th>
            <th>Statut</th>
            <th>Commentaires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((cmd) => {
            const total = Number(cmd.total || 0);
            const depositDisplay =
              cmd.depositCents !== undefined
                ? `${fmt(cmd.depositCents)} $`
                : `${(total * 0.4).toFixed(2)} $`;
            const balanceDisplay =
              cmd.balanceCents !== undefined
                ? `${fmt(cmd.balanceCents)} $`
                : `${(total * 0.6).toFixed(2)} $`;

            return (
              <tr key={cmd._id}>
                <td>{cmd.clientId?.nom} {cmd.clientId?.prenom}</td>
                <td>
                  <ul className="produits-list">
                    {cmd.produits.map((prod, idx) => (
                      <li key={idx}>{prod.nom} x {prod.qte}</li>
                    ))}
                  </ul>
                </td>

                <td>{total.toFixed(2)} $</td>
                <td>{depositDisplay}</td>
                <td>{balanceDisplay}</td>
                <td>{cmd.paymentStatus || 'deposit_required'}</td>

                <td>{cmd.dateCommande ? new Date(cmd.dateCommande).toLocaleDateString() : '—'}</td>
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
                  <button className="btn-delete" onClick={() => handleDelete(cmd._id)}>
                    Supprimer
                  </button>
                  {/* (Optionnel) bouton “Marquer payé” si le solde est réglé à l’enlèvement
                  <button
                    className="btn-edit"
                    style={{ marginLeft: 8 }}
                    onClick={async () => {
                      try {
                        await API.put(`/commandes/${cmd._id}`, { paymentStatus: 'paid', balanceCents: 0 });
                        fetchCommandes();
                      } catch (err) {
                        console.error(err);
                        alert("Impossible de marquer la commande comme payée.");
                      }
                    }}
                  >
                    Marquer payé
                  </button>
                  */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CommandesAdmin;

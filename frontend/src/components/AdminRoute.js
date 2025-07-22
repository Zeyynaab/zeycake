import React from 'react';
import { Navigate } from 'react-router-dom';
//import AdminLogin from '../dashboardAdmin/AdminLogin';
import AdminDashboard from '../dashboardAdmin/AdminDashboard';
import ClientsAdmin from '../dashboardAdmin/ClientsAdmin';
import CommandesAdmin from '../dashboardAdmin/CommandesAdmin';
import ProduitsAdmin from '../dashboardAdmin/ProduitsAdmin';
import IngredientsAdmin from '../dashboardAdmin/IngredientsAdmin';

const AdminRoute = ({ page }) => {
  //const user = JSON.parse(localStorage.getItem('user'));
//NEW 
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin) {
    return <Navigate to ="/admin/login" />; // Pas connecté ? Formulaire
  }

  if (admin.role !== 'admin') {
    return <Navigate to="/" />; // Connecté mais pas admin
  }

  // Selon le nom de la page, on retourne le bon composant
  if (page === 'dashboard') return <AdminDashboard />;
  if (page === 'clients') return <ClientsAdmin />;
  if (page === 'commandes') return <CommandesAdmin />;
  if (page === 'produits') return <ProduitsAdmin />;
  if (page === 'ingredients') return <IngredientsAdmin />;

  return <Navigate to="/" />;
};

export default AdminRoute;

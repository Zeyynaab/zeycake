import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../dashboardAdmin/AdminDashboard';
import ClientsAdmin from '../dashboardAdmin/ClientsAdmin';
import CommandesAdmin from '../dashboardAdmin/CommandesAdmin';
import ProduitsAdmin from '../dashboardAdmin/ProduitsAdmin';
import IngredientsAdmin from '../dashboardAdmin/IngredientsAdmin';

const AdminRoute = ({ page }) => {
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (!admin) {
    return <Navigate to ="/admin/login" />; 
  }

  if (admin.role !== 'admin') {
    return <Navigate to="/" />; // Connecté mais pas admin
  }

  
  if (page === 'dashboard') return <AdminDashboard />;
  if (page === 'clients') return <ClientsAdmin />;
  if (page === 'commandes') return <CommandesAdmin />;
  if (page === 'produits') return <ProduitsAdmin />;
  if (page === 'ingredients') return <IngredientsAdmin />;

  return <Navigate to="/" />;
};

export default AdminRoute;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Faq from './pages/Faq';
import './style/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './dashboardAdmin/AdminLogin';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && location.pathname !== '/' && <Header />}
      {isAdminPage && location.pathname !== '/admin/login' && <AdminNavbar />}

      <ScrollToTop />
      <Routes>
        {/* Côté client */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/faq" element={<Faq />} />

        {/* Côté admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute page="dashboard" />} />
        <Route path="/admin/clients" element={<AdminRoute page="clients" />} />
        <Route path="/admin/commandes" element={<AdminRoute page="commandes" />} />
        <Route path="/admin/produits" element={<AdminRoute page="produits" />} />
        <Route path="/admin/ingredients" element={<AdminRoute page="ingredients" />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

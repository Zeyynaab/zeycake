import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import './style/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import AdminRoute from './components/AdminRoute'; //new path admin
import AdminLogin from './dashboardAdmin/AdminLogin';
//Import pages admin
/* import ClientsAdmin from './dashboardAdmin/ClientsAdmin';
import CommandesAdmin from './dashboardAdmin/CommandesAdmin';
import ProduitsAdmin from './dashboardAdmin/ProduitsAdmin';
import IngredientsAdmin from './dashboardAdmin/IngredientsAdmin';
import AdminDashboard from './dashboardAdmin/AdminDashboard';
 */

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  //const showHeader = location.pathname !== '/';
    return (
      <>
      {/*{!isAdminPage && location.pathname !== '/' && <Header />} */}
      {/*{!isAdminPage && !['/', '/auth'].includes(location.pathname) && <Header />}*/}
      {!isAdminPage && location.pathname !== '/' && <Header />}

      {isAdminPage && location.pathname !== '/admin/login' && <AdminNavbar />}



      {/* {showHeader && <Header />} */}
            <Routes>
              {/*Coté client*/ }
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />

                {/**Coté admin */}
                {/* Dashboard admin */}
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
const App = () =>{
  return (
    <Router>
      <AppContent />
      
    </Router>
  );
};

export default App;
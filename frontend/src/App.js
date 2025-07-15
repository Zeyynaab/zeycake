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


//Import pages admin
import ClientsAdmin from './dashboardAdmin/ClientsAdmin';
import CommandesAdmin from './dashboardAdmin/CommandesAdmin';
import ProduitsAdmin from './dashboardAdmin/ProduitsAdmin';
import IngredientsAdmin from './dashboardAdmin/IngredientsAdmin';
import AdminDashboard from './dashboardAdmin/AdminDashboard';


const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  //const showHeader = location.pathname !== '/';
    return (
      <>
      {!isAdminPage && location.pathname !== '/' && <Header />}
      {isAdminPage && <AdminNavbar />}

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
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/clients" element={<ClientsAdmin />} />
                <Route path="/admin/commandes" element={<CommandesAdmin />} />
                <Route path="/admin/produits" element={<ProduitsAdmin />} />
                <Route path="/admin/ingredients" element={<IngredientsAdmin />} />
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
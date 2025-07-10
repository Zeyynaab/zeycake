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


const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';
    return (
      <>
      {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                
            </Routes>
            <Footer />
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
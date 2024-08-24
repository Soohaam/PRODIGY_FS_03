import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ProductListPage from './components/ProductListPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import Reviews from './components/Reviews';
import HomePage from './components/HomePage'
import CartPage from './components/CartPage';
import OrderListPage from './components/OrderListPage';
import OrderDetailsPage from './components/OrderDetailsPage';
import RegisterPage from './components/RegisterPage';



// import other pages

const App = () => {
    const [user, setUser] = useState(null); 

    const handleLogin = (userData) => {
      setUser(userData); 
    };
  
    const handleLogout = () => {
      setUser(null); 
      localStorage.removeItem('token'); 
    };
  return (
    
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ProductListPage" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} /> 
        <Route path="/Reviews" element={<Reviews />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/OrderListPage" element={<OrderListPage />} />
        <Route path="/Orders/:id" element={<OrderDetailsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

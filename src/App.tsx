import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home';
// import Shop from './pages/Shop';
import ProductLayout from './layouts/ProductLayout'; // Import ProductLayout
import Product from './pages/Product/Product'; // Import Product
// import HomeLayout from './layouts/HomeLayout'; // Import HomeLayout

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Home menggunakan HomeLayout
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Shop tanpa layout khusus */}
        {/* <Route path="/shop" element={<Shop />} /> */} 

        {/* Redirect root and /shop to /product/1 */}
        <Route path="/" element={<Navigate to="/product/1" />} />
        <Route path="/shop" element={<Navigate to="/product/1" />} />
        
        {/* Route for /product, redirects to /product/1 if no specific product ID is provided */}
        <Route path="/product" element={<Navigate to="/product/1" replace />} />

        {/* Product routes */}
        <Route path="/product/:id" element={<ProductLayout />}>
          <Route index element={<Product />} />
        </Route>

        {/* Product menggunakan ProductLayout */}
        {/* <Route path="/product" element={<ProductLayout />}>
          <Route path=":id" element={<Product />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;

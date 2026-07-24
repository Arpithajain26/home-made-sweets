import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import NotFound from '../pages/NotFound';
import AdminOrders from '../pages/AdminOrders';
import About from '../pages/About';
import Profile from '../pages/Profile';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
    </Routes>
  );
};

export default AppRoutes;
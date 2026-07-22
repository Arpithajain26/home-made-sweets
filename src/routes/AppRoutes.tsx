import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import NotFound from '../pages/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
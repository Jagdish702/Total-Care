import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ProductExplorePage from './components/ProductExplorePage/ProductExplorePage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import UserDetailsPage from './components/UserDetailsPage/UserDetailsPage';
import PaymentPage     from './components/PaymentPage/PaymentPage';
import { CartProvider } from './context/CartContext';
import CartToast  from './components/CartToast/CartToast';
import CartPanel  from './components/CartPanel/CartPanel';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        {/* Global overlays — toast + sliding cart panel */}
        <CartToast />
        <CartPanel />

        <Routes>
          <Route path="/"            element={<App />} />
          <Route path="/product/:id" element={<ProductExplorePage />} />
          <Route path="/checkout"      element={<CheckoutPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/payment"      element={<PaymentPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

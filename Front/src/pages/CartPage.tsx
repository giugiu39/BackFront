import React from 'react';
import Layout from '../components/common/Layout';
import CartSummary from '../components/customer/CartSummary';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    // Procedi al checkout
    window.location.href = '/checkout';
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
        </div>

        <CartSummary onCheckout={handleCheckout} />
      </div>
    </Layout>
  );
};

export default CartPage;
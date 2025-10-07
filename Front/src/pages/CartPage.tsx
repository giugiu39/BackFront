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
      <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Background decorativo */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header hero, in linea con le altre pagine */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Your Shopping Cart
                </h1>
                <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
              </div>
              <div className="hidden sm:block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  Safe checkout • Free shipping
                </span>
              </div>
            </div>
          </div>

          <CartSummary onCheckout={handleCheckout} />
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
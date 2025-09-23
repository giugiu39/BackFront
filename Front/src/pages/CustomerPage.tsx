import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import ProductList from '../components/customer/ProductList';
import OrderHistory from '../components/customer/OrderHistory';
import Wishlist from '../components/customer/Wishlist';
import UserProfile from '../components/customer/UserProfile';

const CustomerPage: React.FC = () => {
  const { isCustomer, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  // Mostra un loader mentre verifichiamo l'autenticazione
  if (loading) {
    return <div className="loading">Caricamento...</div>;
  }

  // Redirect se non è customer
  if (!isCustomer) {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'orders':
        return <OrderHistory />;
      case 'wishlist':
        return <Wishlist />;
      case 'profile':
        return <UserProfile />;
      default:
        return <ProductList />;
    }
  };

  return (
    <CustomerLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </CustomerLayout>
  );
};

export default CustomerPage;
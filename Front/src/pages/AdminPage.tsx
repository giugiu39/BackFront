import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManagement from '../components/admin/ProductManagement';

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mostra un loader mentre verifichiamo l'autenticazione
  if (loading) {
    return <div className="loading">Caricamento...</div>;
  }

  // Redirect se non è admin - usando window.location invece di Navigate
  if (!loading && !isAdmin) {
    window.location.href = '/login';
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <ProductManagement />;

      case 'orders':
        return <div>Order Management - Coming Soon</div>;
      case 'customers':
        return <div>Customer Management - Coming Soon</div>;
      case 'analytics':
        return <div>Analytics - Coming Soon</div>;
      case 'coupons':
        return <div>Coupon Management - Coming Soon</div>;
      case 'faqs':
        return <div>FAQ Management - Coming Soon</div>;
      case 'settings':
        return <div>Settings - Coming Soon</div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPage;
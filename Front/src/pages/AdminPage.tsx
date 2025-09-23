import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManagement from '../components/admin/ProductManagement';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Redirect se non è admin
  if (!user || user.role !== 'admin') {
    window.location.href = '/admin/login';
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <div>Categories Management - Coming Soon</div>;
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
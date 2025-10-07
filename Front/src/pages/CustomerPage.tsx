import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import ProfilePage from './ProfilePage';
import { useAuth } from '../contexts/AuthContext';
import { User, ShoppingBag, Package, Heart, Settings, CreditCard, Tag } from 'lucide-react';

const CustomerPage: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Check if we're on a specific customer sub-route
    const path = window.location.pathname;
    if (path === '/customer/profile') return 'profile';
    return 'dashboard';
  });

  // Mostra un loader mentre verifichiamo l'autenticazione
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Redirect se non è autenticato SOLO dopo che il loading è completato
  if (!loading && !isAuthenticated) {
    console.log('Customer page: User not authenticated, redirecting to login');
    window.location.href = '/login';
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfilePage />;
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
            <p className="text-gray-600">Here you will see your order history.</p>
          </div>
        );
      case 'wishlist':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h2>
            <p className="text-gray-600">Here you will see the products you have saved to your wishlist.</p>
          </div>
        );
      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
            <p className="text-gray-600">Manage your saved payment methods.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <p className="text-gray-600">Edit your account settings.</p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Recent Orders</h3>
                <p className="text-gray-600 text-sm">View your most recent orders</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <Heart className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Wishlist</h3>
                <p className="text-gray-600 text-sm">Products you saved for later</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <ShoppingBag className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Cart</h3>
                <p className="text-gray-600 text-sm">Complete your purchases</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name || 'Customer'}!
            </h1>
            <p className="text-gray-600 mt-2">Manage your account and view your orders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user?.name || 'Cliente'}</h3>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              // Handle Categories navigation differently
                              if (item.id === 'categories') {
                                window.location.href = '/categories';
                                return;
                              }
                              
                              setActiveTab(item.id);
                              // Update URL for profile tab
                              if (item.id === 'profile') {
                                window.history.pushState({}, '', '/customer/profile');
                              } else {
                                window.history.pushState({}, '', '/customer');
                              }
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              activeTab === item.id
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerPage;
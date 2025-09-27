import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag, Clock, Heart, User } from 'lucide-react';

interface CustomerLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'products', label: 'Products', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'orders', label: 'My orders', icon: <Clock className="w-5 h-5" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">E-Commerce</h1>
          <p className="text-sm text-gray-600 mt-1">Area Cliente</p>
        </div>
        
        <div className="px-4 py-2">
          <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center w-full px-4 py-2 text-sm rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="px-4 py-2 mt-auto border-t border-gray-100">
          <div className="pt-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.username || 'Utente'}</p>
                <p className="text-xs text-gray-500">Cliente</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
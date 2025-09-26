import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
import AdminProductManagement from '../components/admin/AdminProductManagement';
import AdminOrderManagement from '../components/admin/AdminOrderManagement';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3,
  Plus,
  Settings
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  // Remove the redirect logic - let ProtectedRoute handle role-based access
  // if (!isAdmin) {
  //   return <div>Redirecting to customer dashboard...</div>;
  // }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Amministratore
              </h1>
              <p className="mt-2 text-gray-600">
                Benvenuto, {user?.name}! Gestisci il tuo e-commerce da qui.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Prodotti Totali</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ordini Oggi</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Clienti Attivi</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Vendite Mese</p>
                  <p className="text-2xl font-bold text-gray-900">€12,450</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow transition-colors">
              <Plus className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Aggiungi Prodotto</p>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow transition-colors">
              <Package className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Gestisci Prodotti</p>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow transition-colors">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Ordini Clienti</p>
            </button>
            
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-lg shadow transition-colors">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Gestisci Utenti</p>
            </button>
          </div>

          {/* Admin Management Components */}
          <div className="space-y-8">
            <AdminProductManagement />
            <AdminOrderManagement />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
import AdminProductManagement from '../components/admin/AdminProductManagement';
import AdminOrderManagement from '../components/admin/AdminOrderManagement';
import AddProductModal from '../components/admin/AddProductModal';
import { adminApi } from '../services/ApiService';
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
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    monthlySales: 0
  });

  useEffect(() => {
    fetchStats();
  }, [refreshProducts]);

  const fetchStats = async () => {
    try {
      const [productsData] = await Promise.all([
        adminApi.getProducts()
      ]);
      
      setStats(prev => ({
        ...prev,
        totalProducts: productsData?.length || 0
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

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
                Administrator Dashboard
              </h1>
              <p className="mt-2 text-gray-600">
                Welcome, {user?.name}! Manage your e-commerce from here.
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
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Orders Today</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Sales</p>
                  <p className="text-2xl font-bold text-gray-900">€0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow transition-colors"
            >
              <Plus className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Add Product</p>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow transition-colors">
              <Package className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Manage Products</p>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow transition-colors">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Customer Orders</p>
            </button>
            
            <button className="bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-lg shadow transition-colors">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Manage Users</p>
            </button>
          </div>

          {/* Product Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
            <AdminProductManagement key={refreshProducts} />
          </div>

          {/* Order Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Management</h2>
            <AdminOrderManagement />
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <AddProductModal
          isOpen={showAddProductModal}
          onClose={() => setShowAddProductModal(false)}
          onProductAdded={() => {
            setRefreshProducts(prev => prev + 1);
            setShowAddProductModal(false);
          }}
        />
      )}
    </Layout>
  );
};

export default AdminDashboard;
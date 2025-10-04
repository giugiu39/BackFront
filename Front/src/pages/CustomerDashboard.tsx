import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { adminApi, customerApi } from '../services/ApiService';
import { Product } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  TrendingUp,
  Zap,
  Shield,
  Truck,
  Headphones
} from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
  // if (isAdmin) {
  //   return <div>Redirecting to admin dashboard...</div>;
  // }

  // Mock data for categories (keeping these)
  const mockCategories = [
    { id: 'electronics', name: 'Electronics', image: '📱', count: 0 },
    { id: 'clothing', name: 'Clothing', image: '👕', count: 0 },
    { id: 'home-garden', name: 'Home & Garden', image: '🏠', count: 0 },
    { id: 'sports', name: 'Sports', image: '⚽', count: 0 },
    { id: 'books', name: 'Books', image: '📚', count: 0 },
    { id: 'beauty', name: 'Beauty', image: '💄', count: 0 }
  ];

  // Load products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await adminApi.getProducts();
        if (response && Array.isArray(response)) {
          setProducts(response);
          
          // Function to count products by category
          const getProductCountByCategory = (categoryId: string): number => {
            return response.filter(product => 
              product.category && product.category.toLowerCase() === categoryId.toLowerCase()
            ).length;
          };
          
          // Update categories with real product counts
          const updatedCategories = mockCategories.map(category => ({
            ...category,
            count: getProductCountByCategory(category.id)
          }));
          setCategories(updatedCategories);
          
          // Set featured products (first 6 products)
          setFeaturedProducts(response.slice(0, 6));
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to mock data
        setCategories(mockCategories);
        setFeaturedProducts([]);
      }
    };

    loadProducts();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Welcome, {user?.name}!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Discover the best products for you
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                Start Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Shopping</h3>
                <p className="text-gray-600">Protected and secure payments</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Free shipping over €50</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Always available assistance</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Exclusive Offers</h3>
                <p className="text-gray-600">Discounts reserved for members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
              <p className="text-gray-600 text-lg">Find what you're looking for</p>
              <button
                onClick={() => navigate('/categories')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Categories
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  onClick={() => navigate(`/categories/${category.id}`)}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-3">{category.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products - Only show if there are products */}
        {featuredProducts.length > 0 && (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-gray-600 text-lg">This week's bestsellers</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6 text-center">
                      <div className="text-6xl mb-4">{product.image}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center justify-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-4">€{product.price}</p>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 text-lg mb-8">Subscribe to our newsletter for exclusive offers</p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
              />
              <button className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
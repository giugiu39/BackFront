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
  Headphones,
  Users,
  Award,
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Package
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

  // Mock data for categories with better emojis
  const mockCategories = [
    { id: 'electronics', name: 'Electronics', image: '📱', count: 0, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'clothing', name: 'Clothing', image: '👕', count: 0, gradient: 'from-pink-500 to-rose-500' },
    { id: 'home-garden', name: 'Home & Garden', image: '🏠', count: 0, gradient: 'from-green-500 to-emerald-500' },
    { id: 'sports', name: 'Sports', image: '⚽', count: 0, gradient: 'from-orange-500 to-amber-500' },
    { id: 'books', name: 'Books', image: '📚', count: 0, gradient: 'from-purple-500 to-violet-500' },
    { id: 'beauty', name: 'Beauty', image: '💄', count: 0, gradient: 'from-red-500 to-pink-500' }
  ];

  // Load products from backend (use customer API, not admin)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await customerApi.getAllProducts();
        if (response && Array.isArray(response)) {
          setProducts(response as any);
          
          // Function to map category ID to database category name
          const mapCategoryIdToName = (categoryId: string): string => {
            const mapping: { [key: string]: string } = {
              'electronics': 'Electronics',
              'clothing': 'Clothing',
              'home-garden': 'Home & Garden',
              'sports': 'Sports',
              'books': 'Books',
              'beauty': 'Beauty'
            };
            return mapping[categoryId] || categoryId;
          };
          
          // Function to count products by category
          const getProductCountByCategory = (categoryId: string): number => {
            const categoryName = mapCategoryIdToName(categoryId);
            return response.filter((product: any) => {
              // Preferisci product.categoryName (DTO backend), fallback a product.category?.name
              const pCat = product?.categoryName ?? product?.category?.name;
              return pCat && pCat === categoryName;
            }).length;
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
        {/* Hero Section - More minimal */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-24 right-20 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-16 left-1/4 w-8 h-8 bg-white/10 rounded-full animate-ping"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">Welcome to your favorite store</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Hello, {user?.name || 'Shopper'}! 👋
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                Discover thousands of amazing products, exclusive offers and a unique shopping experience
              </p>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => navigate('/customer/products')}
                  className="group bg-white text-indigo-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Kept as requested */}
        <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">We offer a superior shopping experience with quality services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Secure Shopping</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Protected and secure payments with SSL encryption</p>
              </div>
              
              <div className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Free shipping always</p>
              </div>
              
              <div className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">24/7 Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Always available assistance for all your needs</p>
              </div>
              
              <div className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Exclusive Items</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Early access to new arrivals and limited editions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section - More minimal */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
              <p className="text-lg text-gray-600 mb-6">Find exactly what you're looking for</p>
              <button
                onClick={() => navigate('/categories')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Categories
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={category.id} 
                  onClick={() => navigate(`/categories/${category.id}`)}
                  className="group bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-gradient-to-r ${category.gradient} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl">{category.image}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section - More minimal */}
        <div className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600">Real testimonials from satisfied customers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm italic">"Excellent service! Quality products and super fast delivery. Highly recommend!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Marco Rossi</div>
                    <div className="text-gray-500 text-xs">Verified Customer</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm italic">"Fantastic! Found everything I was looking for at unbeatable prices. Will definitely return!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                    L
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Laura Bianchi</div>
                    <div className="text-gray-500 text-xs">Verified Customer</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm italic">"Perfect shopping experience! Intuitive interface and top customer support!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Andrea Verdi</div>
                    <div className="text-gray-500 text-xs">Verified Customer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section - More minimal */}
        <div className="py-16 bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Gift className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="font-semibold text-sm">Special Offer</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Always Updated</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive exclusive offers, special discounts and the latest news
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex bg-white rounded-full p-2 shadow-xl">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 rounded-full text-gray-900 bg-transparent focus:outline-none text-sm"
                />
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center text-sm">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-center mt-4 text-xs text-gray-400">
                <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                No spam, only special offers
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
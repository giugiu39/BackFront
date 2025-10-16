import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import ProductCard from '../components/customer/ProductCard';
import { Product, Category } from '../types';
import { Star, ArrowRight, Shield, Truck, HeartHandshake, Phone, Plus, Package, Users, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminProductManagement from '../components/admin/AdminProductManagement';
import AdminOrderManagement from '../components/admin/AdminOrderManagement';

const HomePage: React.FC = () => {
  const { isAuthenticated, isAdmin, user, loading } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Mock data - sostituire con chiamate API reali
    const mockCategories: Category[] = [
      { 
        id: '1', 
        name: 'Electronics', 
        description: 'Latest tech gadgets', 
        imageUrl: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '2', 
        name: 'Clothing', 
        description: 'Trendy fashion & apparel', 
        imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '3', 
        name: 'Home & Garden', 
        description: 'Everything for your home', 
        imageUrl: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '4', 
        name: 'Sports', 
        description: 'Fitness & outdoor gear', 
        imageUrl: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '5', 
        name: 'Books', 
        description: 'Literature & educational materials', 
        imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '6', 
        name: 'Beauty', 
        description: 'Cosmetics & personal care', 
        imageUrl: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
        createdAt: new Date().toISOString() 
      },
    ];

    const mockProducts: Product[] = [];

    setCategories(mockCategories);
    setFeaturedProducts(mockProducts);
  }, []);

  return (
    <Layout>
      {/* Admin Dashboard Section */}
      {isAuthenticated && isAdmin && (
        <>
          <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-xl text-purple-100">Manage products, orders and users</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500 rounded-lg">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">+</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Add Product</h3>
                  <p className="text-purple-100 text-sm">Add new products to catalog</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">500+</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
                  <p className="text-purple-100 text-sm">Edit and manage catalog</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">150</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Customer Orders</h3>
                  <p className="text-purple-100 text-sm">View and manage orders</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-500 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">1.2K</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
                  <p className="text-purple-100 text-sm">Manage user accounts</p>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Management Sections */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <AdminProductManagement />
              <AdminOrderManagement />
            </div>
          </section>
        </>
      )}



      {/* Public Hero Section - shown to non-authenticated users */}
      {!isAuthenticated && (
        <section className="relative text-white overflow-visible">
          {/* Animated gradient background and light effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700" />
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-20 -right-28 w-[28rem] h-[28rem] rounded-full bg-purple-400 blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-indigo-400 blur-2xl opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              {/* Brand title with unique glow gradient effect */}
              <div className="relative inline-block mb-4 pb-8 overflow-visible">
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-700 blur-xl opacity-30 animate-pulse z-0"></span>
                <div className="relative z-10 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.4] bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-md">
                  Speedy
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-6 leading-normal bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-300">
                Discover Amazing Products
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-blue-100">
                Shop the latest trends with unbeatable prices and quality
              </p>
              <p className="text-base md:text-lg mb-8 font-mono text-yellow-300 tracking-wide">
                Registration is required to complete purchases.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/customer/products"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 bg-white text-blue-700 hover:scale-105 hover:shadow-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 border-2 border-white text-white hover:bg-white hover:text-blue-700 hover:scale-105 hover:shadow-lg"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section - shown to customers and non-authenticated users */}
      {(!isAuthenticated || !isAdmin) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Secure Shopping</h3>
                <p className="text-gray-600">Your data is protected with industry-standard encryption</p>
              </div>
              <div className="text-center group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full group-hover:scale-110 transition-transform">
                    <Truck className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">Fast Delivery</h3>
                <p className="text-gray-600">Always free shipping with express delivery</p>
              </div>
              <div className="text-center group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full group-hover:scale-110 transition-transform">
                    <HeartHandshake className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600">Customer Support</h3>
                <p className="text-gray-600">24/7 support team ready to help with any questions</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section - shown to customers and non-authenticated users */}
      {(!isAuthenticated || !isAdmin) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 text-lg">Explore our wide range of product categories</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-40">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow">
                      Explore
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Interactive dropdowns (FAQs/Info) */}
            <div className="mt-12 max-w-3xl mx-auto space-y-4">
              <details className="group bg-white rounded-xl shadow-md p-4 cursor-pointer">
                <summary className="flex items-center justify-between list-none">
                  <span className="text-lg font-semibold text-gray-900">Shipping Policy</span>
                  <span className="text-sm text-gray-500 group-open:hidden">Click to expand</span>
                  <span className="text-sm text-gray-500 hidden group-open:inline">Click to collapse</span>
                </summary>
                <div className="mt-3 text-gray-600">
                  We offer always free shipping with express delivery. No minimum order value required.
                </div>
              </details>
              <details className="group bg-white rounded-xl shadow-md p-4 cursor-pointer">
                <summary className="flex items-center justify-between list-none">
                  <span className="text-lg font-semibold text-gray-900">Returns & Refunds</span>
                  <span className="text-sm text-gray-500 group-open:hidden">Click to expand</span>
                  <span className="text-sm text-gray-500 hidden group-open:inline">Click to collapse</span>
                </summary>
                <div className="mt-3 text-gray-600">
                  Hassle-free returns within 30 days. Refunds processed within 3-5 business days.
                </div>
              </details>
              <details className="group bg-white rounded-xl shadow-md p-4 cursor-pointer">
                <summary className="flex items-center justify-between list-none">
                  <span className="text-lg font-semibold text-gray-900">Support</span>
                  <span className="text-sm text-gray-500 group-open:hidden">Click to expand</span>
                  <span className="text-sm text-gray-500 hidden group-open:inline">Click to collapse</span>
                </summary>
                <div className="mt-3 text-gray-600">
                  Our 24/7 support team is ready to help via chat, email, and phone.
                </div>
              </details>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section - shown to customers and non-authenticated users */}
      {/* Featured Products section removed per request */}

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">99%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      
    </Layout>
  );
};

export default HomePage;
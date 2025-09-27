import React, { useState, useEffect } from 'react';
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

      {/* Customer Welcome Section */}
      {isAuthenticated && !isAdmin && (
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || 'Customer'}!</h1>
            <p className="text-xl text-green-100 mb-6">Discover our products and add to cart</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/cart"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Go to Cart
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Public Hero Section - shown to non-authenticated users */}
      {!isAuthenticated && (
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Amazing Products
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Shop the latest trends with unbeatable prices and quality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="/categories"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Browse Categories
                </a>
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
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Shopping</h3>
                <p className="text-gray-600">Your data is protected with industry-standard encryption</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Truck className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Free shipping on orders over $50 with express delivery</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <HeartHandshake className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
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
                <a
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section - shown to customers and non-authenticated users */}
      {(!isAuthenticated || !isAdmin) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-600">Hand-picked products just for you</p>
              </div>
              <a
                href="/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for exclusive deals and latest updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-6 py-3 bg-blue-800 hover:bg-blue-900 rounded-r-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
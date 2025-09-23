import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import ProductCard from '../components/customer/ProductCard';
import { Product, Category } from '../types';
import { Star, ArrowRight, Shield, Truck, HeartHandshake, Phone } from 'lucide-react';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Mock data - sostituire con chiamate API reali
    const mockCategories: Category[] = [
      { 
        id: '1', 
        name: 'Electronics', 
        description: 'Latest tech gadgets', 
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '2', 
        name: 'Fashion', 
        description: 'Trendy clothing & accessories', 
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '3', 
        name: 'Home & Garden', 
        description: 'Everything for your home', 
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString() 
      },
      { 
        id: '4', 
        name: 'Sports', 
        description: 'Fitness & outdoor gear', 
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString() 
      },
    ];

    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Smartphone',
        description: 'Latest flagship smartphone with advanced camera and AI features',
        price: 899,
        discountPrice: 749,
        categoryId: '1',
        category: mockCategories[0],
        stock: 25,
        rating: 4.8,
        reviewCount: 256,
        isFeatured: true,
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Designer Watch',
        description: 'Luxury timepiece with premium materials and Swiss movement',
        price: 1299,
        discountPrice: 999,
        categoryId: '2',
        category: mockCategories[1],
        stock: 15,
        rating: 4.9,
        reviewCount: 89,
        isFeatured: true,
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Smart Home Speaker',
        description: 'Voice-controlled speaker with premium sound quality',
        price: 199,
        discountPrice: 149,
        categoryId: '3',
        category: mockCategories[2],
        stock: 40,
        rating: 4.6,
        reviewCount: 342,
        isFeatured: true,
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Fitness Tracker',
        description: 'Advanced fitness tracking with heart rate monitoring',
        price: 299,
        discountPrice: 229,
        categoryId: '4',
        category: mockCategories[3],
        stock: 60,
        rating: 4.5,
        reviewCount: 178,
        isFeatured: true,
        imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
        createdAt: new Date().toISOString(),
      },
    ];

    setCategories(mockCategories);
    setFeaturedProducts(mockProducts);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Features Section */}
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

      {/* Categories Section */}
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

      {/* Featured Products Section */}
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
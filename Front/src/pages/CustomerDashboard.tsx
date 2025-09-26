import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
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
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (isAdmin) {
    window.location.href = '/admin';
    return null;
  }

  // Mock data for categories
  const mockCategories = [
    { id: 1, name: 'Elettronica', image: '📱', count: 45 },
    { id: 2, name: 'Abbigliamento', image: '👕', count: 120 },
    { id: 3, name: 'Casa e Giardino', image: '🏠', count: 78 },
    { id: 4, name: 'Sport', image: '⚽', count: 34 },
    { id: 5, name: 'Libri', image: '📚', count: 89 },
    { id: 6, name: 'Bellezza', image: '💄', count: 56 }
  ];

  // Mock data for featured products
  const mockProducts = [
    { id: 1, name: 'Smartphone Pro Max', price: 999, image: '📱', rating: 4.8, reviews: 234 },
    { id: 2, name: 'Laptop Gaming', price: 1299, image: '💻', rating: 4.7, reviews: 156 },
    { id: 3, name: 'Cuffie Wireless', price: 199, image: '🎧', rating: 4.9, reviews: 89 },
    { id: 4, name: 'Smartwatch', price: 299, image: '⌚', rating: 4.6, reviews: 167 }
  ];

  useEffect(() => {
    setCategories(mockCategories);
    setFeaturedProducts(mockProducts);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Benvenuto, {user?.name}!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Scopri i migliori prodotti per te
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
                Inizia a Comprare
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
                <h3 className="text-lg font-semibold mb-2">Acquisti Sicuri</h3>
                <p className="text-gray-600">Pagamenti protetti e sicuri</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Consegna Veloce</h3>
                <p className="text-gray-600">Spedizione gratuita sopra €50</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Supporto 24/7</h3>
                <p className="text-gray-600">Assistenza sempre disponibile</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Offerte Esclusive</h3>
                <p className="text-gray-600">Sconti riservati ai membri</p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Esplora le Categorie</h2>
              <p className="text-gray-600 text-lg">Trova quello che stai cercando</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-4xl mb-3">{category.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} prodotti</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Prodotti in Evidenza</h2>
              <p className="text-gray-600 text-lg">I più venduti della settimana</p>
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
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-4">€{product.price}</p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Aggiungi al Carrello
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Resta Aggiornato</h2>
            <p className="text-gray-300 text-lg mb-8">Iscriviti alla newsletter per offerte esclusive</p>
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                placeholder="La tua email" 
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
              />
              <button className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                Iscriviti
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
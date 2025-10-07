import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Layout from '../components/common/Layout';
import { customerApi } from '../services/ApiService';
import { Product } from '../types';
import { ShoppingCart, Search, Filter, Star, Heart } from 'lucide-react';

const CustomerProductsPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const { user } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  useEffect(() => {
    // Filtra i prodotti in base al termine di ricerca
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (categoryName) {
        // Carica prodotti per categoria specifica
        response = await customerApi.getProductsByCategory(categoryName);
      } else {
        // Carica tutti i prodotti
        response = await customerApi.getAllProducts();
      }
      
      setProducts(response || []);
      setFilteredProducts(response || []);
    } catch (err: any) {
      console.error('Errore nel caricamento dei prodotti:', err);
      setError('Errore nel caricamento dei prodotti. Riprova più tardi.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(Number(product.id));
      alert(`${product.name} aggiunto al carrello!`);
    } catch (error) {
      console.error('Errore nell\'aggiunta al carrello:', error);
      alert('Errore nell\'aggiunta al carrello. Riprova più tardi.');
    }
  };

  const addToWishlist = async (product: Product) => {
    try {
      await customerApi.addToWishlist(product.id.toString());
      alert(`${product.name} aggiunto alla wishlist!`);
    } catch (error) {
      console.error('Errore nell\'aggiunta alla wishlist:', error);
      alert('Errore nell\'aggiunta alla wishlist. Riprova più tardi.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Caricamento prodotti...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Errore</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Riprova
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {categoryName 
                    ? categoryName === 'home-garden' 
                      ? 'Products - Home & Garden'
                      : `Products - ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`
                    : 'Products'
                  }
                </h1>
                <p className="text-gray-600 mt-1">
                  {categoryName 
                    ? categoryName === 'home-garden'
                      ? 'Here you will find the products of category Home & Garden'
                      : `Here you will find the products of category ${categoryName}`
                    : `Discover all our available products`
                  }
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Number of items: {filteredProducts.length}
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="mt-4 md:mt-0 md:ml-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No products found' : 'No products available'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try modifying your search terms'
                  : 'Products will be displayed here when available'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative">
                    {product.img ? (
                      <img
                        src={`data:image/jpeg;base64,${product.img}`}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">📦</span>
                      </div>
                    )}
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => addToWishlist(product)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">(4.0)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        €{product.price}
                      </span>
                      {product.categoryName && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {product.categoryName}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={cartLoading}
                      className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                        cartLoading 
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{cartLoading ? 'Aggiungendo...' : 'Aggiungi al carrello'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProductsPage;
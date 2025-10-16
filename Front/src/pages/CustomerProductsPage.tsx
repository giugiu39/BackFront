import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
import { customerApi } from '../services/ApiService';
import { Product } from '../types';
import { Search, Filter, Heart, Zap } from 'lucide-react';

const CustomerProductsPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const { user } = useAuth();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Array<{ id: string; productId: string }>>([]);
  const [wishlistProductIds, setWishlistProductIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  useEffect(() => {
    // Carica la wishlist dell'utente per sapere cosa è già presente
    const loadWishlist = async () => {
      try {
        const data = await customerApi.getWishlist();
        // data dovrebbe essere un array di oggetti con almeno productId e id
        const normalized = Array.isArray(data)
          ? data.map((item: any) => ({ id: String(item.id), productId: String(item.productId) }))
          : [];
        setWishlistItems(normalized);
        setWishlistProductIds(new Set(normalized.map((i) => i.productId)));
      } catch (e) {
        console.error('Errore nel caricamento della wishlist:', e);
      }
    };
    loadWishlist();
  }, []);

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
      // Normalizza le immagini: i ProductDto backend usano `byteImg` per la foto
      const normalized = (Array.isArray(response) ? response : []).map((p: any) => ({
        ...p,
        // Usa `byteImg` come sorgente principale, fallback su eventuale `img`
        img: p.byteImg ?? p.img ?? undefined
      }));
      setProducts(normalized);
      setFilteredProducts(normalized);
    } catch (err: any) {
      console.error('Error loading products:', err);
      setError('Error loading products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  const addToWishlist = async (product: Product) => {
    try {
      const pid = product.id.toString();
      if (wishlistProductIds.has(pid)) {
        alert(`${product.name} è già nella wishlist`);
        return;
      }
      const res = await customerApi.addToWishlist(pid);
      // Aggiorna stato locale per riflettere l'aggiunta
      const newItemId = res?.id ? String(res.id) : `${pid}`;
      const updated = [...wishlistItems, { id: newItemId, productId: pid }];
      setWishlistItems(updated);
      setWishlistProductIds(new Set(updated.map((i) => i.productId)));
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
            <p className="mt-4 text-gray-600">Loading products...</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - styled like CategoriesPage */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <Zap className="h-14 w-14 mx-auto mb-4 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryName 
                ? categoryName === 'home-garden' 
                  ? 'Explore Home & Garden'
                  : `Explore ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`
                : 'Discover Our Exclusive'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Products
              </span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto mb-4">
              {categoryName 
                ? categoryName === 'home-garden'
                  ? 'Create the perfect living environment with curated furniture and decor.'
                  : `Browse top picks from ${categoryName} and find your perfect match.`
                : 'Each item is unique and carefully selected. Find what speaks to you!'}
            </p>
            <div className="flex items-center justify-center space-x-2 text-xl">
              <span className="text-yellow-300 font-bold">Items available: {filteredProducts.length}</span>
            </div>
            <p className="mt-2 text-indigo-100">
              These are all the products available. If you'd like to select products from specific categories, go to the <span className="font-serif text-yellow-300 font-semibold underline underline-offset-2">Categories</span> section above.
            </p>
          </div>
        </section>

        {/* Search Bar - centered under hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
              />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Gradient Overlay like CategoriesPage */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                  {/* Product Image */}
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative overflow-hidden">
                    {product.img ? (
                      <img
                        src={`data:image/jpeg;base64,${product.img}`}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">📦</span>
                      </div>
                    )}
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => addToWishlist(product)}
                      disabled={wishlistProductIds.has(product.id.toString())}
                      className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-colors ${
                        wishlistProductIds.has(product.id.toString())
                          ? 'cursor-not-allowed opacity-70'
                          : 'hover:bg-gray-50'
                      }`}
                      title={wishlistProductIds.has(product.id.toString()) ? 'Già nella wishlist' : 'Aggiungi alla wishlist'}
                    >
                      <Heart className={`h-4 w-4 ${wishlistProductIds.has(product.id.toString()) ? 'text-red-500' : 'text-gray-600 group-hover:text-red-500'}`} />
                    </button>
                    {/* Decorative Element */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 relative z-10">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        €{product.price}
                      </span>
                      {product.categoryName && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                          {product.categoryName}
                        </span>
                      )}
                    </div>

                    
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
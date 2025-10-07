import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../../services/ApiService';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';

interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

const Wishlist: React.FC = () => {
  const { addToCart, loading: cartLoading } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const data = await customerApi.getWishlist();
        console.log('Wishlist data received:', data);
        console.log('Wishlist data type:', typeof data);
        console.log('Wishlist data length:', Array.isArray(data) ? data.length : 'not an array');

        // Normalizza i dati: il backend usa `returnedImg` per l'immagine della wishlist
        const normalized: WishlistItem[] = (Array.isArray(data) ? data : []).map((item: any) => ({
          id: String(item.id),
          productId: String(item.productId),
          productName: item.productName ?? item.product?.name ?? 'Product',
          price: Number(item.price ?? item.product?.price ?? 0),
          imageUrl: item.returnedImg
            ? `data:image/jpeg;base64,${item.returnedImg}`
            : item.product?.byteImg
              ? `data:image/jpeg;base64,${item.product.byteImg}`
              : item.imageUrl ?? undefined,
          description: item.productDescription ?? item.product?.description ?? ''
        }));
        setWishlistItems(normalized);
      } catch (err) {
        console.error('Error loading wishlist:', err);
        setError('Unable to load wishlist. Please try again later.');
        
        // Dati di fallback
        setWishlistItems([
          {
            id: 'wish1',
            productId: '1',
            productName: 'Smartphone Pro',
            price: 599.99,
            imageUrl: 'https://via.placeholder.com/300',
            description: 'A powerful smartphone with advanced features'
          },
          {
            id: 'wish2',
            productId: '3',
            productName: 'Smartwatch',
            price: 299.97,
            imageUrl: 'https://via.placeholder.com/300',
            description: 'Smartwatch with fitness tracking and notifications'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (wishlistItemId: string) => {
    try {
      setRemovingItems(prev => new Set(prev).add(wishlistItemId));
      
      // Aggiungi un piccolo delay per mostrare l'animazione
      setTimeout(async () => {
        try {
          await customerApi.removeFromWishlist(wishlistItemId);
          setWishlistItems(wishlistItems.filter(item => item.id !== wishlistItemId));
        } catch (err) {
          console.error('Error removing from wishlist:', err);
          alert('Unable to remove from wishlist. Please try again later.');
        } finally {
          setRemovingItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(wishlistItemId);
            return newSet;
          });
        }
      }, 300);
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert('Unable to remove from wishlist. Please try again later.');
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(Number(productId));
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Unable to add to cart. Please try again later.');
    }
  };

  const navigateToProducts = () => {
    navigate('/customer/products');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-lg text-gray-600">Loading your wishlist...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 rounded-xl p-6 mb-6 shadow-lg animate-fade-in">
        <div className="flex items-center">
          <Heart className="w-6 h-6 mr-3 text-red-500" />
          <span className="font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          My Wishlist
        </h1>
        <div className="flex items-center justify-center">
          <Heart className="w-6 h-6 text-pink-500 mr-2 animate-pulse" />
          <p className="text-gray-600">Your favorite products in one place</p>
          <Heart className="w-6 h-6 text-pink-500 ml-2 animate-pulse" />
        </div>
      </div>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-2xl shadow-lg border border-purple-100 animate-fade-in">
          <div className="mb-6">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Discover amazing products and add them to your wishlist!</p>
          </div>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            onClick={navigateToProducts}
          >
            <ShoppingCart className="w-5 h-5 mr-2 inline" />
            Browse products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-slide-up ${
                removingItems.has(item.id) ? 'animate-fade-out scale-95' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.productName} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingCart className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Heart className="w-6 h-6 text-pink-500 fill-current animate-pulse" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors duration-200">
                  {item.productName}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.description}</p>
                )}
                <div className="mb-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAddToCart(item.productId)}
                    disabled={cartLoading}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg font-medium ${cartLoading ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'}`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {cartLoading ? 'Adding...' : 'Add to cart'}
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    disabled={removingItems.has(item.id)}
                    className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 hover:text-red-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className={`w-4 h-4 ${removingItems.has(item.id) ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.9); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fade-out 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default Wishlist;
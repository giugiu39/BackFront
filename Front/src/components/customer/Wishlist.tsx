import React, { useState, useEffect } from 'react';
import { customerApi } from '../../services/ApiService';
import { ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const data = await customerApi.getWishlist();
        console.log('Wishlist data received:', data);
        console.log('Wishlist data type:', typeof data);
        console.log('Wishlist data length:', Array.isArray(data) ? data.length : 'not an array');
        setWishlistItems(data);
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
      await customerApi.removeFromWishlist(wishlistItemId);
      setWishlistItems(wishlistItems.filter(item => item.id !== wishlistItemId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert('Unable to remove from wishlist. Please try again later.');
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await customerApi.addToCart({ productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Unable to add to cart. Please try again later.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading wishlist...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Your wishlist is empty</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.location.href = '/customer/products'}
          >
            Browse products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.productName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Image not available
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                {item.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                )}
                <div className="mt-3">
                  <span className="text-lg font-bold text-gray-900">€{item.price.toFixed(2)}</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item.productId)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
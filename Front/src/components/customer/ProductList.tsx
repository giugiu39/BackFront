import React, { useState, useEffect } from 'react';
import { customerApi } from '../../services/ApiService';
import { ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl?: string;
  rating?: number;
  categoryName?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await customerApi.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Unable to load products. Please try again later.');
        
        // Dati di fallback
        setProducts([
          {
            id: '1',
            name: 'Smartphone Pro',
            description: 'A powerful smartphone with advanced features',
            price: 699.99,
            discountPrice: 599.99,
            imageUrl: 'https://via.placeholder.com/300',
            rating: 4.5,
            categoryName: 'Electronics'
          },
          {
            id: '2',
            name: 'Cuffie Wireless',
            description: 'Headphones with noise cancellation and high-quality audio',
            price: 149.99,
            imageUrl: 'https://via.placeholder.com/300',
            rating: 4.2,
            categoryName: 'Accessories'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await customerApi.addToCart({ productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Unable to add to cart. Please try again later.');
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      await customerApi.addToWishlist(productId);
      alert('Product added to wishlist!');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert('Unable to add to wishlist. Please try again later.');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.categoryName === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading products...</div>;
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
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      
      {/* Filtri e ricerca */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>
      
      {/* Griglia prodotti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Image not available
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center mt-1">
                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                )}
                {product.categoryName && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {product.categoryName}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <div className="mt-3 flex items-center">
                {product.discountPrice ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">€{product.discountPrice.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">€{product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add
                </button>
                <button
                  onClick={() => handleAddToWishlist(product.id)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
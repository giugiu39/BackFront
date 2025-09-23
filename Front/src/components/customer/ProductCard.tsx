import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, Heart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onWishlistToggle, 
  isInWishlist = false 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle?.(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.imageUrl || 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isInWishlist 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviewCount})
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.discountPrice ? (
              <>
                <span className="text-xl font-bold text-blue-600">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
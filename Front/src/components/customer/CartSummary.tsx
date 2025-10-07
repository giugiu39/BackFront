import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  showCheckout?: boolean;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ showCheckout = true, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-4">Start shopping to add items to your cart</p>
        <a
          href="/customer/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header counters */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow">
            <span className="text-sm">Total products</span>
            <div className="text-lg font-semibold">{totalItems}</div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow">
            <span className="text-sm">Total amount</span>
            <div className="text-lg font-semibold">€{totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
            <img
              src={item.image ? `data:image/jpeg;base64,${item.image}` : 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg'}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">€{item.price.toFixed(2)} each</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>

              <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="text-right">
              <div className="font-semibold text-gray-900">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 transition-colors mt-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">€{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-semibold">Free</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-4">
          <span>Total:</span>
          <span>€{totalPrice.toFixed(2)}</span>
        </div>

        {showCheckout && (
          <button
            onClick={onCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
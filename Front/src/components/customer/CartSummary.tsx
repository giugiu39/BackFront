import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  showCheckout?: boolean;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ showCheckout = true, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl p-10 text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100">
        {/* Decorazioni di sfondo */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40" />

        <div className="relative">
          <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm ring-1 ring-indigo-200">
            <ShoppingBag className="h-10 w-10 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-700 mb-6">Start shopping to add items to your cart</p>
          <a
            href="/customer/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-semibold"
          >
            Explore Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
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
          <div
            key={item.id}
            className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-transform duration-200 hover:scale-[1.01] bg-white/80 backdrop-blur-sm"
          >
            <img
              src={item.image ? `data:image/jpeg;base64,${item.image}` : 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg'}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg ring-1 ring-transparent group-hover:ring-blue-300 transition-transform duration-200 group-hover:scale-105"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
              {/* Nessun prezzo qui; il totale è a destra */}
            </div>

            <div className="flex flex-col items-end">
              <div className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove from cart"
                className="mt-2 text-red-600 hover:text-red-700 rounded-full p-2 hover:bg-red-50 transition-transform duration-200 hover:scale-105"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
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
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
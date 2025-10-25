import React, { useEffect, useMemo, useState } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { customerApi } from '../../services/ApiService';

interface CartItemDto {
  id: string;
  productId: string;
  productName: string;
  price: number;
  returnedImg?: string;
  categoryName?: string;
}

interface OrderDto {
  id: string;
  amount: number;
  totalAmount: number;
  orderStatus: string;
  cartItems: CartItemDto[];
}

const CustomerCart: React.FC = () => {
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [clearing, setClearing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await customerApi.getCart();
      setOrder(data as OrderDto);
    } catch (err) {
      console.error('Failed to load cart', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Silent refresh to avoid clearing UI on DELETE 204
  const refreshCart = async () => {
    try {
      const data = await customerApi.getCart();
      setOrder(data as OrderDto);
    } catch (err) {
      console.error('Failed to refresh cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId: string) => {
    setRemoving(itemId);
    try {
      await customerApi.removeCartItem(itemId);
      await refreshCart();
    } catch (err) {
      console.error('Failed to remove cart item', err);
    } finally {
      setRemoving(null);
    }
  };

  const handleClearCart = async () => {
    setClearing(true);
    try {
      await customerApi.clearCart();
      await refreshCart();
    } catch (err) {
      console.error('Failed to clear cart', err);
    } finally {
      setClearing(false);
    }
  };

  const cartCount = order?.cartItems?.length ?? 0;
  const total = order?.totalAmount ?? 0;

  const cartProductIds = useMemo(() => new Set((order?.cartItems ?? []).map(ci => String(ci.productId))), [order]);

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              My Cart
            </h1>
            <div className="text-sm sm:text-base bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {cartCount} item{cartCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-600 animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <span className="mt-3 text-lg">Loading cart...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm animate-fade-in">
            {error}
          </div>
        ) : cartCount === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 animate-fade-in">
            <div className="mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Browse products and add items you love!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {(order?.cartItems ?? []).map((item, index) => {
                const imageUrl = item.returnedImg ? `data:image/jpeg;base64,${item.returnedImg}` : undefined;
                const inCart = cartProductIds.has(String(item.productId));
                return (
                  <div
                    key={item.id}
                    className={`group flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                      {imageUrl ? (
                        <img src={imageUrl} alt={item.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="text-gray-400 text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{item.productName}</div>
                      {item.categoryName && (
                        <div className="text-xs inline-block mt-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">{item.categoryName}</div>
                      )}
                      <div className="text-sm text-gray-700 mt-2">€ {item.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemove(item.id)}
                        disabled={removing === item.id}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md border border-red-200 disabled:opacity-60 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-fit">
              <div className="mb-4">
                <div className="text-sm text-gray-500">Order Total</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">€ {total}</div>
              </div>
              <button
                onClick={handleClearCart}
                disabled={clearing}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 transition-all shadow-md hover:shadow-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 300ms ease-out; }
        .animate-slide-up { animation: slide-up 300ms ease-out; }
      `}</style>
    </div>
  );
};

export default CustomerCart;
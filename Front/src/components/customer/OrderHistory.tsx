import React, { useState, useEffect } from 'react';
import { customerApi } from '../../services/ApiService';

interface Order {
  id: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await customerApi.getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Unable to load orders. Please try again later.');
        
        // Dati di fallback
        setOrders([
          {
            id: 'ORD-001',
            orderDate: '2023-10-15T14:30:00',
            status: 'Delivered',
            totalAmount: 749.98,
            items: [
              {
                id: 'ITEM-001',
                productName: 'Smartphone Pro',
                quantity: 1,
                price: 599.99
              },
              {
                id: 'ITEM-002',
                productName: 'Cuffie Wireless',
                quantity: 1,
                price: 149.99
              }
            ]
          },
          {
            id: 'ORD-002',
            orderDate: '2023-11-05T10:15:00',
            status: 'Processing',
            totalAmount: 299.97,
            items: [
              {
                id: 'ITEM-003',
                productName: 'Smartwatch',
                quantity: 1,
                price: 299.97
              }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'consegnato':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'in elaborazione':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
      case 'spedito':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
      case 'annullato':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading orders...</div>;
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
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't placed any orders yet</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.location.href = '/customer/products'}
          >
            Start shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{order.id}</span>
                    <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {formatDate(order.orderDate)}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-bold">€{order.totalAmount.toFixed(2)}</span>
                  <svg 
                    className={`ml-2 w-5 h-5 transition-transform ${expandedOrderId === order.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              {expandedOrderId === order.id && (
                <div className="border-t border-gray-200 p-4">
                  <h3 className="font-medium mb-2">Order Details</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map(item => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.productName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              €{item.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              €{(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
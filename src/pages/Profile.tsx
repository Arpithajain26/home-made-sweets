import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/apiClient';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/user/${user?.email}`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error(data.message || "Failed to fetch orders");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate, user?.email]);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#351608] mb-6">Profile Dashboard</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#EAD7C0] p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#8D4E20] mb-2">Account Details</h2>
        <p className="text-[#351608]"><strong>Name:</strong> {user?.name}</p>
        <p className="text-[#351608]"><strong>Email:</strong> {user?.email}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#EAD7C0] p-6">
        <h2 className="text-xl font-semibold text-[#8D4E20] mb-4">Order History</h2>
        
        {loading ? (
          <div className="text-center text-[#8D4E20] py-8 animate-pulse">Loading orders...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">You haven't placed any orders yet.</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border border-[#EAD7C0] rounded-lg p-4">
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3">
                  <div>
                    <span className="font-bold text-[#351608] block">Order #{order.orderId}</span>
                    <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#8D4E20] block">₹{order.totalAmount}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      order.status === 'ORDER_PLACED' ? 'bg-blue-100 text-blue-700' : 
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-600">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

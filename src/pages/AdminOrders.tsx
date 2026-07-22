import React, { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName?: string;
  customerPhone?: string;
  address?: string;
  totalAmount: number;
  paymentMethod?: string;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

const rawApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = rawApiUrl.replace(/\/+$/, "");

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((ord) =>
            ord.orderId === orderId ? { ...ord, status: newStatus } : ord
          )
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-amber-900 font-bold">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-amber-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-amber-950">
            📦 Admin Order Management
          </h1>
          <button
            onClick={fetchOrders}
            className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 text-sm font-semibold transition-colors"
          >
            Refresh Orders
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center text-amber-800 border border-amber-200">
            No orders found yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id || order.orderId}
                className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm"
              >
                <div className="flex flex-wrap justify-between items-start mb-4 border-b pb-3 border-amber-100">
                  <div>
                    <span className="font-mono text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold">
                      {order.orderId}
                    </span>
                    <h3 className="text-lg font-bold text-amber-950 mt-2">
                      {order.customerName || 'Customer'}
                    </h3>
                    {order.customerPhone && (
                      <p className="text-sm text-amber-800">📱 {order.customerPhone}</p>
                    )}
                    {order.address && (
                      <p className="text-sm text-amber-800">📍 {order.address}</p>
                    )}
                  </div>

                  <div className="text-right mt-2 sm:mt-0">
                    <p className="text-2xl font-black text-amber-950">₹{order.totalAmount}</p>
                    {order.paymentMethod && (
                      <p className="text-xs uppercase text-amber-700 font-medium">
                        Payment: {order.paymentMethod}
                      </p>
                    )}

                    {/* Status Selector */}
                    <div className="mt-3">
                      <select
                        value={order.status || 'ORDER_PLACED'}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        className="text-xs font-bold border border-amber-300 rounded-lg px-3 py-1.5 bg-amber-50 text-amber-900 focus:outline-none"
                      >
                        <option value="ORDER_PLACED">🟡 Order Placed</option>
                        <option value="Packed">📦 Packed</option>
                        <option value="Shipped">🚚 Shipped</option>
                        <option value="Delivered">✅ Delivered</option>
                        <option value="Cancelled">❌ Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="bg-amber-50/50 p-3 rounded-lg text-sm space-y-1">
                  <p className="font-semibold text-amber-900 text-xs uppercase mb-1">
                    Items Ordered:
                  </p>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-amber-900">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
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

export default AdminOrders;
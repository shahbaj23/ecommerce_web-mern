import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const API = import.meta.env.VITE_API_URL ;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}


export default function Notification({showNotify, token}) {
    const [orders, setOrders] = useState([]);
    
      const fetchAllOrder = async () => {
        try {
          const response = await axios.post(
            `${API}/api/order/all-orders`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(response.data.orders);
        } catch (error) {
          toast.error(error.message);
        }
      };

      useEffect(()=>{
        fetchAllOrder()
      },[])
  return (
  <div>
    {showNotify && (
      <div className="absolute right-6 top-16 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

        <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-700">New Orders</h3>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            {orders.length}
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y">
          {orders.length === 0 ? (
            <p className="text-center text-gray-400 py-6 text-sm">
              No new orders
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="p-4 hover:bg-gray-50 transition"
              >
                <p className="text-xs text-gray-400 mb-1">
                  Order ID: {order._id.slice(-6)}
                </p>

                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-10 h-10 rounded-md object-cover border"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <p className="text-xs font-semibold text-blue-600">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                    {order.status}
                  </span>

                  <span className="text-xs text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center py-2 border-t bg-gray-50">
          <button className="text-sm text-blue-600 hover:underline">
            View All Orders
          </button>
        </div>
      </div>
    )}
  </div>
);
}

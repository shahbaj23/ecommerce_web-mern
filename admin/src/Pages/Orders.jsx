import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/";

// const API = import.meta.env.VITE_API_URL ;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}


export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.post(
        `${API}api/order/all-orders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${API}api/order/status`,
        { orderId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        await fetchAllOrder();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Orders Management
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-500 text-lg">No orders found.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md p-6 mb-8 border hover:shadow-lg transition"
          >
            {/* ORDER HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="text-blue-600 font-semibold">{order._id}</p>
              </div>

              <span className="mt-2 md:mt-0 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <h3 className="text-lg font-semibold mb-4">Items</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-gray-50 p-4 rounded-xl">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.qty}</p>

                    <p className="text-blue-600 font-semibold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ADDRESS */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>

              <div className="bg-gray-50 p-4 rounded-xl grid md:grid-cols-2 gap-2 text-sm">
                <p>
                  <strong>Name:</strong> {order.address.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.address.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.address.phone}
                </p>
                <p>
                  <strong>City:</strong> {order.address.city}
                </p>
                <p>
                  <strong>State:</strong> {order.address.state}
                </p>
                <p>
                  <strong>Pincode:</strong> {order.address.pincode}
                </p>
                <p className="md:col-span-2">
                  <strong>Address:</strong> {order.address.address}
                </p>
              </div>
            </div>

            {/* ORDER INFO */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-500 text-sm">Payment Method</p>
                <p className="font-semibold">{order.paymentMethod}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-500 text-sm">Payment Status</p>

                <p
                  className={`font-semibold ${
                    order.payment ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {order.payment ? "Paid" : "Not Paid"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-500 text-sm">Order Date</p>
                <p className="font-semibold">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 gap-4">
              <h2 className="text-xl font-semibold">
                Total:
                <span className="text-blue-600 ml-2">₹{order.amount}</span>
              </h2>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer"
              >
                <option value="order Place">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

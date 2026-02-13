import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/order/all-orders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateStatus = async(orderId, newStatus)=>{
    try {
      const response = await axios.put("http://localhost:3000/api/order/status", {orderId, status: newStatus}, 
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(response.data.success){
        await fetchAllOrder()
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold mb-8">All Orders</h1>

          {orders.length === 0 && (
            <p className="text-gray-500 text-lg">No orders found.</p>
          )}

          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl shadow p-6 mb-8 bg-white"
            >

              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-xl font-semibold">
                  Order ID: <span className="text-blue-600">{order._id}</span>
                </h2>
              </div>

              <h3 className="text-lg font-semibold mb-3">Items</h3>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex border-b pb-4 items-center mb-4 last:border-b-0"
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-gray-500">Size: {item.size}</p>
                    <p className="text-gray-500">Qty: {item.qty}</p>
                    <p className="font-semibold mt-1 text-blue-600">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>

                <div className="bg-gray-100 p-4 rounded-xl">
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
                    <strong>Address:</strong> {order.address.address}
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
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-semibold">{order.paymentMethod}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">Payment Status</p>
                  <p
                    className={`font-semibold ${
                      order.payment ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.payment ? "Paid" : "Not Paid"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">Order Date</p>
                  <p className="font-semibold">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <h2 className="text-xl font-semibold">
                  Total: <span className="text-blue-600">₹{order.amount}</span>
                </h2>

                <select value={order.status} onChange={(e)=>updateStatus(order._id, e.target.value)} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer">
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
    </>
  );
}

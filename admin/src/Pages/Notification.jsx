import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/";

// const API = import.meta.env.VITE_API_URL ;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}


export default function Notification({showNotify, token}) {
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
            }
          );
          console.log(response.data.orders);
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
        <div className="absolute right-6 top-16 w-80 bg-white text-black rounded-lg shadow-lg p-3 max-h-80 overflow-y-auto">

          <h3 className="font-semibold mb-2">New Orders</h3>

          {orders.map((order) => (
            <div key={order._id} className="border-b py-2">

              {order.items.map((item, i) => (
                <p key={i} className="text-sm">
                  🛒 {item.title} × {item.qty}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

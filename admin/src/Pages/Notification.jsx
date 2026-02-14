import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Notification({showNotify, token}) {
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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrders } from "../Product/OrderSlice";

export default function Order() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const navigate = useNavigate()

  const { orders, loading } = useSelector((state) => state.order);
  const { token } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders({ id, token }));
    }
  }, [dispatch, id, token]);

  if (loading) return <p className="text-xl">Loading orders...</p>;

  if (!orders || orders.length === 0)
    return <p className="text-xl">No orders found</p>;

  return (
    <div className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.map((ord) => (
          <div key={ord._id} className="border p-4 rounded-xl mb-6">
            <h2 className="text-xl font-semibold mb-3">Order ID: {ord._id}</h2>

            {ord.items.map((item) => (
              <div
                key={item.id + item.size}
                className="flex border-b pb-4 items-center mb-4"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-500">Size: {item.size}</p>
                  <p className="text-gray-500">Qty: {item.qty}</p>
                  <p className="font-semibold mt-1">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}
            <p>{ord.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

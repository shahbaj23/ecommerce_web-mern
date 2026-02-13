import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItem,
  fetchCartData,
  removeCartItem,
  updateCart,
} from "../Product/CartSlice";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Product/ProductSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartData, loading } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.authentication);
  const products = useSelector((state) => state.products.item);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData({ token }));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  const items = Object.entries(cartData || {}).flatMap(([id, sizes]) =>
    Object.entries(sizes).map(([size, qty]) => {
      const product = products.find((p) => p._id === id);

      return {
        id,
        size,
        qty,
        title: product?.title,
        price: product?.price,
        images: product?.images,
      };
    })
  );
console.log(items)
  const handleQtyChange = (item, value) => {
    const qty = Number(value);
    dispatch(updateCart({ token, itemId: item.id, size: item.size, qty }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">
          Shopping Cart
        </h1>

        {token ? (<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id + item.size}
                  className="flex flex-col sm:flex-row border-b pb-6"
                >
                  <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-500">{item.color}</p>
                        <p className="text-gray-500">{item.size}</p>
                        <p className="text-gray-900 font-medium mt-2">
                          ₹{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          dispatch(
                            removeCartItem({ id: item.id, size: item.size })
                          );
                          dispatch(
                            deleteCartItem({
                              token,
                              itemId: item.id,
                              size: item.size,
                            })
                          );
                        }}
                        className="text-gray-500 hover:text-red-600 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                      <input
                        className="border w-[50px] rounded-md py-1 px-2 text-gray-700"
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item, e.target.value)}
                      />
                      <p className="text-green-600 text-sm flex items-center">
                        In stock
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{items.reduce((a, b) => a + b.price * b.qty, 0)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>
                  Shipping estimate <span className="text-gray-400">(?)</span>
                </span>
                <span>₹5.00</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>
                  Tax estimate <span className="text-gray-400">(?)</span>
                </span>
                <span>₹8.32</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Order total</span>
                <span>
                  ₹
                  {(
                    items.reduce((a, b) => a + b.price * b.qty, 0) +
                    5 +
                    8.32
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full mt-6 block bg-indigo-600 text-white py-3 rounded-lg font-medium text-center hover:bg-indigo-700 transition"
            >
              Checkout
            </Link>
          </div>
        </div>): (
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

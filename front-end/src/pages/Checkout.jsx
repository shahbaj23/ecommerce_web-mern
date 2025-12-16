import { useEffect, useState } from "react";
import razorpay_logo from "../assets/razorpay_logo.png";
import stripe_logo from "../assets/stripe_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../Product/CartSlice";
import { fetchProducts } from "../Product/ProductSlice";
import { placeOnlineOrder, placeOrder } from "../Product/OrderSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [onlinePayMethod, setOnlinePayMethod] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const { cartData, loading } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.item);
  const { token, user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData({ token }));
    }
  }, [dispatch, token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const items = Object.entries(cartData || {}).flatMap(([id, sizes]) =>
    Object.entries(sizes).map(([size, qty]) => {
      const product = products.find((p) => p._id === id);
      return {
        id,
        size,
        qty,
        title: product?.title || "Loading...",
        price: product?.price || 0,
        images: product?.images || [""],
      };
    })
  );

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryCharges = 0;
  const total = subtotal + deliveryCharges;

  const handleOrderPlaced = () => {
    if (!onlinePayMethod) {
      const orderData = {
        token,
        userId: user?.id,
        items,
        amount: total,
        address: formData,
        // payment: onlinePayMethod ? "Online" : "COD",
      };
      dispatch(placeOrder(orderData)).then((res) => {
        if (!res.error) {
          navigate(`/order/${user.id}`);
        }
      });
    } else {
      const orderData = {
        token,
        userId: user?.id,
        items,
        amount: total,
        address: formData,
        // payment: onlinePayMethod ? "Online" : "COD",
      };
      dispatch(placeOnlineOrder(orderData)).then((res) => {
        if (!res.error && res.payload.session_url) {
          window.location.href = res.payload.session_url;
        }
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Details */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              onChange={onChangeHandler}
              value={formData.name}
              name="name"
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-xl w-full"
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address"
              className="border p-3 rounded-xl w-full"
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.phone}
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="border p-3 rounded-xl w-full"
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.pincode}
              name="pincode"
              type="text"
              placeholder="PIN Code"
              className="border p-3 rounded-xl w-full"
              required
            />
          </form>

          <textarea
            onChange={onChangeHandler}
            value={formData.address}
            name="address"
            placeholder="Full Address"
            className="border p-3 rounded-xl w-full mt-4"
            rows="3"
            required
          ></textarea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              onChange={onChangeHandler}
              value={formData.city}
              name="city"
              type="text"
              placeholder="City Name"
              className="border p-3 rounded-xl w-full"
              required
            />
            <select
              onChange={onChangeHandler}
              value={formData.state}
              name="state"
              className="border p-3 rounded-xl"
              required
            >
              <option value="">Select State</option>
              <option>State 1</option>
              <option>State 2</option>
              <option>State 3</option>
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-400 text-white text-[18px] cursor-pointer font-400 p-2 mt-4 rounded-[7px]"
            type="button"
          >
            Save Address
          </button>

          {/* Payment Section */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                onClick={() => setOnlinePayMethod(false)}
                name="payment"
                className="w-5 h-5"
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={onlinePayMethod}
                onChange={() => setOnlinePayMethod(true)}
                className="w-5 h-5"
              />
              Online
              {onlinePayMethod && (
                <div className="block mt-2">
                  <img
                    src={razorpay_logo}
                    alt="Razorpay"
                    className="inline-block mr-2"
                  />
                  <img
                    src={stripe_logo}
                    alt="Stripe"
                    className="inline-block"
                  />
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          {/* <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id + item.size} className="flex justify-between">
                <span>
                  {item.title} x {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div> */}

          <hr className="my-4" />

          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Delivery Charges</span>
            <span className="text-green-600">
              {deliveryCharges === 0 ? "Free" : `₹${deliveryCharges}`}
            </span>
          </div>
          <div className="flex justify-between mt-3 text-xl font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleOrderPlaced}
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-xl text-lg hover:bg-blue-400 cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

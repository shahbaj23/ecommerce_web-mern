import React, { useContext, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { LuStar } from "react-icons/lu";
import { ProductContext } from "../context/ProductContext";

export default function Dashboard() {
  const {
    total,
    getAllUsers,
    getAllOrder,
    totalOrders,
    getTotalProduct,
    totalProducts,
    totalPrice,
    getTotalPrice,
  } = useContext(ProductContext);

  useEffect(() => {
    getAllUsers();
    getAllOrder();
    getTotalProduct();
    getTotalPrice();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-3xl font-bold text-gray-800">{total}</h2>
          </div>

          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg text-2xl">
            <CgProfile />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-3xl font-bold text-gray-800">{totalOrders}</h2>
          </div>

          <div className="bg-orange-100 text-orange-600 p-3 rounded-lg text-2xl">
            <FaShoppingCart />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {totalProducts}
            </h2>
          </div>

          <div className="bg-purple-100 text-purple-600 p-3 rounded-lg text-2xl">
            <CgProfile />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Reviews</p>
            <h2 className="text-3xl font-bold text-gray-800">234</h2>
          </div>

          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg text-2xl">
            <LuStar />
          </div>
        </div>

      </div>

      <div className="mt-6 bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-4xl font-bold text-green-600">
            ₹{totalPrice}
          </h2>
        </div>

        <div className="bg-green-100 text-green-600 p-4 rounded-lg text-3xl">
          <FaMoneyBillWave />
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mt-8 border border-gray-200">

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Orders
          </h3>

          <button className="text-sm text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">

              <tr className="border-b hover:bg-gray-50">
                <td className="py-4">#1023</td>
                <td>Rahul Sharma</td>
                <td>₹4,500</td>
                <td>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                    Completed
                  </span>
                </td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="py-4">#1024</td>
                <td>Priya Singh</td>
                <td>₹2,800</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="py-4">#1025</td>
                <td>Amit Verma</td>
                <td>₹6,200</td>
                <td>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    Cancelled
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
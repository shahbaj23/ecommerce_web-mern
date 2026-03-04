import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { LuStar } from "react-icons/lu";

export default function Dashboard() {
  return (
    <div>
      <div className="flex gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-linear-to-bl from-purple-400 to-purple-700 w-70 h-40 p-4 rounded-md flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-white">
                  Total users
                </h3>
                <h1 className="text-[30px] font-bold text-white">234</h1>
              </div>
              <div className="w-8 h-8 bg-[#e2ffed52] flex items-center justify-center rounded-md">
                <CgProfile className="text-2xl text-white font-bold " />
              </div>
            </div>
            <div>
              <p className="text-white">
                {" "}
                <span className="bg-[#292c2a52] p-1 rounded-md ">
                  +95%
                </span>{" "}
                Last Month
              </p>
            </div>
          </div>
          <div className="bg-linear-to-bl from-orange-400 to-orange-600 w-70 h-40 p-4 rounded-md flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-white">
                  Total Orders
                </h3>
                <h1 className="text-[30px] font-bold text-white">234</h1>
              </div>
              <div className="w-8 h-8 bg-[#e2ffed52] flex items-center justify-center rounded-md">
                <FaShoppingCart className="text-2xl text-white font-bold " />
              </div>
            </div>
            <div>
              <p className="text-white">
                <span className="bg-[#292c2a52] p-1 rounded-md ">+95%</span>{" "}
                This Month
              </p>
            </div>
          </div>
          <div className="bg-linear-to-bl from-pink-400 to-pink-600 w-70 h-40 p-4 rounded-md flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-white">
                  Total Products
                </h3>
                <h1 className="text-[30px] font-bold text-white">234</h1>
              </div>
              <div className="w-8 h-8 bg-[#e2ffed52] flex items-center justify-center rounded-md">
                <CgProfile className="text-2xl text-white font-bold " />
              </div>
            </div>
            <div>
              <p className="text-white">
                {" "}
                <span className="bg-[#292c2a52] p-1 rounded-md ">
                  +95%
                </span>{" "}
                Last Month
              </p>
            </div>
          </div>
          <div className="bg-linear-to-bl from-blue-400 to-blue-700 w-70 h-40 p-4 rounded-md flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-white">
                  Total Reviews
                </h3>
                <h1 className="text-[30px] font-bold text-white">234</h1>
              </div>
              <div className="w-8 h-8 bg-[#e2ffed52] flex items-center justify-center rounded-md">
                <LuStar className="text-2xl text-white font-bold " />
              </div>
            </div>
            <div>
              <p className="text-white">
                {" "}
                <span className="bg-[#292c2a52] p-1 rounded-md ">+95%</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-bl from-emerald-400 to-green-700 w-70 p-4 rounded-md flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <h3 className="text-[20px] font-semibold text-white">
                Total Revenue
              </h3>
              <h1 className="text-[30px] font-bold text-white">234</h1>
            </div>
            <div className="w-8 h-8 bg-[#e2ffed52] flex items-center justify-center rounded-md">
              <FaMoneyBillWave className="text-2xl text-white font-bold " />
            </div>
          </div>
          <div>
            <p className="text-white">
              {" "}
              <span className="bg-[#292c2a52] p-1 rounded-md ">+95%</span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow mt-7">
          <h3 className="text-lg font-semibold mb-6">
            Recent Orders
          </h3>

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
                  <td className="text-green-600 font-medium">
                    Completed
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4">#1024</td>
                  <td>Priya Singh</td>
                  <td>₹2,800</td>
                  <td className="text-yellow-600 font-medium">
                    Pending
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4">#1025</td>
                  <td>Amit Verma</td>
                  <td>₹6,200</td>
                  <td className="text-red-600 font-medium">
                    Cancelled
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

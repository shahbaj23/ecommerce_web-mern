import { FaBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Notification from "../Pages/Notification";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const API = import.meta.env.VITE_API_URL ;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}

export default function Navbar({ token }) {

  const [showNotify, setShowNotify] = useState(false);
  const [notification, setNotification] = useState(0);

  const fetchNotification = async () => {
    try {
      const res = await axios.get(
        `${API}/api/order/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotification(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if(!token) return;

    fetchNotification();

    const interval = setInterval(fetchNotification, 5000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="w-full h-16 flex justify-between items-center px-6 bg-white border-b shadow-sm sticky top-0 z-50">

      <h1 className="text-lg font-semibold text-gray-700">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <IoSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm"
          />
        </div>

        <div className="relative">

          <button
            onClick={() => setShowNotify(!showNotify)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaBell className="text-xl text-gray-700" />

            {notification > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {notification}
              </span>
            )}
          </button>

          {showNotify && (
            <div className="absolute right-0  rounded-xl shadow-lg">
              <Notification showNotify={showNotify} token={token} />
            </div>
          )}

        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition">

          <FaUserCircle className="text-3xl text-gray-500" />

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">
              Admin
            </span>
            <span className="text-xs text-gray-400">
              Super Admin
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
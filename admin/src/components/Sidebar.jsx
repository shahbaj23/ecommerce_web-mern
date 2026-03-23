import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaShoppingBag } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar({ setToken }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const links = [
    { to: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/all-product", icon: <FaTachometerAlt />, label: "All Products" },
    { to: "/add-product", icon: <IoMdAdd />, label: "Add Product" },
    { to: "/orders", icon: <FaShoppingBag />, label: "Orders" },
    { to: "/users", icon: <FaUsers />, label: "Users" },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 text-gray-800 text-3xl z-50"
        onClick={() => setOpen(true)}
      >
        <FiMenu />
      </button>

      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 z-40
  ${open ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
      >
        {/* Links Section */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${
                isActive(item.to)
                  ? "bg-gray-200 text-[#d48575] font-semibold border-l-4 border-[#ddada3]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => setToken("")}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

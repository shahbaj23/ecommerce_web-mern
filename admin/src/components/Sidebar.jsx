import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaShoppingBag } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar({ setToken }) {
  const [open, setOpen] = useState(false)
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const links = [
    { to: "/", icon: <FaTachometerAlt />, label: "All Products" },
    { to: "/add-product", icon: <IoMdAdd />, label: "Add Product" },
    { to: "/orders", icon: <FaShoppingBag />, label: "Orders" },
    { to: "/users", icon: <FaUsers />, label: "Users" },
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 text-white text-3xl z-60"
        onClick={() => setOpen(!open)}
      >
        <FiMenu />
      </button>

      {/* Sidebar */}
      <div
        className={`
    bg-gray-900 text-white fixed top-0 left-0 h-full w-64
    transform transition-transform duration-300
    z-40
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>

        {/* Links */}
        <nav className="flex flex-col gap-3">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 p-3 rounded-lg text-lg
                ${isActive(item.to) ? "bg-gray-600" : "hover:bg-gray-700"}
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={() => setToken("")}
          className="mt-auto bg-red-600 hover:bg-red-700 p-3 w-full rounded-lg flex items-center gap-3"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </>
  );
}

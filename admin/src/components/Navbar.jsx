import { FaBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({setToken}) {

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex sticky top-0 z-50 items-center px-6 pl-16 justify-between shadow-md">

      {/* Left Section - Search */}
      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg w-1/3">
        <IoSearch className="text-xl text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent ml-2 outline-none text-sm w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            3
          </span>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-3xl" />
          <span className="text-sm font-medium">Admin</span>
        </div>

      </div>
    </div>
  );
}

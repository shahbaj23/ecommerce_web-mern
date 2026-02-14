import { FaBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Notification from "../Pages/Notification";
import axios from "axios"

export default function Navbar({token}) {

  const [showNotify, setShowNotify] = useState(null)
  const [notification, setNotification] = useState(0);

  const fetchNotification = async ()=>{
    try {
      const res = await axios.get("http://localhost:3000/api/order/notification", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNotification(res.data.count)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchNotification()
    const interval = setInterval(fetchNotification, 5000)

    return()=> clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex justify-end sticky top-0 z-50 items-center px-6 pl-16  shadow-md">
      {/* <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg w-1/3">
        <IoSearch className="text-xl text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent ml-2 outline-none text-sm w-full"
        />
      </div> */}

      <div className="flex items-center gap-6">

        <button onClick={()=> setShowNotify(!showNotify)} className="relative cursor-pointer">
          <FaBell className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
            {notification}
          </span>
        </button>
        {
          showNotify && <Notification showNotify={showNotify} token={token} />
        }

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-3xl" />
          <span className="text-sm font-medium">Admin</span>
        </div>

      </div>
    </div>
  );
}

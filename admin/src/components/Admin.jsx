import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 overflow-x-hidden md:ml-64 ${
          sidebarOpen ? "ml-64 md:ml-64" : "ml-0"}`}>
        <div className=" p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

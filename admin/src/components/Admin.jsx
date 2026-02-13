import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Home from "../Pages/Home";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      <div
        className={`flex-4
          // ${sidebarOpen ? "ml-64 md:ml-64" : "ml-0"}`
          }
      >
        <div className=" p-6">
          <Home />
        </div>
      </div>
    </div>
  );
}

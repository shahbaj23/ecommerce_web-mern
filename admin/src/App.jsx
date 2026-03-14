import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./Pages/AddProduct";
import Orders from "./Pages/Orders";
import Logout from "./Pages/Logout";
import Login from "./Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import AllProducts from "./Pages/AllProducts";
import Dashboard from "./Pages/Dashboard";
// import Admin from "./components/Admin";
// import Home from "./Pages/Home";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  console.log(token)

  return (
    <>
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="h-screen flex flex-col">
      <div className="shrink-0">
        <Navbar token={token}/>
      </div>

      <div className="flex flex-1 overflow-hidden">

  {/* Sidebar */}
  <Sidebar setToken={setToken} />

  {/* Main Content */}
  <div className="flex-1 bg-[#f5f4f4] overflow-y-auto p-6 md:ml-64">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/all-product" element={<AllProducts token={token} />} />
      <Route path="/orders" element={<Orders token={token} />} />
      <Route path="/add-product" element={<AddProduct token={token} />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </div>

</div>
    </div>
      )}
    </>
  );
}
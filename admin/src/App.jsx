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

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar />
          <Sidebar setToken={setToken}  />
          <Routes>
              <Route path="/" element={<AllProducts token={token} />} />
              <Route
                path="add-product"
                element={<AddProduct token={token} />}
              />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="logout" element={<Logout />} />
          </Routes>
        </>
      )}
    </div>
  );
}

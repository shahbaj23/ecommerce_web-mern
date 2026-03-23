import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./Pages/Login";
import Layout from "./Layout";
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />

        <Route
          path="/*"
          element={
            <ProtectedRoutes token={token}>
              <Layout token={token} setToken={setToken} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}
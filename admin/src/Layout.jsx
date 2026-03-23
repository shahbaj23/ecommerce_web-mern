import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AllProducts from "./Pages/AllProducts";
import Orders from "./Pages/Orders";
import AddProduct from "./Pages/AddProduct";

export default function Layout({ token, setToken }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="shrink-0">
        <Navbar token={token} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar setToken={setToken} />

        <div className="flex-1 bg-[#f5f4f4] overflow-y-auto p-6 md:ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-product" element={<AllProducts token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/add-product" element={<AddProduct token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
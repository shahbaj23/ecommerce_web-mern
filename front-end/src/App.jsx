// import React from 'react'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserFromStorage } from "./Product/AuthSlice";
import Order from "./pages/Order";
import Verify from "./pages/Verify";
import Footer from "./components/Footer";
import ReturnPolicy from "./pages/RetrunPolicy";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import ExclusiveOffer from "./pages/ExclusiveOffer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromStorage());
  }, []);

  return (
    <div className="bg-white ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exclusive-offer" element={<ExclusiveOffer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

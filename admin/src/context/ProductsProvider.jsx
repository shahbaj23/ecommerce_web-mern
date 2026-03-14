import { useState } from "react";
import { ProductContext } from "./ProductContext";
import axios from "axios";

export const ProductProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const token = localStorage.getItem("token");

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/all-users",
      );
      setTotal(response.data.totalUsers);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const getAllOrder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/order/get-all-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTotalOrders(response.data.totalOrder);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const getTotalProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/get-total-product");

      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const getTotalPrice = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/order/total-price", {
        headers:{
            Authorization: `Bearer ${token}`
        }
      });

      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  console.log("total",totalProducts)

  return (
    <ProductContext.Provider
      value={{
        getAllUsers,
        total,
        getAllOrder,
        totalOrders,
        getTotalProduct,
        totalProducts,
        getTotalPrice,
        totalPrice
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

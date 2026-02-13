import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { fetchProducts } from "../Product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";

export default function Collection() {
  const dispatch = useDispatch();
  const {
    item: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const sortedProduct = [...allProducts]
    .filter((prod) => {
      if (selectedCategories.length == 0) return true;
      return selectedCategories.includes(prod.category.toLowerCase());
    })
    .filter((prod) => {
      if (subCategory.length === 0) return true;
      return subCategory.includes(prod.subCategory.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === "Low to high") return a.price - b.price;
      if (sortOrder === "High to Low") return b.price - a.price;
    });

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-90">
        <LuLoaderCircle className="animate-spin text-4xl text-black" />
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-6">
      <Sidebar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <div className="flex-1 relative">
        <div className="absolute top-[-46px] sm:top-0 right-3">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-[#ddada3] py-2 px-3"
          >
            <option value="">Sort by - Relevent</option>
            <option value="Low to high">Sort by - Low to high</option>
            <option value="High to Low">Sort by - High to Low</option>
          </select>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-bold text-slate-800 mb-8 ">
            Collection
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {sortedProduct.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white rounded-xl border border-[#ddada373] p-2 shadow-sm hover:shadow-xl hover:border-[#ddada3] hover:shadow-[#dbb4ad7e] transition-all duration-300"
              >
                {/* IMAGE */}
                <div className=" relative w-full h-53 bg-[#d3d3d3] rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <p className="absolute bottom-1 left-1 text-[13px] bg-[#d3d3d3b4] flex justify-center items-center gap-1 p-1 rounded-md">3.4<IoMdStar className="text-green-600"/></p>
                </div>

                {/* TITLE */}
                <h3 className="mt-3 text-sm font-semibold text-slate-900 line-clamp-2">
                  {product.title}
                </h3>
                <h3 className=" text-sm font-semibold min-h-7 w-[70px] text-[#d68e80] rounded-2xl">
                  {product.category}
                </h3>

                {/* PRICE */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-slate-900">
                      ₹{product.price}
                    </p>

                    <p className="text-xs line-through text-slate-500">
                      ₹{Math.round(product.price + 200)}
                    </p>
                  </div>

                  <p className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                    30% OFF
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

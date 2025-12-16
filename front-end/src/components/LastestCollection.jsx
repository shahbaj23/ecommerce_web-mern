import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";

export default function LastestCollection() {
  const [latestProducts, setLatestCollection] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    setLatestCollection(products.slice(0, 10));
  }, [products]);

  return (
    <div className="py-6 px-10">
      <h2 className="text-3xl font-bold px-2 text-center mb-6">
        Latest Collection
      </h2>

      <div className="flex gap-5 overflow-x-scroll scrollbar-none px-2 pb-3">
        {latestProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="min-w-[161px] sm:min-w-[180px] md:min-w-[200px] bg-white rounded-xl border border-gray-200 p-3 
                     shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="w-full h-36 sm:h-44 md:h-46 lg:h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-3 text-[12px] sm:text-[13px] md:text-[15px] font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>

            {/* CATEGORY */}
            <span className="inline-block mt-1 text-xs font-medium text-gray-700 bg-amber-100 px-2 py-1 rounded-full">
              {product.category}
            </span>

            {/* PRICE */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-lg font-bold text-gray-900">
                ₹{product.price}
              </p>

              <p className="text-xs line-through text-gray-500">
                ₹{Math.round(product.price + 200)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

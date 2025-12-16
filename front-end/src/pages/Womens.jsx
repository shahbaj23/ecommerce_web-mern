import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../components/Product/ProductSlice"


export default function Womens() {
  // const [allProducts, setAllProducts] = useState([]);
  // const products = async () => {
  //   const response = await fetch("https://dummyjson.com/products");
  //   const data = await response.json();
  //   console.log(data);
  //   setAllProducts(data.products);
  // };


  const dispatch = useDispatch();

  const {item: allProducts, loading, error} =  useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
  <div className="bg-white min-h-screen">
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      <h2 className="text-[32px] font-bold text-center text-slate-800 mb-8 ">
        Womens Products
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {allProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm hover:shadow-xl hover:border-blue-400 hover:shadow-blue-100 transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="w-full h-53 bg-[#d3d3d3] rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-3 text-sm font-semibold text-slate-900 line-clamp-2">
              {product.title}
            </h3>
            <h3 className=" text-sm font-semibold text-slate-900 min-h-7 w-[70px] text-center bg-amber-50 rounded-2xl">
              {product.category}
            </h3>

            {/* PRICE */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-slate-900">
                  ₹{product.price}
                </p>

                <p className="text-xs line-through text-slate-500">
                  ₹
                  {Math.round(
                    product.price * (1 + product.discountPercentage / 100)
                  )}
                </p>
              </div>

              <p className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                {product.discountPercentage}% OFF
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  </div>
);


}
  
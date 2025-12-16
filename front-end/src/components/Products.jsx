import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Product/ProductSlice";

export default function Products() {
  const [viewMore, setViewMore] = useState(16);
  const dispatch = useDispatch();
  const {
    item: allProducts,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const viewMoreProduct = allProducts.slice(0, viewMore);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-[32px] font-bold text-center text-slate-800 mb-8 ">
          Products
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {viewMoreProduct.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="min-w-[150px] sm:min-w-[161px] md:min-w-[180px] bg-white rounded-xl border border-gray-200 p-3 
                                 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className=" sm:h-44 md:h-50 lg:h-54 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <h3 className="mt-3 text-[12px] sm:text-[13px] md:text-[15px] font-semibold text-gray-900 line-clamp-2">
                {product.title}
              </h3>

              <span className="inline-block mt-1 text-xs font-medium text-gray-700 bg-amber-100 px-2 py-1 rounded-full">
                {product.category}
              </span>

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

      {viewMore < allProducts.length && (
        <div className="text-center">
          <button
            onClick={() => setViewMore((prev) => prev + 16)}
            className="border border-[#ddada3] py-2 mb-4 px-5 text-[18px] font-semibold cursor-pointer text-[#ddada3] hover:text-white hover:bg-[#ddada3]"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}

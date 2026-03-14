import React, { useEffect } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Product/ProductSlice";
import ProductSkeleton from "../skeleton/ProductSkeleton";

export default function RelatedProducts({ category, id }) {
  const dispatch = useDispatch();

  const { item: allProducts, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (loading) return <ProductSkeleton />;

  const filterProducts = allProducts.filter(
    (p) => p.category === category && p._id !== id
  );

  if (!filterProducts.length)
    return <p className="text-center">No related product found</p>;

  return (
    <div className="my-16">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Related Products
      </h1>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2">

        {filterProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="min-w-[180px] md:min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 group"
          >

            {/* Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={product?.images[0]}
                alt={product.title}
                className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-3">

              <h3 className="text-[15px] font-medium line-clamp-2 h-10">
                {product.title}
              </h3>

              <p className="text-lg font-bold text-gray-900 mt-2">
                ₹{product.price}
              </p>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
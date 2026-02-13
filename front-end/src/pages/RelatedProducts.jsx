import React, { useEffect } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Product/ProductSlice";

export default function RelatedProducts({ category, id }) {
  const dispatch = useDispatch();

  const { item: allProducts, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const filterProducts = allProducts.filter(
    (p) => p.category === category && p._id !== id,
  );

  // if (allProducts.length === 0) return <p className="text-center">Loading related products...</p>;
  if (!filterProducts.length)
    return <p className="text-center">No related product found</p>;

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-10">Related Products</h1>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
        {filterProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="min-w-[161px] sm:min-w-[180px] md:min-w-[200px] flex flex-col rounded-md shadow-md"
          >
            <img
              src={product?.images[0]}
              alt={product.title}
              className="rounded-md w-[200px] h-[200px] object-cover"
            />
            <div className="px-1">
              <h3 className="text-[16px] mt-2 line-clamp-2 ">
                {product.title}
              </h3>
              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

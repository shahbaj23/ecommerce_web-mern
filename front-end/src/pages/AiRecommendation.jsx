import React, { useEffect } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearSimilarProducts, fetchSimilarProduct } from "../Product/ProductSlice";

export default function AiRecommendation({ id }) {
  const dispatch = useDispatch();

  const { similarProduct, loadingSimilar } = useSelector((state) => state.products);

  useEffect(()=>{
    if(!id) return;

    dispatch(clearSimilarProducts())
    dispatch(fetchSimilarProduct(id))
  }, [id, dispatch])

  console.log(similarProduct);

  if (loadingSimilar) {
    return <p className="text-center">Loading recommendations...</p>;
  }

  if (!similarProduct || similarProduct.length === 0) {
    return <p className="text-center">No recommendations found</p>;
  }

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-10">
        AI Recommendation You may also like
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {similarProduct?.length > 0 &&
          similarProduct.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="flex flex-col rounded-md shadow-md"
            >
              <img
                src={product?.images?.[0]}
                alt={product.title}
                className="rounded-md w-full h-[200px] object-cover"
              />

              <div className="px-1">
                <h3 className="text-[16px] mt-2 line-clamp-2">
                  {product.title}
                </h3>
                <p>₹{product.price}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Product/ProductSlice";
import { Link } from "react-router-dom";

export default function ExclusiveOffer() {

  const [exclusiveOffer, setExclusiveOffer] = useState([])
  const dispatch = useDispatch()

  const {
    item: allProducts,
    loading, error
  } = useSelector((state)=> state.products)

  useEffect(()=>{
    dispatch(fetchProducts())
  }, [dispatch])

  console.log(allProducts)

  const offersProduct = allProducts.filter((pr)=> pr.offers.includes("Exclusive"))
  console.log(offersProduct)

  return (
    <div className="flex flex-col gap-1 sm:gap-10 pt-6 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col items-center gap-5">
        <h1 className="text-center font-bold text-3xl">Exclusive Offers</h1>
        <p className="w-200 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          debitis possimus quibusdam nesciunt eligendi officiis at incidunt modi
          perspiciatis. Voluptate velit, accusamus, quis ex suscipit aliquam
          atque architecto veniam ratione.
        </p>
        <div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {offersProduct.map((product) => (
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

              <span className="inline-block mt-1 text-xs font-medium text-[#d68e80] py-1 rounded-full">
                {product.category}
              </span>

              <div className="flex justify-between items-center mt-1">
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
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecentlyViewed() {

  const [products, setpoducts] = useState([])

  useEffect(()=>{
    const viewed = JSON.parse(localStorage.getItem("recentlyviewed")) || []

    setpoducts(viewed)
  }, [])

  console.log(products)

  return (
    <div className='lg:px-20 md:px-10 px-5 py-10'>
      <h1 className='text-[25px] font-semibold mb-4'>Recently viewed Product</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white rounded-xl border border-[#ddada373] p-2 shadow-sm hover:shadow-xl hover:border-[#ddada3] hover:shadow-[#dbb4ad7e] transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="w-full h-53 bg-[#d3d3d3] rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
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
  )
}

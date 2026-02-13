import React from 'react'
import AddProduct from './AddProduct'
import AllProducts from './AllProducts'

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-between bg-white p-4">
        <h1 className="text-2xl font-semibold">Foods Website</h1>
        <div className="flex items-center justify-center gap-2 text-[#444]">
          <a href="" className="">Home</a>
          <p>~</p>
          <a href="">Dashboard</a>
        </div>
      </div>
      <div className=" flex flex-col justify-center py-7 items-center">
        <AllProducts />
      </div>
    </div>
  )
}

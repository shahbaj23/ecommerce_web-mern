import React from "react";
import arrivals from "../assets/arrivals.jpg";

export default function NewArrival() {
  return (
    <div className="w-full mt-5 relative">
      <div className="relative">
        <img
          src={arrivals}
          alt="New Arrivals"
          className="w-full h-[450px] object-cover"
        />

        <div className="absolute inset-0 bg-[#ddada3]/10"></div>

        <div
          className="
          absolute inset-0 
          flex flex-col items-start justify-center 
          text-white px-6 md:px-12 space-y-3
        "
        >
          <h1 className="text-3xl text-black font-bold md:text-4xl drop-shadow-lg">
            New Arrivals
          </h1>

          <p className="text-lg md:text-xl max-w-xl drop-shadow-md">
            Check out the latest additions to our collection!
          </p>

          <p className="text-md md:text-lg drop-shadow-md">
            Discover the freshest styles and trends just for you.
          </p>

          <button
            className="
              mt-3 px-6 py-2 
              bg-[#f1f1f15e] border cursor-pointer border-[#c2705f] text-black font-medium 
              rounded-[9px] shadow-md hover:scale-105 
              duration-200
            "
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

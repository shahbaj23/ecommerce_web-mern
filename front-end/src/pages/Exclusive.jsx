import React, { useEffect, useState, useRef } from "react";
import imgbanner1 from "../assets/imgbanner1.jpg";
import imgbanner2 from "../assets/imgbanner2.jpg";
import imgbanner3 from "../assets/imgbanner3.jpg"; 

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Exclusive() {
  const images = [imgbanner1, imgbanner2, imgbanner3];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const prevSlider = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlider = () =>
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

 
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [images.length, isPaused]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlider();
      if (e.key === "ArrowRight") nextSlider();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="w-full overflow-hidden relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative w-full h-80 md:h-[500px]">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-700 ease-in-out transform
              ${i === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"}
            `}
            draggable={false}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute z-20 top-1/3 left-6 md:left-16 max-w-lg text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Exclusive Offers
          </h2>
          <p className="mt-3 text-sm md:text-lg max-w-md">
            Shop now and save big on our exclusive offers! Limited time only.
          </p>
          <button className="mt-5 inline-block px-5 py-2 cursor-pointer bg-white text-black rounded-lg font-medium shadow-sm">
            View More
          </button>
        </div>

        {/* Left / Right buttons */}
        <button
          onClick={prevSlider}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-sm cursor-pointer"
        >
          <AiOutlineLeft className="text-2xl md:text-3xl text-white" />
        </button>

        <button
          onClick={nextSlider}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-sm cursor-pointer"
        >
          <AiOutlineRight className="text-2xl md:text-3xl text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300
                ${i === index ? "scale-110 bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

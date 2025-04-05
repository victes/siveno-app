"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// import { TCarousel } from "../types";
import Image from "next/image";
import { IProductImage } from "@/shared/api/ProductsApi/types";

const ProductSlider: React.FC<{ carousel: IProductImage[] }> = ({ carousel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? carousel.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === carousel.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative  w-full overflow-hidden">
      {/* Slider Content */}
      <div
        className="flex relative h-[400px] tablet:h-[500px] laptop:h-[800px] flex-col transition-transform duration-500"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
        }}
      >
        {carousel.map((item, idx) => (
          <div key={idx} className="h-full w-full flex-shrink-0 flex justify-center items-center z-10">
            <Image
              width={550}
              height={730}
              src={item.image_path}
              priority={true}
              alt={`Slide ${idx + 1}`}
              className="object-cover h-full w-auto  max-w-full rounded-sm"
              unoptimized={item.image_path.startsWith("http://") || item.image_path.startsWith("https://")}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
      >
        ❯
      </button>

      {/* Thumbnails - фиксированное расположение, всегда снизу */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {carousel.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`${currentIndex === idx ? "scale-150" : "border-transparent"} rounded-sm transition`}
          >
            {/* <img
              src={item.image_path}
              alt={`Thumbnail ${idx + 1}`}
              className="h-20 w-20 flex-shrink-0 object-cover rounded-sm"
            /> */}
            <h2 className="h-5 w-5 bg-white mb-5 rounded-2xl"></h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;

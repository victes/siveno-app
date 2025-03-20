"use client";
import React from "react";
import { ILoopSlider } from "../types/type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "./LoopSlider.scss";

const LoopSlider = ({ text }: ILoopSlider) => {
  return (
    <div className="bg-black py-2">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={80}
        slidesPerView="auto"
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
      >
        {[...Array(12).keys()].map(id => (
          <SwiperSlide 
            key={id + 1} 
            className="text-white font-light text-xs tracking-wider uppercase !w-auto"
          >
            <div className="flex items-center whitespace-nowrap px-4">
              <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
              {text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LoopSlider;

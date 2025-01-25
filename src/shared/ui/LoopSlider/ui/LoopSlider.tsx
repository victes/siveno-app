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
    <div className="bg-black">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={50}
        slidesPerView={10}
        speed={500}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {[...Array(19).keys()].map(id => (
          <SwiperSlide key={id + 1} className="text-white uppercase ">
            {text}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LoopSlider;

"use client";
import { HeroSlider } from "@/entities/HeroSlider/ui";
import { LoopSlider } from "@/shared/ui/LoopSlider";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Hero = () => {
  return (
    <div>
      {" "}
      <div className="relative flex justify-center tw-flex tw-flex-col">
        <HeroSlider />
        <div className="absolute bottom-0 mb-[200px] z-10 text-white text-[60px] ">COMPANY NAME X ZARA</div>
      </div>
      <LoopSlider text="Скидка 10%" />
    </div>
  );
};

export default Hero;

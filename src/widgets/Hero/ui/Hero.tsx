"use client";
import { HeroSlider } from "@/entities/HeroSlider/ui";
import React from "react";

const Hero = () => {
  return (
    <div className="relative flex justify-center">
      {" "}
      <HeroSlider />
      <div className="absolute bottom-0 mb-[200px] z-10 text-white text-[60px] ">COMPANY NAME X ZARA</div>
    </div>
  );
};

export default Hero;

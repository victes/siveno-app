"use client";
import { HeroSlider } from "@/entities/HeroSlider/ui";
import { LoopSlider } from "@/shared/ui/LoopSlider";
import React from "react";

const Hero = () => {
  return (
    <div>
      {" "}
      <div className="relative flex justify-center tw-flex tw-flex-col">
        <HeroSlider />
        <div className="absolute bottom-0 mb-[200px] max-laptop:mb-[100px] z-10 text-white text-[60px] max-mindesk:text-[40px] max-laptop:text-[30px] ">
          COMPANY NAME
        </div>
      </div>
      <LoopSlider text="Скидка 10%" />
    </div>
  );
};

export default Hero;

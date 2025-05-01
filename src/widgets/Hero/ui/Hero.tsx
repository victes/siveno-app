"use client";
import { HeroSlider } from "@/entities/HeroSlider/ui";
import { LoopSlider } from "@/shared/ui/LoopSlider";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div className="relative flex justify-center tw-flex tw-flex-col">
        <HeroSlider />
        <div className="absolute z-10 flex flex-col items-center justify-end w-full h-full text-white pb-[120px] max-laptop:pb-[40px] max-laptop-390 btn-slider">
          {/* Название компании временно скрыто */}
          {/* <h1 className="text-[60px] max-mindesk:text-[40px] max-laptop:text-[30px] font-light mb-6">
            COMPANY NAME
          </h1> */}
          <Link href="/catalog-products">
            <button className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 text-black bg-white bg-opacity-40 border border-black hover:bg-opacity-60">
              СМОТРЕТЬ КОЛЛЕКЦИЮ
            </button>
          </Link>

        </div>
      </div>
      <LoopSlider texts={["скидка 10% на первый зака", "бесплатная доставка от 15 000 руб"]} />
    </div>
  );
};

export default Hero;

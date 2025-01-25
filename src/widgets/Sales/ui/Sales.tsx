"use client";
import { Container } from "@/shared/ui/Container";
import React from "react";

const Sales = () => {
  return (
    <div className="mt-[80px] flex flex-col gap-[150px]">
      <Container>
        <h3 className="text-[40px] uppercase text-black">Распродажа</h3>
      </Container>
      <div className="flex flex-col items-center justify-center">
        {/* <div className="flex w-full h-">
          <div className="group flex-1 relative overflow-hidden transition-all duration-700 hover:flex-[3] h-full">
            <img
              src="/images/Hero/Slide.jpg"
              alt=""
              className="w-full h-full transition-all duration-700 group-hover:grayscale-0 grayscale"
            />
          </div>
          <div className="group flex-1 relative overflow-hidden transition-all duration-700 hover:flex-[3] h-full">
            <img
              src="/images/Hero/Slide.jpg"
              alt=""
              className="w-full h-full transition-all duration-700 group-hover:grayscale-0 grayscale"
            />
          </div>
        </div> */}
        <a href="#">
          <div className="grid grid-cols-2 h-screen">
            <img src="/images/MainPage/5.jpg" alt="" className="h-screen w-screen object-cover" />
            <img src="/images/MainPage/6.jpg" alt="" className="h-screen w-screen object-cover" />
          </div>
        </a>
        <h1 className="absolute text-[50px] text-white uppercase">Костюмы</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <a href="#">
          <div className="grid grid-cols-2 h-screen">
            <img src="/images/MainPage/8.png" alt="" className="h-screen w-screen object-cover" />
            <img src="/images/MainPage/9.webp" alt="" className="h-screen w-screen object-cover" />
          </div>
        </a>
        <h1 className="absolute text-[50px] text-white">Шапки</h1>
      </div>
    </div>
  );
};

export default Sales;

import { Container } from "@/shared/ui/Container";
import React from "react";

const Sales = () => {
  return (
    <div className="mt-[80px]">
      <Container>
        <h3 className="text-[40px] uppercase text-black">Распродажа</h3>
      </Container>
      <div className="flex flex-col items-center justify-center mt-[50px]">
        <div className="flex w-full h-">
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
        </div>

        <h1 className="absolute text-[50px] text-white">Куртки</h1>
      </div>
    </div>
  );
};

export default Sales;

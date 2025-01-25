"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISliders } from "../types/type";

const Slider = ({ slides, className }: ISliders) => {
  return (
    <div className={className}>
      <Swiper spaceBetween={50} slidesPerView={6} loop={true}>
        {slides.map(slide => (
          <SwiperSlide key={slide.price}>
            <Swiper spaceBetween={50} slidesPerView={1}>
              {slide.img.map(img => (
                <SwiperSlide key={img.src}>
                  <img src={img.src} alt={img.alt} className="max-w-[300px] w-full h-[440px] object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-[10px] flex flex-col gap-[10px] text-left">
              <h3 className="uppercase">{slide.title}</h3>
              <p>{Intl.NumberFormat("ru-RU").format(slide.price)} $</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;

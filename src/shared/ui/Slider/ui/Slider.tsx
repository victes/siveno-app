/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISliders } from "../types/type";

const Slider = ({ slides, className }: ISliders) => {
  return (
    <div className={className}>
      <Swiper
        spaceBetween={50}
        slidesPerView={6}
        loop={true}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          // when window width is >= 1024px
          1366: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          // when window width is >= 1440px
          1440: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.price}>
            <Swiper spaceBetween={50} slidesPerView={1}>
              {slide.img.map(img => (
                <SwiperSlide key={img.src}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-w-[300px] w-full h-[440px] object-cover max-desktop:h-[280px]"
                  />
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

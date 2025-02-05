"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

type ImageType = {
  src: string;
  alt: string;
};

type SliderItem = {
  img: ImageType[];
  title: string;
  oldPrice?: number;
  discount?: number;
  price: number;
};

type SliderProps = {
  items: SliderItem[];
  heading: string;
};

const Carousel: React.FC<SliderProps> = ({ items, heading }) => {
  return (
    <div className="w-full mx-auto tablet:p-6">
      <h2 className="text-3xl font-bold title-h1 text-center uppercase tracking-wide">{heading}</h2>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={15}
        slidesPerView={5}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        className="rounded-sm"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center mt-10 tablet:p-4 duration-300">
              <Image
                width={200}
                height={200}
                src={item.img[0].src}
                alt={item.img[0].alt}
                className="w-[15rem] h-[20rem] object-cover rounded-sm mb-4"
              />
              <h3 className="text-xs text-start font-semibold text-gray-800">{item.title}</h3>
              <div className="text-center">
                {item.oldPrice && (
                  <span className="text-sm line-through text-gray-500 mr-2">
                    {item.oldPrice.toLocaleString("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                    })}
                  </span>
                )}
                {item.discount && <span className="text-sm text-red-500">(-{item.discount}%)</span>}
              </div>
              <span className="text-xl font-bold text-gray-900">
                {item.price.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                })}
              </span>
            </div>
          </SwiperSlide>
        ))}
        {/* Кастомные стрелки */}
        <div className="swiper-button-prev text-gray-500 hover:text-gray-800 duration-300" />
        <div className="swiper-button-next text-gray-500 hover:text-gray-800 duration-300" />
      </Swiper>
    </div>
  );
};

export default Carousel;

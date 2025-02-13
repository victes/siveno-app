"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

type ImageType = {
  src: string;
  alt: string;
};
export type SliderItem = {
  id: number;
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
      <div className="w-full flex mt-[40px]">
        <h2 className="text-3xl  title-h1 text-start uppercase tracking-wide">{heading}</h2>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={15}
        slidesPerView={5}
        breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
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
        {items.map((item, index) => {
          const firstImage = item.img?.[0]; // Проверяем, есть ли изображение

          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center mt-10 tablet:p-4 duration-300">
                {firstImage ? (
                  <Link href={`/product/${item.id}`}>
                    <Image
                      width={200}
                      height={200}
                      loading="lazy"
                      src={firstImage.src}
                      alt={firstImage.alt}
                      className="w-[15rem] h-[20rem] object-cover rounded-sm mb-4"
                    />
                  </Link>
                ) : (
                  <span className="text-gray-500">Нет изображения</span>
                )}
                <h3 className="text-xs text-start font-semibold text-gray-800">{item.title}</h3>
                <span className="text-xl font-bold text-gray-900">{Number(item.price).toFixed()} руб.</span>
              </div>
            </SwiperSlide>
          );
        })}
        {/* Кастомные стрелки */}
        <div className="swiper-button-prev text-gray-500 hover:text-gray-800 duration-300" />
        <div className="swiper-button-next text-gray-500 hover:text-gray-800 duration-300" />
      </Swiper>
    </div>
  );
};

export default Carousel;

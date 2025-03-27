"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import "../styles/carousel.scss";

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
    <div className="w-full mx-auto tablet:px-0">
      <div className="w-full flex mt-[40px] justify-center">
        <h2 className="text-3xl title-h1 text-start uppercase tracking-wide lineyka">{heading}</h2>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="rounded-sm"
      >
        {items.map((item, index) => {
          const firstImage = item.img?.[0]; // Проверяем, есть ли изображение
          const isExternalImage = firstImage?.src && (firstImage.src.startsWith('http://') || firstImage.src.startsWith('https://'));

          return (
            <SwiperSlide key={index} className="flex items-stretch h-auto">
              <Link href={`/product/${item.id}`} className="slider-card-wrapper">
                <div className="slider-card">
                  {firstImage ? (
                    <div className="slider-card__image">
                      {isExternalImage ? (
                        <Image
                          width={400}
                          height={600}
                          loading="lazy"
                          src={firstImage.src}
                          alt={firstImage.alt}
                          className="w-full h-[20rem] object-cover rounded-sm"
                          unoptimized={true}
                        />
                      ) : (
                        <Image
                          width={400}
                          height={600}
                          loading="lazy"
                          src={firstImage.src}
                          alt={firstImage.alt}
                          className="w-full h-[20rem] object-cover rounded-sm"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="slider-card__no-image">
                      <span className="text-gray-500">Нет изображения</span>
                    </div>
                  )}
                  <div className="slider-card__info">
                    <h3 className="slider-card__title">{item.title}</h3>
                    <span className="slider-card__price">{Number(item.price).toFixed()} руб.</span>
                  </div>
                </div>
              </Link>
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

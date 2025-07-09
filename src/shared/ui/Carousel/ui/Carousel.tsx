"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "../styles/carousel.scss";
import { IProductImage } from "@/shared/api/ProductsApi/types";
import CarouselMousemove from "@/entities/CarouselMousemove/ui/CarouselMousemove";
import { ICarouselMousemoveImages } from "@/entities/CarouselMousemove/types/types";

type ImageType = {
  src: string;
  alt: string;
};
export type SliderItem = {
  id: number;
  img: IProductImage[] | ImageType[];
  title: string;
  discount_percent: number;
  original_price: number;
  price: number;
};

type SliderProps = {
  items: SliderItem[];
  heading: string;
  id?: string;
};

const Carousel: React.FC<SliderProps> = ({ items, heading, id = "default" }) => {
  return (
    <div className="w-full mx-auto tablet:px-0 ">
      <div className="w-full flex mt-8  justify-beetween  relative items-center ">
        <h2 className="text-3xl title-h1 text-start uppercase tracking-wide lineyka !mb-0 !pb-0 max-sm:leading-5">
          {heading}
        </h2>
        <div className="flex gap-2  ml-auto">
          <div
            className={`swiper-button-prev-${id} !text-[#251e19] hover:text-gray-800 duration-300 !right-8 !left-auto after:!content-none [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed`}
          >
            <IoChevronBack size={30} />
          </div>
          <div
            className={`swiper-button-next-${id} !text-[#251e19] hover:text-gray-800 duration-300 !right-0 after:!content-none [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed`}
          >
            <IoChevronForward size={30} />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.swiper-button-next-${id}`,
          prevEl: `.swiper-button-prev-${id}`,
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
          // @ts-ignore
          const images: ICarouselMousemoveImages[] = item.img?.slice(0, 5);

          return (
            <SwiperSlide key={index} className="flex items-stretch h-full">
              <Link href={`/product/${item.id}`} className="slider-card-wrapper max-sm:!mt-5">
                <div className="slider-card">
                  <div className="slider-card__image">
                    <CarouselMousemove slides={images} />
                  </div>
                  <div className="slider-card__info">
                    <h3 className="slider-card__title whitespace-normal">{item.title}</h3>
                    <div className="slider-card__price flex gap-3">
                      <span>{Number(item.price).toFixed()}₽</span>
                      {item.discount_percent && item.discount_percent > 0 && (
                        <>
                          <span className="text-base text-gray-500 opacity-75 line-through">
                            {Number(item.original_price).toFixed()}₽
                          </span>
                          <span className="text-sm bg-black text-white rounded-full px-1 py-0.5">
                            -{Math.floor(item.discount_percent)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
        {/* Кастомные стрелки */}
      </Swiper>
    </div>
  );
};

export default Carousel;

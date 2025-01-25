"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      //   navigation
      //   pagination={{ clickable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className="w-full h-full">
        <img src="/images/Hero/Slide.jpg" alt="Hero slide 1" className="w-full h-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full h-full">
        <img src="/images/Hero/Slide.jpg" alt="Hero slide 1" className="w-full h-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full h-full">
        <img src="/images/Hero/Slide.jpg" alt="Hero slide 1" className="w-full h-full" />
      </SwiperSlide>
      <SwiperSlide className="w-full h-full">
        <img src="/images/Hero/Slide.jpg" alt="Hero slide 1" className="w-full h-full" />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;

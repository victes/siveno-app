/* eslint-disable @next/next/no-img-element */
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      speed={2000}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      //   navigation
      //   pagination={{ clickable: true }}
      onSwiper={swiper => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide className="w-full h-screen">
        <img
          src="/images/Hero/Slide.jpg"
          alt="Hero slide 1"
          className="w-full h-screen object-cover max-laptop:h-[500px]"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-screen">
        <img
          src="/images/Hero/Slide.jpg"
          alt="Hero slide 1"
          className="w-full h-screen object-cover max-laptop:h-[500px]"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-screen">
        <img
          src="/images/Hero/Slide.jpg"
          alt="Hero slide 1"
          className="w-full h-screen object-cover max-laptop:h-[500px]"
        />
      </SwiperSlide>
      <SwiperSlide className="w-full h-screen">
        <img
          src="/images/Hero/Slide.jpg"
          alt="Hero slide 1"
          className="w-full h-screen object-cover max-laptop:h-[500px]"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
